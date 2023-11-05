import { Fragment, MouseEventHandler } from "react";

import clsx from "clsx";

import { ObjectValues } from "../../lib";
import { Size } from "../../token.interface";

export const FONT = {
  MARKETING: "MARKETING",
  BASE: "BASE",
} as const;

type Font = ObjectValues<typeof FONT>;

export const CONTENT_SIZE = {
  DISPLAY_XL: "DISPLAY_XL",
  DISPLAY_LARGE: "DISPLAY_LARGE",
  DISPLAY_MEDIUM: "DISPLAY_MEDIUM",
  DISPLAY_SMALL: "DISPLAY_SMALL",
  HEADING_1: "HEADING_1",
  XXL: "XXL",
  XL: "XL",
  LARGE: "LARGE",
  MEDIUM: "MEDIUM",
  SMALL: "SMALL",
  XS: "XS",
} as const;

export type ContentSize = ObjectValues<typeof CONTENT_SIZE>;

export const CONTENT_ALIGN = {
  CENTER: "CENTER",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
} as const;

type ContentAlign = ObjectValues<typeof CONTENT_ALIGN>;

export interface ContentProps {
  font?: Font;
  label?: string;
  labelClassName?: string;

  labelIconOnClick?: MouseEventHandler<HTMLDivElement>;
  description?: string;
  descriptionClassName?: string;

  descriptionIconOnClick?: MouseEventHandler<HTMLDivElement>;
  align?: ContentAlign;
  size?: ContentSize;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}
interface ClassNameProps {
  align: ContentAlign;
  size: ContentSize;
  disabled: boolean;
  font: Font;
  labelClassName?: string;
  descriptionClassName?: string;
}

const ALIGN_CLASS_NAME = {
  [CONTENT_ALIGN.LEFT]: "justify-between text-left",
  [CONTENT_ALIGN.CENTER]: "justify-center text-center",
  [CONTENT_ALIGN.RIGHT]: "justify-end text-right",
};

const LABEL_FONT_SIZE_CLASS_NAME = {
  [`${FONT.BASE}${CONTENT_SIZE.DISPLAY_XL}`]: "base-display-xl",
  [`${FONT.BASE}${CONTENT_SIZE.DISPLAY_LARGE}`]: "base-display-large",
  [`${FONT.BASE}${CONTENT_SIZE.DISPLAY_MEDIUM}`]: "base-display-medium",
  [`${FONT.BASE}${CONTENT_SIZE.DISPLAY_SMALL}`]: "base-display-small",
  [`${FONT.BASE}${CONTENT_SIZE.HEADING_1}`]: "base-headings-h1",
  [`${FONT.BASE}${CONTENT_SIZE.XXL}`]: "base-headings-h2",
  [`${FONT.BASE}${CONTENT_SIZE.XL}`]: "base-headings-h3",
  [`${FONT.BASE}${CONTENT_SIZE.LARGE}`]: "base-label-large",
  [`${FONT.BASE}${CONTENT_SIZE.MEDIUM}`]: "base-label-medium",
  [`${FONT.BASE}${CONTENT_SIZE.SMALL}`]: "base-label-small",
  [`${FONT.BASE}${CONTENT_SIZE.XS}`]: "base-label-xs",

  [`${FONT.MARKETING}${CONTENT_SIZE.DISPLAY_XL}`]: "marketing-display-xl",
  [`${FONT.MARKETING}${CONTENT_SIZE.DISPLAY_LARGE}`]: "marketing-display-large",
  [`${FONT.MARKETING}${CONTENT_SIZE.DISPLAY_MEDIUM}`]:
    "marketing-display-medium",
  [`${FONT.MARKETING}${CONTENT_SIZE.DISPLAY_SMALL}`]: "marketing-display-small",
  [`${FONT.MARKETING}${CONTENT_SIZE.HEADING_1}`]: "marketing-headings-h1",
  [`${FONT.MARKETING}${CONTENT_SIZE.XXL}`]: "marketing-headings-h2",
  [`${FONT.MARKETING}${CONTENT_SIZE.XL}`]: "marketing-headings-h3",
};

type DescriptionTypography =
  | "base-text-large"
  | "base-text-medium"
  | "base-text-small"
  | "base-text-xs";

const DESCRIPTION_FONT_SIZE_CLASS_NAME: Record<
  ContentSize,
  DescriptionTypography
> = {
  [CONTENT_SIZE.DISPLAY_XL]: "base-text-large",
  [CONTENT_SIZE.DISPLAY_LARGE]: "base-text-large",
  [CONTENT_SIZE.DISPLAY_MEDIUM]: "base-text-large",
  [CONTENT_SIZE.DISPLAY_SMALL]: "base-text-large",
  [CONTENT_SIZE.HEADING_1]: "base-text-large",
  [CONTENT_SIZE.XXL]: "base-text-large",
  [CONTENT_SIZE.XL]: "base-text-large",
  [CONTENT_SIZE.LARGE]: "base-text-large",
  [CONTENT_SIZE.MEDIUM]: "base-text-large",
  [CONTENT_SIZE.SMALL]: "base-text-large",
  [CONTENT_SIZE.XS]: "base-text-large",

  [CONTENT_SIZE.XL]: "base-text-large",
  [CONTENT_SIZE.LARGE]: "base-text-medium",
  [CONTENT_SIZE.MEDIUM]: "base-text-small",
  [CONTENT_SIZE.SMALL]: "base-text-xs",
  [CONTENT_SIZE.XS]: "base-text-xs",
} as const;

const DESCRIPTION_SPACING_CLASS_NAME: Record<ContentSize, string> = {
  [CONTENT_SIZE.DISPLAY_XL]: "mt-6",
  [CONTENT_SIZE.DISPLAY_LARGE]: "mt-6",
  [CONTENT_SIZE.DISPLAY_MEDIUM]: "mt-6",
  [CONTENT_SIZE.DISPLAY_SMALL]: "mt-4",
  [CONTENT_SIZE.HEADING_1]: "mt-4",
  [CONTENT_SIZE.XXL]: "mt-4",
  [CONTENT_SIZE.XL]: "",
  [CONTENT_SIZE.LARGE]: "",
  [CONTENT_SIZE.MEDIUM]: "",
  [CONTENT_SIZE.SMALL]: "",
  [CONTENT_SIZE.XS]: "",

  [CONTENT_SIZE.XL]: "",
  [CONTENT_SIZE.LARGE]: "",
  [CONTENT_SIZE.MEDIUM]: "",
  [CONTENT_SIZE.SMALL]: "",
  [CONTENT_SIZE.XS]: "",
} as const;

const LABEL_ICON_SIZE: Record<ContentSize, Size> = {
  [CONTENT_SIZE.DISPLAY_XL]: "XL",
  [CONTENT_SIZE.DISPLAY_LARGE]: "LARGE",
  [CONTENT_SIZE.DISPLAY_MEDIUM]: "MEDIUM",
  [CONTENT_SIZE.DISPLAY_SMALL]: "SMALL",
  [CONTENT_SIZE.HEADING_1]: "SMALL",
  [CONTENT_SIZE.XXL]: "SMALL",
  [CONTENT_SIZE.XL]: "SMALL",
  [CONTENT_SIZE.LARGE]: "SMALL",
  [CONTENT_SIZE.MEDIUM]: "SMALL",
  [CONTENT_SIZE.SMALL]: "SMALL",
  [CONTENT_SIZE.XS]: "SMALL",
};

const DESCRIPTION_ICON_SIZE: Record<ContentSize, Size> = {
  [CONTENT_SIZE.DISPLAY_XL]: "XL",
  [CONTENT_SIZE.DISPLAY_LARGE]: "LARGE",
  [CONTENT_SIZE.DISPLAY_MEDIUM]: "MEDIUM",
  [CONTENT_SIZE.DISPLAY_SMALL]: "SMALL",
  [CONTENT_SIZE.HEADING_1]: "SMALL",
  [CONTENT_SIZE.XXL]: "SMALL",
  [CONTENT_SIZE.XL]: "SMALL",
  [CONTENT_SIZE.LARGE]: "SMALL",
  [CONTENT_SIZE.MEDIUM]: "SMALL",
  [CONTENT_SIZE.SMALL]: "SMALL",
  [CONTENT_SIZE.XS]: "SMALL",
};

export const getContentClassName = ({
  align,
  size,
  disabled,
  font,
  labelClassName,
  descriptionClassName,
}: ClassNameProps) => {
  const containerClasses = clsx(
    "flex items-center gap-1",
    ALIGN_CLASS_NAME[align]
  );
  const labelClasses = clsx(
    labelClassName,
    disabled ? "text-opacity-black-24" : "text-lm-text",
    LABEL_FONT_SIZE_CLASS_NAME[`${font}${size}`]
  );
  const descriptionClasses = clsx(
    descriptionClassName,
    "whitespace-break-spaces",
    disabled ? "text-opacity-black-24" : "text-lm-text-light",
    DESCRIPTION_FONT_SIZE_CLASS_NAME[size],
    DESCRIPTION_SPACING_CLASS_NAME[size]
  );
  const labelIconSize = LABEL_ICON_SIZE[size];
  const descriptionIconSize = DESCRIPTION_ICON_SIZE[size];

  return {
    containerClasses,
    labelClasses,
    descriptionClasses,
    labelIconSize,
    descriptionIconSize,
  };
};
export const Content = ({
  font = "BASE",
  label,
  labelClassName = "",

  labelIconOnClick,
  description,
  descriptionClassName = "",

  descriptionIconOnClick,
  align = CONTENT_ALIGN.LEFT,
  size = CONTENT_SIZE.MEDIUM,
  disabled = false,
  className = "",
  "data-testid": testId = "content",
}: ContentProps) => {
  const {
    containerClasses,
    labelClasses,
    descriptionClasses,
    labelIconSize,
    descriptionIconSize,
  } = getContentClassName({
    align,
    size,
    disabled,
    font,
    labelClassName,
    descriptionClassName,
  });

  const hasLabel = !!label;
  const hasDescription = !!description;

  return (
    <div className={clsx(className, !hasDescription && "my-auto")}>
      {hasLabel && (
        <div className={containerClasses}>
          <p className={labelClasses} data-testid={`${testId}-label`}>
            {label}
          </p>
        </div>
      )}

      {hasDescription && (
        <div className={containerClasses}>
          <p
            className={descriptionClasses}
            data-testid={`${testId}-description`}
          >
            {description &&
              description.split("\n").map((line, index) => {
                const linesNum = description.split("\n").length;
                const isLastLine = index === linesNum - 1;
                return (
                  <Fragment key={index}>
                    {line}
                    {!isLastLine && <br />}
                  </Fragment>
                );
              })}
          </p>
        </div>
      )}
    </div>
  );
};
export default Content;
