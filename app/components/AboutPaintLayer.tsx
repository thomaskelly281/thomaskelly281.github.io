'use client';

import { useEffect, useRef } from 'react';

const PAINT_LIFETIME_MS = 4500;
const FADE_MS = 900;
const MARKER_WIDTH = 22;
const MARKER_BLUE = '#2F6CFF';
const MARKER_CORE = '#9EC0FF';

type Point = { x: number; y: number };

type Stroke = {
  points: Point[];
  createdAt: number;
};

type AboutPaintLayerProps = {
  containerRef: React.RefObject<HTMLElement | null>;
};

function isPaintBlockedTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return true;
  return Boolean(target.closest('a, button, [role="button"], input, textarea, select'));
}

function clearTextSelection() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) selection.removeAllRanges();
}

export function AboutPaintLayer({ containerRef }: AboutPaintLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const activeStrokeRef = useRef<Stroke | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (window.innerWidth < 1024) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const toLocal = (clientX: number, clientY: number): Point => {
      const rect = container.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const traceStroke = (points: Point[]) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      if (points.length === 2) {
        ctx.lineTo(points[1].x, points[1].y);
        return;
      }
      for (let i = 1; i < points.length - 1; i += 1) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
    };

    const drawStroke = (stroke: Stroke, opacity: number) => {
      if (stroke.points.length === 0 || opacity <= 0) return;
      ctx.save();
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'bevel';

      if (stroke.points.length === 1) {
        const point = stroke.points[0];
        ctx.translate(point.x, point.y);
        ctx.rotate(-0.66);
        ctx.globalAlpha = opacity * 0.92;
        ctx.fillStyle = MARKER_BLUE;
        ctx.beginPath();
        ctx.roundRect(-MARKER_WIDTH / 2, -5, MARKER_WIDTH, 10, 2);
        ctx.fill();
        ctx.globalAlpha = opacity * 0.55;
        ctx.fillStyle = MARKER_CORE;
        ctx.beginPath();
        ctx.roundRect(-3.5, -5, 7, 10, 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      traceStroke(stroke.points);
      ctx.globalAlpha = opacity * 0.9;
      ctx.strokeStyle = MARKER_BLUE;
      ctx.lineWidth = MARKER_WIDTH;
      ctx.stroke();

      traceStroke(stroke.points);
      ctx.globalAlpha = opacity * 0.5;
      ctx.strokeStyle = MARKER_CORE;
      ctx.lineWidth = 7;
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, container.offsetWidth, container.offsetHeight);
      const now = Date.now();

      strokesRef.current = strokesRef.current.filter((stroke) => {
        const age = now - stroke.createdAt;
        if (age >= PAINT_LIFETIME_MS) return false;
        const fadeStart = PAINT_LIFETIME_MS - FADE_MS;
        const opacity = age < fadeStart ? 1 : 1 - (age - fadeStart) / FADE_MS;
        drawStroke(stroke, Math.max(0, opacity));
        return true;
      });

      if (activeStrokeRef.current) {
        drawStroke(activeStrokeRef.current, 1);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const startStroke = (clientX: number, clientY: number) => {
      activeStrokeRef.current = {
        points: [toLocal(clientX, clientY)],
        createdAt: Date.now(),
      };
    };

    const extendStroke = (clientX: number, clientY: number) => {
      const stroke = activeStrokeRef.current;
      if (!stroke) return;
      const point = toLocal(clientX, clientY);
      const last = stroke.points[stroke.points.length - 1];
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx * dx + dy * dy < 4) return;
      stroke.points.push(point);
    };

    const endStroke = () => {
      if (!activeStrokeRef.current) return;
      strokesRef.current.push(activeStrokeRef.current);
      activeStrokeRef.current = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!activeStrokeRef.current) return;
      if (event.buttons !== 1) return;
      event.preventDefault();
      extendStroke(event.clientX, event.clientY);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!activeStrokeRef.current) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      endStroke();
      clearTextSelection();
      event.preventDefault();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (isPaintBlockedTarget(event.target)) return;
      event.preventDefault();
      clearTextSelection();
      startStroke(event.clientX, event.clientY);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };

    const blockMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (isPaintBlockedTarget(event.target)) return;
      event.preventDefault();
      clearTextSelection();
    };

    const blockSelection = (event: Event) => {
      event.preventDefault();
      clearTextSelection();
    };

    resize();
    rafRef.current = requestAnimationFrame(render);

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener('resize', resize);
    container.addEventListener('pointerdown', onPointerDown, true);
    container.addEventListener('mousedown', blockMouseDown, true);
    container.addEventListener('dragstart', blockSelection, true);
    container.addEventListener('selectstart', blockSelection, true);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('pointerdown', onPointerDown, true);
      container.removeEventListener('mousedown', blockMouseDown, true);
      container.removeEventListener('dragstart', blockSelection, true);
      container.removeEventListener('selectstart', blockSelection, true);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 z-[1]"
      aria-hidden
    />
  );
}
