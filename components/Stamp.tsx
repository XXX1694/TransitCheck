import type { StampTone } from "@/lib/sample";

type StampProps = {
  tone: StampTone;
  kicker: string;
  line: string;
  hit?: boolean;
};

export function Stamp({ tone, kicker, line, hit = false }: StampProps) {
  return (
    <p className={`stamp stamp--${tone}${hit ? " stamp--hit" : ""}`}>
      <small>{kicker}</small>
      {line}
    </p>
  );
}
