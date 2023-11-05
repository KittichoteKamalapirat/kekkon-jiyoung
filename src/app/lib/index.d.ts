export type ObjectKeys<T> = keyof T;
export type ObjectValues<T> = T[keyof T];

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
