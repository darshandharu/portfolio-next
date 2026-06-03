"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiDownload, FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-purple/60";

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="07"
        title="Get In Touch"
        subtitle="Open to Data Engineer, Analytics Engineer, and Cloud Data Engineer roles. Let's talk."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {/* contact channels */}
        <div className="space-y-4">
          {[
            { icon: <FiMail />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { icon: <FiLinkedin />, label: "LinkedIn", value: "in/darshanbs-data-engineer", href: profile.linkedin },
            { icon: <FiGithub />, label: "GitHub", value: "github.com/darshandharu", href: profile.github },
          ].map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="flex items-center gap-4 rounded-xl glass glass-hover p-4"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-blue to-purple text-lg text-white">
                {c.icon}
              </span>
              <span>
                <span className="block text-xs text-muted">{c.label}</span>
                <span className="block font-medium">{c.value}</span>
              </span>
            </motion.a>
          ))}
          <a
            href={profile.resume}
            download
            className="flex items-center justify-center gap-2 rounded-xl border border-purple/40 px-4 py-3.5 font-semibold text-purple-light transition-colors hover:bg-purple/10"
          >
            <FiDownload /> Download Resume (PDF)
          </a>
        </div>

        {/* form */}
        <motion.form
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl glass p-6"
        >
          {sent ? (
            <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
              <FiCheckCircle className="text-5xl text-green-400" />
              <h3 className="mt-4 text-xl font-bold">Thanks, {form.name.split(" ")[0]}!</h3>
              <p className="mt-2 text-sm text-muted">
                Your email draft is ready. If it didn&apos;t open, reach me at{" "}
                <a className="text-purple-light" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-muted">Name</label>
                <input
                  className={field}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Recruiter"
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted">Email</label>
                <input
                  className={field}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-muted">Message</label>
                <textarea
                  rows={4}
                  className={field + " resize-none"}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role…"
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-4 py-3 font-semibold text-white shadow-lg shadow-purple/25 transition-transform hover:scale-[1.02]"
              >
                <FiSend /> Send Message
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
