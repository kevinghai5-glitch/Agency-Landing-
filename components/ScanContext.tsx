"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
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
  runScan: (values: ScanFormValues) => Promise<void>;
}

const ScanContext = createContext<ScanContextValue | null>(null);

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

  const runScan = useCallback(async (values: ScanFormValues) => {
    setKnown(values);
    setPhase("scanning");
    setErrorMsg("");

    try {
      const res = await fetch("/api/instant-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

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
    } catch {
      setErrorMsg("Couldn't reach that site — check the URL?");
      setPhase("error");
    }
  }, []);

  const value = useMemo(
    () => ({ phase, result, known, errorMsg, runScan }),
    [phase, result, known, errorMsg, runScan],
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
