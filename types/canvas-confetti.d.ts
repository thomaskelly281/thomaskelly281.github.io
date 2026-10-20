declare module 'canvas-confetti' {
  type ConfettiOrigin = {
    x?: number;
    y?: number;
  };

  type ConfettiOptions = {
    particleCount?: number;
    spread?: number;
    origin?: ConfettiOrigin;
  };

  function confetti(options?: ConfettiOptions): Promise<null> | null;

  export default confetti;
}
