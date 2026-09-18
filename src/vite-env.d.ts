/// <reference types="vite/client" />

declare module '@google/model-viewer';
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'auto-rotate'?: boolean;
        'auto-rotate-delay'?: string;
        'rotation-per-second'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        'camera-controls'?: string | boolean;
        'disable-zoom'?: boolean;
        'interaction-prompt'?: string;
        'shadow-intensity'?: string;
        exposure?: string;
      },
      HTMLElement
    >;
  }
}
