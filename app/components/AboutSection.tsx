'use client';

import { forwardRef, useRef, useEffect, useLayoutEffect, useMemo, useState, ReactNode, CSSProperties } from 'react';
import { Caveat, Press_Start_2P } from 'next/font/google';
import { useTheme } from 'next-themes';
import { useGSAP } from '../contexts/GSAPContext';
import { AboutArchitecturalPlaneBackground } from './AboutArchitecturalPlaneBackground';
import { AboutPolaroid } from './AboutPolaroid';
import './AboutIdle.css';
import { AboutPaintLayer } from './AboutPaintLayer';

// Stock images from Unsplash - same as WorkSection
const ABOUT_IMAGES = [
  '/images/about-1.webp', // Image 1
  '/images/about-2.webp', // Image 2
  '/images/about-3.webp', // Image 3
  '/images/about-4.jpg', // Image 4
];

const SITECORE_MARK = '/images/sitecore-mark.svg';
const STICKER_VINYL = '/images/sticker-vinyl-record.svg?v=3';
const STICKER_100 = '/images/sticker-100.png';
const STICKER_BRAIN = '/images/sticker-brain.png';

const noteHand = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
});

const pixelNotes = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
});

type VinylNote = {
  glyph: string;
  color: string;
  delay: string;
  duration: string;
  startX: string;
  endX: string;
  endY: string;
  rotation: string;
};

const VINYL_NOTES_LEFT: VinylNote[] = [
  { glyph: '♪', color: '#FF9B85', delay: '0s', duration: '3.28s', startX: '5px', endX: '-30px', endY: '-118px', rotation: '8deg' },
  { glyph: '♬', color: '#FEE440', delay: '0.7s', duration: '3.43s', startX: '-4px', endX: '-40px', endY: '-111px', rotation: '-6deg' },
  { glyph: '♫', color: '#00F5D4', delay: '1.4s', duration: '2.06s', startX: '-4px', endX: '-39px', endY: '-85px', rotation: '-13deg' },
  { glyph: '𝄞', color: '#FF9B85', delay: '0.35s', duration: '3.44s', startX: '-4px', endX: '-41px', endY: '-99px', rotation: '1deg' },
  { glyph: '♪', color: '#FEE440', delay: '1.05s', duration: '3.25s', startX: '1px', endX: '-45px', endY: '-86px', rotation: '-10deg' },
];

const VINYL_NOTES_RIGHT: VinylNote[] = [
  { glyph: '𝄞', color: '#F15BB5', delay: '0.35s', duration: '2.49s', startX: '4px', endX: '36px', endY: '-108px', rotation: '-8deg' },
  { glyph: '♪', color: '#00BBF9', delay: '1.05s', duration: '3.49s', startX: '3px', endX: '28px', endY: '-96px', rotation: '11deg' },
  { glyph: '♬', color: '#C2F970', delay: '0s', duration: '2.88s', startX: '3px', endX: '50px', endY: '-122px', rotation: '5deg' },
  { glyph: '♫', color: '#F15BB5', delay: '0.7s', duration: '3.41s', startX: '-3px', endX: '28px', endY: '-90px', rotation: '-4deg' },
  { glyph: '♪', color: '#00BBF9', delay: '1.4s', duration: '2.62s', startX: '5px', endX: '29px', endY: '-104px', rotation: '9deg' },
];

function VinylNoteGlyph({ note }: { note: VinylNote }) {
  const isClef = note.glyph === '𝄞';
  return (
    <span
      className={`about-vinyl-note ${isClef ? 'about-vinyl-clef' : pixelNotes.className}`}
      style={{
        color: note.color,
        animationDelay: note.delay,
        animationDuration: note.duration,
        '--note-start-x': note.startX,
        '--note-end-x': note.endX,
        '--note-end-y': note.endY,
        '--note-rotation': note.rotation,
      } as CSSProperties}
    >
      {note.glyph}
    </span>
  );
}

function VinylNoteEmitter() {
  return (
    <div className="about-vinyl-notes" aria-hidden>
      <div className="about-vinyl-notes-side is-left">
        {VINYL_NOTES_LEFT.map((note, index) => (
          <VinylNoteGlyph key={`left-${index}`} note={note} />
        ))}
      </div>
      <div className="about-vinyl-notes-side is-right">
        {VINYL_NOTES_RIGHT.map((note, index) => (
          <VinylNoteGlyph key={`right-${index}`} note={note} />
        ))}
      </div>
    </div>
  );
}

function AboutTextPlate({
  text,
  isDark,
  mounted,
  className = '',
}: {
  text: string;
  isDark: boolean;
  mounted: boolean;
  className?: string;
}) {
  if (!mounted) return <div className={`min-h-16 ${className}`} />;

  const src = createTextImage(text, isDark);
  if (!src) return null;

  return (
    <div
      className={`about-sheen-host about-text-plate ${className}`}
      style={{ '--about-sheen-delay': `${(text.length % 5) * 1.6}s` } as CSSProperties}
    >
      <img src={src} alt={text} className="h-auto w-full" />
      <span className="about-sheen" aria-hidden />
    </div>
  );
}

function AboutNote({
  children,
  rotation = -2,
  className = '',
}: {
  children: ReactNode;
  rotation?: number;
  className?: string;
}) {
  return (
    <p
      className={`${noteHand.className} relative z-20 max-w-[16rem] text-[1.45rem] leading-snug text-text-secondary ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </p>
  );
}

function AboutSticker({
  src,
  alt,
  rotation = -8,
  className = '',
  size = 'md',
  imageClass = 'h-full w-full',
  idle,
  interactive = false,
}: {
  src: string;
  alt: string;
  rotation?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'vinyl' | 'sitecore';
  imageClass?: string;
  idle?: 'breathe';
  interactive?: boolean;
}) {
  const shell = {
    sm: 'h-[3.75rem] w-[3.75rem] p-2',
    md: 'h-28 w-28 p-3 md:h-32 md:w-32 md:p-3.5',
    lg: 'h-32 w-32 p-3.5 md:h-36 md:w-36 md:p-4',
    vinyl: 'h-32 w-32 p-1.5 md:h-36 md:w-36 md:p-2',
    sitecore: 'h-[5.75rem] w-[5.75rem] p-4 md:h-[6.75rem] md:w-[6.75rem] md:p-5',
  }[size];

  return (
    <div
      className={`shrink-0 ${interactive ? '' : 'pointer-events-none'} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-white ${shell} ${idle === 'breathe' ? 'about-sticker-breathe' : ''}`}
      >
        <img
          src={src}
          alt={alt}
          className={`${imageClass} object-contain`}
        />
      </div>
    </div>
  );
}

function AboutCredential({
  award,
  programme,
  place,
  dates,
  rotation = 0,
  width = '18rem',
  showBrain = false,
}: {
  award: string;
  programme: string;
  place: string;
  dates: string;
  rotation?: number;
  width?: string;
  showBrain?: boolean;
}) {
  return (
    <article
      className="relative overflow-visible bg-white px-6 pb-7 pt-6 shadow-[0_10px_24px_rgba(34,34,34,0.08)]"
      style={{
        transform: `rotate(${rotation}deg)`,
        width,
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 30px, rgba(34,34,34,0.055) 30px, rgba(34,34,34,0.055) 31px)',
        backgroundPosition: '0 4.15rem',
      }}
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-[#e24b4b]/80" aria-hidden />
      {showBrain && (
        <AboutSticker
          src={STICKER_BRAIN}
          alt="Brain"
          size="sm"
          rotation={12}
          idle="breathe"
          className="absolute -right-4 -top-5 z-20"
        />
      )}
      <p className="pl-2 font-[family-name:var(--font-sfpro)] text-[0.7rem] font-medium uppercase tracking-[0.18em] text-neutral-400">
        {award}
      </p>
      <h3 className="mt-2 pl-2 font-[family-name:var(--font-sfpro)] text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.03em] text-neutral-950">
        {programme}
      </h3>
      <p className={`${noteHand.className} mt-6 pl-2 text-[1.5rem] leading-tight text-neutral-800`}>
        {place}
      </p>
      <p className={`${noteHand.className} mt-0.5 pl-2 text-[1.28rem] leading-tight text-neutral-500`}>
        {dates}
      </p>
    </article>
  );
}

// Helper function to generate text image as data URL
const createTextImage = (text: string, isDark: boolean = false): string => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  // Use wider canvas to support larger screens (CSS will control display width)
  const width = 1200;
  const lineHeight = 60;
  const padding = 40; // 20px on each side
  const maxWidth = width - padding;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Set text style (need to set font before measuring)
  ctx.font = '500 48px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Word wrap text and calculate lines
  const words = text.split(' ');
  let line = '';
  const lines: string[] = [];
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  
  // Calculate dynamic height based on number of lines
  const minHeight = 200;
  const calculatedHeight = Math.max(minHeight, lines.length * lineHeight + padding);
  const height = calculatedHeight;
  
  // Resize canvas to fit all text
  canvas.width = width;
  canvas.height = height;
  
  // Clear and set background (transparent)
  ctx.clearRect(0, 0, width, height);
  
  // Get accent color from CSS variable (only for light mode)
  let accentColor = '#E5FF20'; // Default fallback
  if (typeof document !== 'undefined') {
    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue('--accent-tertiary').trim();
    if (accent) accentColor = accent;
  }
  
  // Set text style again after canvas resize
  ctx.font = '500 48px "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  
  // Draw text starting from top with padding
  let y = padding / 2;
  lines.forEach((line) => {
    const lineText = line.trim();
    const textMetrics = ctx.measureText(lineText);
    const textWidth = textMetrics.width;
    const textX = padding / 2;
    
    // Draw accent color background highlight (only in light mode)
    if (!isDark) {
      // Calculate highlight position: 40% down from top of line
      const highlightStartY = y + (lineHeight * 0.4);
      const highlightHeight = lineHeight * 0.6; // Lower 60% of line
      
      ctx.fillStyle = accentColor;
      ctx.fillRect(textX, highlightStartY, textWidth, highlightHeight);
    }
    
    // Draw text on top
    ctx.fillStyle = isDark ? '#ffffff' : '#000000';
    ctx.fillText(lineText, textX, y);
    
    y += lineHeight;
  });
  
  return canvas.toDataURL('image/png');
};

// Customize the horizontal scroll items here
// Add or remove items from this array to change what appears in the horizontal scroll
const place = (spread: boolean, compact: string, positioned: string) =>
  spread ? `absolute ${positioned}` : compact;

const getHorizontalScrollItems = (isDark: boolean, mounted: boolean = false, spread: boolean = false): Array<{
  id: string;
  content: ReactNode;
  width?: string; // Optional: override default width (e.g., 'w-[50vw]')
  yOffset?: string; // Optional: vertical offset for positioning
}> => [
  {
    id: 'title',
    yOffset: spread ? '' : 'mt-[6vh]',
    width: 'w-max',
    content: (
      <div className={spread ? 'relative h-[88vh] w-[56vw] min-w-[42rem] pl-[18vw]' : 'pl-28 md:pl-52 lg:pl-72'}>
        <h2
          className={`whitespace-nowrap font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary ${spread ? 'absolute left-[14%] top-[12%] text-7xl xl:text-8xl' : 'ml-[10vw] text-6xl md:text-8xl'}`}
          style={{ transform: 'rotate(-2deg)' }}
        >
          Who is Thomas?
        </h2>
        <p
          className={`font-[family-name:var(--font-sfpro)] font-medium leading-[1.05] tracking-[-0.02em] text-text-secondary ${spread ? 'absolute left-[28%] top-[62%] max-w-[20ch] text-4xl xl:text-5xl' : 'mt-16 ml-[6vw] max-w-[18ch] text-3xl md:ml-[8vw] md:text-4xl'}`}
          style={{ transform: 'rotate(-2.5deg)' }}
        >
          Bringing initiatives from 0 → 1.
        </p>
      </div>
    ),
  },
  {
    id: 'sitecore',
    yOffset: spread ? '' : 'mt-[2vh]',
    width: 'w-max',
    content: (
      <div
        className={
          spread
            ? 'relative h-[88vh] w-[max(calc(82vw*0.76),calc(64vw*0.76+17rem))] max-w-[76vw]'
            : 'flex items-start'
        }
      >
        <div
          className={place(
            spread,
            'relative mt-[2vh] w-[62vw] max-w-[18rem] md:max-w-[21rem]',
            'left-0 top-[6%] w-[calc(38vw*0.76)]',
          )}
        >
          <AboutPolaroid
            src={ABOUT_IMAGES[0]}
            alt="Thomas with colleagues in the Sitecore office"
            caption="Sitecore, since Aug 2024"
            rotation={-4}
            className="w-[94%]"
          >
            <AboutSticker
              src={SITECORE_MARK}
              alt="Sitecore"
              rotation={-8}
              size="sitecore"
              className="absolute -bottom-5 -left-6 z-20"
            />
          </AboutPolaroid>
        </div>
        <div
          className={place(
            spread,
            'relative z-10 mt-[14vh] w-[76vw] max-w-md md:mt-[18vh] md:max-w-lg',
            'left-[calc(40vw*0.76)] top-[58%] z-10 w-[calc(42vw*0.76)]',
          )}
        >
          <AboutTextPlate
            text="Thomas joined Sitecore in August 2024 as their AI designer. The role grew into owning AI-enablement, rebuilding the design system, and taking new products from idea to execution."
            isDark={isDark}
            mounted={mounted}
            className="-rotate-1"
          />
          <AboutNote rotation={2.5} className="mt-3 ml-6 max-w-[22rem] md:ml-12">
            Thomas has designed Agentic Studio, SitecoreAI DAM, Blok, and merged CDP and Personalize into SitecoreAI.
          </AboutNote>
        </div>
        <div className={place(spread, 'mt-[4vh] ml-3 w-[14rem]', 'left-[calc(64vw*0.76)] top-[6%] w-[17rem]')}>
          <AboutSticker
            src={STICKER_100}
            alt="Hundred points"
            rotation={8}
            size={spread ? 'lg' : 'md'}
            imageClass="h-[84%] w-[84%]"
            className="mb-3 ml-2"
          />
          <AboutNote rotation={-6} className="max-w-[18rem]">
            Selected for the Sitecore Top100 programme for being “the future of the company”. Thomas is now mentored by Sitecore executives.
          </AboutNote>
        </div>
      </div>
    ),
  },
  {
    id: 'education',
    yOffset: spread ? '' : 'mt-[1vh]',
    width: 'w-max',
    content: (
      <div
        className={
          spread
            ? 'relative h-[88vh] w-[max(76rem,calc(66vw*0.92))] max-w-[92vw]'
            : 'mr-10 flex items-start gap-10 md:mr-20 md:gap-16'
        }
      >
        <div
          className={place(
            spread,
            'mb-3 mt-[20vh] w-full',
            'absolute left-[calc(1vw*0.92)] top-[54%]',
          )}
        >
          <h3
            className="font-[family-name:var(--font-ppvalve)] text-4xl font-medium text-text-secondary xl:text-5xl"
            style={{ transform: 'rotate(-2deg)' }}
          >
            Education
          </h3>
        </div>
        <div className={place(spread, 'mt-[16vh] md:mt-[26vh]', 'left-[54rem] top-[74%]')}>
          <AboutCredential
            award="Bachelor of Arts"
            programme="Interaction Design"
            place="NCAD, Dublin"
            dates="Aug 2020 – Jun 2024"
            rotation={-5}
            width={spread ? '22rem' : '19rem'}
          />
        </div>
        <div
          className={place(
            spread,
            'relative z-10 mt-[5vh] w-[74vw] max-w-sm md:mt-[11vh] md:max-w-md',
            'left-0 top-[8%] z-10 w-[calc(32vw*0.92)]',
          )}
        >
          <AboutTextPlate
            text="He studied Interaction Design at NCAD, and partway through added a higher diploma in AI Applications at CCT. In August 2026 he started an MSc in Leadership, Innovation & Technology at TU Dublin."
            isDark={isDark}
            mounted={mounted}
            className="rotate-[0.6deg]"
          />
        </div>
        <div
          className={place(
            spread,
            'mt-[1vh] w-[62vw] max-w-[16.5rem] md:max-w-[18.5rem]',
            'left-[calc(42vw*0.92)] top-[8%] w-[calc(24vw*0.92)]',
          )}
        >
          <AboutPolaroid
            src={ABOUT_IMAGES[1]}
            alt="Thomas at his NCAD degree show, in front of the Recite project"
            caption="NCAD, degree show"
            rotation={4}
            className="w-full"
          />
          <AboutNote rotation={-2} className="mt-2 ml-4 max-w-[18rem]">
            Recite being showcased at the NCAD degree show. It was an interactive exhibition where viewers could improve their public speaking skills.
          </AboutNote>
        </div>
        <div className={place(spread, 'mt-[22vh] md:mt-[32vh]', 'left-[28rem] top-[74%]')}>
          <AboutCredential
            award="Higher Diploma"
            programme="AI Applications"
            place="CCT, Dublin"
            dates="Jun 2022 – Apr 2023"
            rotation={6}
            width={spread ? '19rem' : '16.5rem'}
          />
        </div>
        <div className={place(spread, 'mt-[10vh] md:mt-[18vh]', 'left-[calc(1vw*0.92)] top-[65%]')}>
          <AboutCredential
            award="Masters of Science"
            programme="Leadership, Innovation & Technology"
            place="TU Dublin"
            dates="Aug 2026 – now"
            rotation={-3}
            width={spread ? '24rem' : '21rem'}
            showBrain
          />
          <AboutNote rotation={3} className="mt-3 ml-3 max-w-[20rem]">
            Thomas is trying to upskill by learning management and leadership skills for when he gets a design team of his own.
          </AboutNote>
        </div>
      </div>
    ),
  },
  {
    id: 'making',
    yOffset: spread ? '' : 'mt-[3vh]',
    width: 'w-max',
    content: (
      <div className={spread ? 'relative h-[88vh] w-[52vw]' : 'flex items-start'}>
        <div
          className={place(
            spread,
            'mt-[6vh] mr-2 w-[13rem] md:mt-[10vh]',
            'left-[calc(2vw*0.68)] top-[8%] w-[16rem]',
          )}
        >
          <div className="relative mb-4 w-max">
            <a
              href="https://www.littlerecordplayer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-max cursor-none"
              aria-label="Open Littlerecordplayer in a new tab"
            >
              <AboutSticker
                src={STICKER_VINYL}
                alt="Vinyl record — Littlerecordplayer"
                rotation={-12}
                size="vinyl"
                interactive
              />
              <VinylNoteEmitter />
            </a>
          </div>
          <AboutNote rotation={-6} className="max-w-[18rem]">
            Littlerecordplayer, one of Thomas' favourite projects. It is now used in schools to play music for kids.
          </AboutNote>
        </div>
        <div
          className={place(
            spread,
            'relative z-10 mt-[20vh] w-[74vw] max-w-md md:mt-[32vh] md:max-w-lg',
            'left-[calc(4vw*0.68)] top-[66%] z-10 w-[calc(46vw*0.68)]',
          )}
        >
          <AboutTextPlate
            text="Outside of work, he builds his own products. Mostly because he can’t leave an idea sitting there."
            isDark={isDark}
            mounted={mounted}
            className="-rotate-[1.4deg]"
          />
        </div>
        <div
          className={place(
            spread,
            'mt-[2vh] ml-0 w-[66vw] max-w-[19rem] md:max-w-[22rem]',
            'left-[calc(32vw*0.68)] top-[8%] w-[calc(44vw*0.68)]',
          )}
        >
          <AboutPolaroid
            src={ABOUT_IMAGES[2]}
            alt="A desk at night, design on one screen and code on the other"
            caption="After hours"
            rotation={5}
            className="w-[88%]"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'cars',
    yOffset: spread ? '' : 'mt-[2vh]',
    width: 'w-max',
    content: (
      <div
        className={
          spread
            ? 'relative h-[88vh] w-[34vw] min-w-[20rem] max-w-[28rem]'
            : 'flex flex-col items-start gap-8'
        }
      >
        <div
          className={place(
            spread,
            'relative z-10 w-[74vw] max-w-md md:max-w-lg',
            'left-[4%] top-[13%] z-10 w-[30vw]',
          )}
        >
          <AboutTextPlate
            text="When he’s not designing or coding, he’s usually working on his cars. It’s an obsession."
            isDark={isDark}
            mounted={mounted}
            className="rotate-1"
          />
        </div>
        <div
          className={place(
            spread,
            'w-full max-w-[24rem] md:max-w-[27rem]',
            'left-[4%] top-[46%] w-[96%] max-w-[27rem]',
          )}
        >
          <AboutPolaroid
            src={ABOUT_IMAGES[3]}
            alt="A dark green Mazda MX-5 with the front end off, tools across the driveway"
            caption="The driveway"
            rotation={-4}
            className="w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'cv-resume',
    yOffset: spread ? '' : 'mt-[20vh]',
    width: 'w-max',
    content: (
      <div className={spread ? 'relative h-[88vh] w-[34rem]' : ''}>
      <div
        className={`relative flex min-w-[280px] flex-col items-center justify-center gap-2 px-4 ${spread ? 'absolute top-[34%] left-8' : 'mr-16 ml-8 md:mr-28 md:ml-16'}`}
        style={{ transform: 'rotate(4deg)' }}
      >
        <p
          className="text-center text-3xl font-[family-name:var(--font-ppvalve)] font-medium leading-tight text-text-secondary md:text-4xl lg:text-5xl"
          style={{ transform: 'rotate(-7deg)' }}
        >
          Check out his CV
        </p>
        <svg
          className="about-cv-arrow text-text-secondary"
          width="72"
          height="56"
          viewBox="0 0 72 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M36 4 C28 18, 32 32, 36 44"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M36 44 L28 36 M36 44 L44 36"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <a
          href="/pdfs/thomas_cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-accent-tertiary px-6 py-3 font-medium text-[#222222] transition-opacity hover:opacity-90"
        >
          View CV/Resume
        </a>
      </div>
      </div>
    ),
  },
];

/** Vertical bands above/below the pin: grid bleeds here, fades live here, then you pin past them */
const ABOUT_GRID_FADE_VH = 20;

export const AboutSection = forwardRef<HTMLElement>((props, ref) => {
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [spread, setSpread] = useState(false);

  useLayoutEffect(() => {
    const query = window.matchMedia('(min-width: 1200px) and (min-height: 880px)');
    const update = () => setSpread(query.matches);
    update();
    setMounted(true);
    query.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      query.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const isDark = resolvedTheme === 'dark' || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  const horizontalScrollItems = useMemo(
    () => getHorizontalScrollItems(isDark, mounted, spread),
    [isDark, mounted, spread],
  );

  useEffect(() => {
    if (!pinWrapperRef.current || !horizontalScrollRef.current) return;

    const pinWrapper = pinWrapperRef.current;
    const horizontalScroll = horizontalScrollRef.current;

    // Calculate the total scroll distance needed
    const scrollWidth = horizontalScroll.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(horizontalScroll, {
      x: -scrollWidth,
      ease: 'power1.out',
      roundProps: 'x',
      scrollTrigger: {
        trigger: pinWrapper,
        start: 'top top',
        end: () => `+=${scrollWidth}`, // Normal scroll distance
        scrub: 1, // Standard response
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, [gsap, ScrollTrigger, horizontalScrollItems]);

  // Recalculate horizontal scroll when track width changes (images, text images)
  useEffect(() => {
    if (!horizontalScrollRef.current) return;

    const track = horizontalScrollRef.current;
    let lastWidth = track.offsetWidth;
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

    const scheduleRefresh = () => {
      if (refreshTimeout) clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const nextWidth = Math.round(entry.contentRect.width);
      if (nextWidth === lastWidth) return;
      lastWidth = nextWidth;
      scheduleRefresh();
    });

    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, [ScrollTrigger, horizontalScrollItems]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-no-select relative w-full select-none overflow-hidden mt-48 sm:mt-64 md:mt-80 lg:mt-96 mb-32"
    >
      {/* Scroll through this fade before the pin; grid bleeds up into this band */}
      <div
        className="relative z-10 pointer-events-none"
        style={{ height: `${ABOUT_GRID_FADE_VH}vh` }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* Pinned horizontal scroll: full viewport of grid, no fade overlay */}
      <div
        ref={pinWrapperRef}
        className="relative z-0 h-screen"
        style={{ clipPath: `inset(-${ABOUT_GRID_FADE_VH}vh 0)` }}
        data-about-paint
      >
        <div
          ref={horizontalScrollRef}
          className="absolute left-0 top-0 flex h-full items-start gap-24 px-8"
          style={{ width: 'fit-content' }}
        >
          <AboutArchitecturalPlaneBackground
            className="absolute inset-x-0 z-0 pointer-events-none bg-background"
            fadeVh={ABOUT_GRID_FADE_VH}
            onReady={() => ScrollTrigger.refresh()}
          />
          <AboutPaintLayer containerRef={horizontalScrollRef} />
          {horizontalScrollItems.map((item) => (
            <div
              key={item.id}
              className={`relative z-10 flex-shrink-0 ${item.width || 'w-[60vw] md:w-[40vw]'} ${item.yOffset || ''}`.trim()}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* After the pin, scroll through this fade as the grid leaves */}
      <div
        className="relative z-10 pointer-events-none"
        style={{ height: `${ABOUT_GRID_FADE_VH}vh` }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
