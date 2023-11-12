/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, MouseEvent, ReactNode } from "react";

import clsx from "clsx";

import Content from "../Content/Content";

import { RadioGroup } from "@headlessui/react";
import { Direction } from "../../token.interface";

export interface SuperRadioItemProps<T = string> {
  mainLabel: string;
  mainLabelClassName?: string;
  mainDescription?: string;
  mainDescriptionClassName?: string;
  minorLabel?: string;
  minorLabelClassName?: string;
  minorDescription?: string;
  minorDescriptionClassName?: string;
  value: T;
  icon?: ReactNode;
  "data-testid"?: string;
  className?: string;
  disabled?: boolean;
}

export type MouseEventHandlerWithValue<T> = MouseEvent<
  T,
  globalThis.MouseEvent
> & {
  target: EventTarget & { value: string };
};
export interface SuperRadioProps<T> {
  name: string;
  value?: T;
  items: SuperRadioItemProps[];
  orientation?: Direction;
  className?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  onClick?: (event: MouseEventHandlerWithValue<HTMLDivElement>) => void;
  defaultValue?: T;
}

export const SuperRadio = forwardRef<HTMLInputElement, SuperRadioProps<string>>(
  (props, ref) => {
    const { items, onChange, onClick, orientation, ...radioGroupProps } = props;

    const handleClick = (e: MouseEventHandlerWithValue<HTMLDivElement>) => {
      onClick?.(e);
    };

    return (
      <RadioGroup
        ref={ref}
        onChange={(value) => {
          return onChange && onChange({ target: { value, name: props.name } });
        }}
        {...radioGroupProps}
      >
        {items.map((item, index) => (
          <RadioGroup.Option
            onClick={(e: any) =>
              handleClick({ ...e, target: { ...e.target, value: item.value } })
            }
            key={`radio-option-${index}`}
            value={item.value}
            className="flex-1"
            data-testid={item["data-testid"]}
            disabled={item.disabled}
          >
            {({ checked }) => {
              return (
                <div
                  className={clsx(
                    "flex justify-between gap-2 rounded-md border-[1px] px-4 py-2 bg-white",
                    orientation === "HORIZONTAL"
                      ? "flex-row"
                      : "h-full flex-col items-center",
                    item.className,
                    item.disabled
                      ? "bg-lm-disabled hover:cursor-not-allowed"
                      : clsx(
                          "hover:cursor-pointer hover:shadow ",
                          "border-lm-border bg-lm-bg ", // color
                          "bg-lm-bg hover:border-lm-border-hover ", // color hover

                          {
                            " focus:shadow-controls-selected-focus bg-blue-50 border-blue-500 ":
                              checked,
                            "hover:shadow-controls-unselected-hover border-opacity-black-8 hover:border-opacity-black-24 ":
                              !checked,
                          }
                        )
                  )}
                >
                  <div
                    className={clsx(
                      "flex gap-2",
                      orientation === "HORIZONTAL"
                        ? "flex-row items-start"
                        : "flex-col items-center"
                    )}
                  >
                    {item.icon || (
                      <>
                        <label
                          id={"questionnaire-" + item.mainLabel}
                          className="hidden"
                        >
                          {item.mainLabel}
                        </label>
                        <input
                          aria-labelledby={"questionnaire-" + item.mainLabel}
                          className="m-1 accent-blue"
                          type={"radio"}
                          checked={checked}
                          readOnly
                        />
                      </>
                    )}

                    <Content
                      label={item.mainLabel}
                      labelClassName={item.mainLabelClassName}
                      description={item.mainDescription}
                      descriptionClassName={item.mainDescriptionClassName}
                      align={orientation === "HORIZONTAL" ? "LEFT" : "CENTER"}
                      disabled={item.disabled}
                      data-testid={`${
                        item["data-testid"] ?? "super-radio-item"
                      }-main`}
                    />
                  </div>
                  <Content
                    label={item.minorLabel}
                    labelClassName={item.minorLabelClassName}
                    description={item.minorDescription}
                    descriptionClassName={item.minorDescriptionClassName}
                    align={orientation === "HORIZONTAL" ? "RIGHT" : "CENTER"}
                    disabled={item.disabled}
                    data-testid={`${
                      item["data-testid"] ?? "super-radio-item"
                    }-minor`}
                  />
                </div>
              );
            }}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    );
  }
);

export default SuperRadio;
