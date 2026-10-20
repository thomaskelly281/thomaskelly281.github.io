'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DrawerClose } from '@/components/ui/drawer';

const LABEL =
  'text-xs font-[family-name:var(--font-ppvalve)] font-medium uppercase tracking-[0.18em] text-text-secondary/45';
const CTA_SECONDARY =
  'inline-flex items-center rounded-lg border border-text-secondary/15 px-5 py-3 text-base font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary transition-colors hover:bg-text-secondary/[0.04]';
const CTA_PRIMARY =
  'inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-tertiary px-6 py-3 text-base font-[family-name:var(--font-ppvalve)] font-medium text-[#222222] transition-opacity hover:opacity-90';

function ReachOut() {
  return (
    <div className="flex items-center gap-3">
      <a
        href="https://www.linkedin.com/in/thomas-kelly-designer"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tertiary transition-opacity hover:opacity-70"
        aria-label="LinkedIn"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="#222222"
          />
        </svg>
      </a>
      <a
        href="mailto:thomaskelly281@gmail.com"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tertiary transition-opacity hover:opacity-70"
        aria-label="Email"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="#222222"
          />
        </svg>
      </a>
    </div>
  );
}

function SignatureMark() {
  return (
    <div className="relative mx-auto mt-14 h-24 w-full md:mt-16 md:h-28">
      <div className="absolute bottom-0 left-1/2 origin-bottom -translate-x-1/2 scale-[0.36] cursor-heart md:scale-[0.42]">
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <Image
              src="/SVGs/signature.svg"
              alt=""
              width={500}
              height={200}
              className="h-auto w-72 md:w-100"
            />
          </div>
          <p className="whitespace-nowrap font-[family-name:var(--font-ppvalve)] text-4xl text-text-secondary md:text-6xl lg:text-8xl">
            Thomas Kelly
          </p>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyFooter({
  next = { label: 'Agentic Studio', href: '/agentic-studio' },
}: {
  next?: { label: string; href: string };
}) {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pt-8 pb-8 md:px-8 md:pt-12 md:pb-10">
      <div className="grid grid-cols-1 gap-10 border-t border-text-secondary/10 pt-12 sm:grid-cols-3 sm:gap-8">
        <div className="flex flex-col items-start gap-3">
          <p className={LABEL}>Close</p>
          <DrawerClose className={CTA_SECONDARY}>Close case study</DrawerClose>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className={LABEL}>Another study</p>
          <Link href={next.href} className={CTA_PRIMARY}>
            {next.label}
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3">
          <p className={LABEL}>Reach out</p>
          <ReachOut />
        </div>
      </div>
      <SignatureMark />
    </footer>
  );
}
