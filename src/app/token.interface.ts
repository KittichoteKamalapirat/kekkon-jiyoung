export const SIZE = {
  XXL: "XXL",
  XL: "XL",
  LARGE: "LARGE",
  MEDIUM: "MEDIUM",
  SMALL: "SMALL",
  XS: "XS",
} as const;

export type Size = ObjectValues<typeof SIZE>;

export type Context = "contained" | "standalone";
export type Background = "default" | "lightgrey" | "lightblue";

export interface TextFieldSize {
  XXL: "xxl"; // size of text and padding
  XL: "xl";
  LARGE: "large";
  MEDIUM: "medium";
  SMALL: "small";
  XS: "xs";
}

export type TextFieldSizeKey = keyof TextFieldSize; // "XXL" | "XL" ...
export type TextFieldSizeValue = TextFieldSize[TextFieldSizeKey]; // "xxl" | "xl" ...

export const FONT_SIZE = {
  "2xs": "2xs",
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
} as const;

export type FontSize = ObjectValues<typeof FONT_SIZE>;

export type ObjectKeys<T> = keyof T;
export type ObjectValues<T> = T[keyof T];

export const DIRECTION = {
  VERTICAL: "VERTICAL",
  HORIZONTAL: "HORIZONTAL",
} as const;

export type Direction = ObjectValues<typeof DIRECTION>;
