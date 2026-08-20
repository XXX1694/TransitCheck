import { Fragment } from "react";
import { Stamp } from "@/components/Stamp";
import type { RouteStub } from "@/lib/sample";

type RouteStripProps = {
  stubs: RouteStub[];
  caption?: string;
  hitStamp?: boolean;
  labelledBy?: string;
};

export function RouteStrip({
  stubs,
  caption,
  hitStamp = false,
  labelledBy,
}: RouteStripProps) {
  return (
    <figure className="strip-wrap">
      <p className="strip-hint mono">← плечи →</p>
      <div className="strip" role="list" aria-labelledby={labelledBy}>
        {stubs.map((stub, index) => (
          <Fragment key={`${stub.kind}-${index}`}>
            {index > 0 ? <div className="perf" aria-hidden="true" /> : null}
            {stub.kind === "flight" ? (
              <article className="stub" role="listitem">
                <p className="stub__kicker">рейс</p>
                <p className="stub__route">
                  {stub.from}→{stub.to}
                </p>
                <p className="stub__meta">{stub.date}</p>
                <p className="stub__flight">{stub.flight}</p>
              </article>
            ) : (
              <article className="stub stub--layover" role="listitem">
                <p className="stub__kicker">стыковка</p>
                <p className="stub__route">
                  {stub.code} {stub.duration}
                </p>
                <p className="stub__meta">{stub.note}</p>
                <Stamp
                  tone={stub.stamp.tone}
                  kicker={stub.stamp.kicker}
                  line={stub.stamp.line}
                  hit={hitStamp}
                />
              </article>
            )}
          </Fragment>
        ))}
      </div>
      {caption ? <figcaption className="strip-caption">{caption}</figcaption> : null}
    </figure>
  );
}
