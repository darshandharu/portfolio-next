import Reveal from "./Reveal";

type Props = { index: string; title: string; subtitle?: string };

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-mono text-sm tracking-widest text-purple-light/80 mb-3">
        {index} —
      </p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-muted text-base md:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
