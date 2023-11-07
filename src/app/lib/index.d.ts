declare module "google-map-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      set: {
        attributeName: string;
        begin: string;
        to: string;
      };
    }
  }
}
