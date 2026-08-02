"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ScanFormValues } from "./ScanForm";
import type { ScanResult } from "@/lib/types";

type Phase = "idle" | "scanning" | "results" | "error";

interface ScanContextValue {
  phase: Phase;
  result: ScanResult | null;
  known: ScanFormValues | null;
  errorMsg: string;
  /** True while the background PageSpeed fetch is still in flight for the
   *  currently-shown result. Lets the scorecard show a "measuring speed" hint
   *  instead of looking finished-but-empty. */
  speedPending: boolean;
  runScan: (values: ScanFormValues) => Promise<void>;
  /** Return to the blank form. Keeps the last result in memory so it can be
   *  reopened via viewPrevious() — nothing is discarded, just hidden. */
  reset: () => void;
  /** Re-open the last completed scan from the idle form, if one exists. */
  viewPrevious: () => void;
}

const ScanContext = createContext<ScanContextValue | null>(null);

/** localStorage key for the last completed scan. Bump the suffix if the
 *  stored shape ever changes incompatibly — old payloads just get ignored. */
const STORAGE_KEY = "reclaimedhq:lastScan:v1";

/**
 * Single source of truth for the scan state machine, lifted to page level so
 * BOTH the hero form (section 1) and the final-CTA form (section 10) drive the
 * same flow. Submitting at the bottom runs the same scan and reveals the same
 * scorecard/gate at the top — the final CTA scrolls the user there.
 */
export function ScanProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [known, setKnown] = useState<ScanFormValues | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [speedPending, setSpeedPending] = useState(false);

  // Monotonic token identifying the latest scan. A background speed fetch
  // captures the token it was started under and only merges its result if that
  // token is still current — so a slow speed call for an abandoned scan can
  // never bleed into a newer one.
  const scanToken = useRef(0);

  // Hydrate the last completed scan from localStorage on mount, so the
  // "View your previous scan" door survives reloads — once a visitor has run
  // a scan, that button never disappears. Phase stays "idle": they land on
  // the form, with the previous results one click away.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        result?: ScanResult;
        known?: ScanFormValues;
      };
      if (!saved?.result || !saved?.known?.website) return;
      setResult((r) => r ?? saved.result ?? null);
      setKnown((k) => k ?? saved.known ?? null);
    } catch {
      // Corrupted payload or blocked storage — start fresh, never crash.
    }
  }, []);

  // Persist every completed result, including the late background speed merge
  // (this effect re-fires when speed slots in, keeping storage current).
  useEffect(() => {
    if (!result || !known) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ result, known }));
    } catch {
      // Private mode / storage full — persistence is best-effort only.
    }
  }, [result, known]);

  // Fire-and-forget: enrich the already-rendered scorecard with speed when (if)
  // PageSpeed's slow audit lands. Never throws into the caller.
  const fetchSpeed = useCallback((values: ScanFormValues, token: number) => {
    setSpeedPending(true);
    fetch("/api/instant-scan/speed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ website: values.website }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { speed?: ScanResult["speed"] } | null) => {
        if (token !== scanToken.current) return; // stale — a newer scan won.
        if (data?.speed) {
          setResult((r) => (r ? { ...r, speed: data.speed } : r));
        }
      })
      .catch(() => {
        /* speed is optional; the scorecard already stands without it */
      })
      .finally(() => {
        if (token === scanToken.current) setSpeedPending(false);
      });
  }, []);

  const runScan = useCallback(
    async (values: ScanFormValues) => {
      const token = ++scanToken.current;
      setKnown(values);
      setPhase("scanning");
      setErrorMsg("");
      setSpeedPending(false);

      try {
        const res = await fetch("/api/instant-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName: values.businessName,
            website: values.website,
          }),
        });

        if (token !== scanToken.current) return; // superseded mid-flight.

        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          setErrorMsg(friendlyError(data.error, res.status));
          setPhase("error");
          return;
        }

        const data = (await res.json()) as ScanResult;
        setResult(data);
        setPhase("results");
        // Kick the slow speed audit off in the background now that the instant
        // scorecard is up. Its card slots in later if it resolves.
        fetchSpeed(values, token);
      } catch {
        if (token !== scanToken.current) return;
        setErrorMsg("Couldn't reach that site — check the URL?");
        setPhase("error");
      }
    },
    [fetchSpeed],
  );

  const reset = useCallback(() => {
    // Return to the form but KEEP result + known in memory so viewPrevious()
    // can re-open them. The fresh ScanForm mounts with empty inputs regardless.
    setPhase("idle");
    setErrorMsg("");
  }, []);

  const viewPrevious = useCallback(() => {
    setResult((r) => {
      if (r) setPhase("results");
      return r;
    });
  }, []);

  const value = useMemo(
    () => ({
      phase,
      result,
      known,
      errorMsg,
      speedPending,
      runScan,
      reset,
      viewPrevious,
    }),
    [
      phase,
      result,
      known,
      errorMsg,
      speedPending,
      runScan,
      reset,
      viewPrevious,
    ],
  );

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

export function useScan(): ScanContextValue {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error("useScan must be used within a ScanProvider");
  return ctx;
}

function friendlyError(code: string | undefined, status: number): string {
  switch (code) {
    case "invalid_url":
      return "That doesn't look like a website address — mind checking it?";
    case "rate_limited":
      return "You've run a few scans already. Give it a little while and try again.";
    case "unreachable":
      return "Couldn't reach that site — check the URL?";
    default:
      if (status === 429)
        return "You've run a few scans already. Give it a little while and try again.";
      return "Couldn't reach that site — check the URL?";
  }
}
