import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind &amp; Framer Motion.
        </p>
        <div className="flex items-center gap-4 text-lg text-muted">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-text">
            <FiMail />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-text">
            <FiLinkedin />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-text">
            <FiGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
