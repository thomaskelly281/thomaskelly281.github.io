declare module 'vanta/dist/vanta.dots.min' {
  type VantaEffect = {
    destroy: () => void;
  };

  type VantaDotsOptions = {
    el: HTMLElement;
    THREE?: any; // THREE.js library instance
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: string | number;
    color2?: string | number;
    backgroundColor?: string | number;
  };

  const VantaDots: (options: VantaDotsOptions) => VantaEffect;
  export default VantaDots;
}
