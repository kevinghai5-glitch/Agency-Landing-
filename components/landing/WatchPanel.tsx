import Vsl from "./Vsl";

/** The founder's video, in the same beige panel as the two halves below
 *  it, with two lines beside it. */
export default function WatchPanel() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-9 sm:px-8 xl:px-12">
      <div className="panel">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.35fr_.65fr] md:gap-10">
          <Vsl />
          <div>
            <h3 className="text-ink text-[32px]">Message from <em className="not-italic text-accent">the founder.</em></h3>
            <p className="mt-3 text-base text-muted">
              A short note on who this is for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
