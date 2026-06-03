import Reveal from "./Reveal";

type Props = { title: string; subtitle?: string };

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue to-purple" />
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-muted text-base md:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
