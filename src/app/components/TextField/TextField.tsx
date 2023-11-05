import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'

import { Size } from '../token.interface'
import './TextField.scss'

type Alignment = 'left' | 'center' | 'right'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  name?: string
  size?: Size
  iconSize?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isError?: boolean
  hideLabel?: boolean
  className?: string
  align?: Alignment
}

interface ClassNameProps {
  size: Size
  iconSize?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isError: boolean
  hideLabel: boolean
  align: Alignment
}

const borderSize: Record<Size, string> = {
  XXL: 'focus:ring-[3px]', // exception tokens
  XL: 'focus:ring-[3px]',
  LARGE: 'focus:ring-[3px]',
  MEDIUM: 'focus:ring-[3px]',
  SMALL: 'focus:ring-[3px]',
  XS: 'focus:ring-2',
}
const inputSizesWithoutLabel: Record<Size, string> = {
  XXL: 'px-[24px] py-[30px] text-heading2 leading-[36px]',
  XL: 'px-[24px] py-[26px] text-heading3',
  LARGE: 'px-[20px] py-[22px] text-lg',
  MEDIUM: 'px-[16px] py-[18px] text-md',
  SMALL: 'px-[16px] py-[14px] text-sm',
  XS: 'px-[8px] py-[14px] text-xs',
}

const fontSizes: Record<Size, string> = {
  XXL: 'base-headings-h2',
  XL: 'base-headings-h3',
  LARGE: 'base-text-large',
  MEDIUM: 'base-text-medium',
  SMALL: 'base-text-small',
  XS: 'base-text-xs',
}

const inputSizesWithLabelObj: Record<Size, string> = {
  XXL: 'px-[24px] pb-[20px] pt-[40px] focus:px-[22px] focus:pb-[20px] focus:pt-[40px] placeholder-shown:px-[24px] placeholder-shown:py-[30px] text-heading2 leading-[36px]',
  XL: 'px-[24px] pb-[16px] pt-[36px] focus:px-[22px] focus:pb-[16px] focus:pt-[36px] placeholder-shown:px-[24px] placeholder-shown:py-[26px] text-heading3',
  LARGE:
    'px-[20px] pb-[12px] pt-[32px] focus:px-[18px] focus:pb-[12px] focus:pt-[32px] placeholder-shown:px-[20px] placeholder-shown:py-[22px] text-lg leading-none',
  // TODO: modify this component by using flex
  // 'h-72px px-12 py-6 text-lg leading-none',
  MEDIUM:
    'px-[16px] pb-[8px] pt-[28px] focus:px-[14px] focus:pb-[8px] focus:pt-[28px] placeholder-shown:px-[16px] placeholder-shown:py-[18px] text-md', // Changed focus:px-[16px] to focus:px-[14]px] due to thick border when focus
  SMALL:
    'px-[16px] pb-[4px] pt-[24px] focus:px-[14px] focus:pb-[4px] focus:pt-[24px] placeholder-shown:px-[16px] placeholder-shown:py-[14px] text-sm',
  XS: 'px-[8px] pb-[6px] pt-[22px] focus:px-[7px] focus:pb-[6px] focus:pt-[22px] placeholder-shown:px-[8px] placeholder-shown:py-[14px] text-xs',
}

const labelSizes: Record<Size, string> = {
  XXL: 'text-sm top-[20px] left-[24px] peer-focus:text-sm peer-focus:top-[20px] peer-placeholder-shown:text-heading2 peer-placeholder-shown:top-[30px] leading-[36px]',
  XL: 'text-sm top-[16px] left-[24px] peer-focus:text-sm peer-focus:top-[16px] peer-placeholder-shown:text-heading3 peer-placeholder-shown:top-[21px]',
  LARGE:
    'text-sm top-[12px] left-[20px] peer-focus:text-sm peer-focus:top-[12px] peer-placeholder-shown:text-lg peer-placeholder-shown:top-[18px]',
  MEDIUM:
    'text-sm top-[8px] left-[16px] peer-focus:text-sm peer-focus:top-[8px] peer-placeholder-shown:text-md peer-placeholder-shown:top-[18px]',
  SMALL:
    'text-sm top-[4px] left-[16px] peer-focus:text-sm peer-focus:top-[4px] peer-placeholder-shown:text-sm peer-placeholder-shown:top-[14px]',
  XS: 'text-xs top-[6px] left-[8px] peer-focus:text-xs peer-focus:top-[6px] peer-placeholder-shown:text-xs peer-placeholder-shown:top-[14px]',
}
const leftIconSizes: Record<Size, string> = {
  XXL: 'left-[24px] w-[30px] h-[30px]',
  XL: 'left-[24px] w-[24px] h-[24px]',
  LARGE: 'left-[20px] w-[20px] h-[20px]',
  MEDIUM: 'left-[16px] w-[16px] h-[16px]',
  SMALL: 'left-[16px] w-[14px] h-[14px]',
  XS: 'left-[8px] w-[12px] h-[12px]',
}

const rightIconSizes: Record<Size, string> = {
  XXL: 'right-[24px] w-[30px] h-[30px]',
  XL: 'right-[24px] w-[24px] h-[24px]',
  LARGE: 'right-[20px] w-[20px] h-[20px]',
  MEDIUM: 'right-[16px] w-[16px] h-[16px]',
  SMALL: 'right-[16px] w-[14px] h-[14px]',
  XS: 'right-[8px] w-[12px] h-[12px]',
}

const secondRightIconSizes: Record<Size, string> = {
  XXL: 'right-[58px] w-[30px] h-[30px]',
  XL: 'right-[58px] w-[24px] h-[24px]',
  LARGE: 'right-[50px] w-[20px] h-[20px]',
  MEDIUM: 'right-[42px] w-[16px] h-[16px]',
  SMALL: 'right-[42px] w-[14px] h-[14px]',
  XS: 'right-[36px] w-[12px] h-[12px]',
}

const labelSizesWithLeftIcon: Record<Size, string> = {
  XXL: 'pl-[38px]',
  XL: 'pl-[32px]',
  LARGE: 'pl-[28px]',
  MEDIUM: 'pl-[24px]',
  SMALL: 'pl-[22px]',
  XS: 'pl-[20px]',
}

const labelSizesWithRightIcon: Record<Size, string> = {
  XXL: 'pr-[38px]',
  XL: 'pr-[32px]',
  LARGE: 'pr-[28px]',
  MEDIUM: 'pr-[24px]',
  SMALL: 'pr-[22px]',
  XS: 'pr-[20px]',
}

const inputClassNameObjWithLeftIcon: Record<Size, string> = {
  XXL: 'indent-[40px]',
  XL: 'indent-[32px]',
  LARGE: 'indent-[28px]',
  MEDIUM: 'indent-[24px]',
  SMALL: 'indent-[24px]',
  XS: 'indent-[22px]', // exceptional token
}

const inputClassNameObjWithRightIcon: Record<Size, string> = {
  XXL: 'pr-12',
  XL: 'pr-11',
  LARGE: 'pr-9',
  MEDIUM: 'pr-8', // 24px (icon size) + 8px (gap) = 32px (pr-[32px])
  SMALL: 'pr-7',
  XS: 'pr-[22px]', // exceptional token
}

const labelClassNameAlignment: Record<Alignment, Record<Size, string>> = {
  left: {
    XXL: 'left-[24px] right-auto',
    XL: 'left-[24px] right-auto',
    LARGE: 'left-[20px] right-auto',
    MEDIUM: 'left-[16px] right-auto',
    SMALL: 'left-[16px] right-auto',
    XS: 'left-[8px] right-auto',
  },
  center: {
    XXL: 'left-[calc(50%-8px)] right-auto',
    XL: 'left-[calc(50%-6px)] right-auto',
    LARGE: 'left-[calc(50%-5px)] right-auto',
    MEDIUM: 'left-[calc(50%-4px)] right-auto',
    SMALL: 'left-[calc(50%-4px)] right-auto',
    XS: 'left-[calc(50%-2px)] right-auto',
  },
  right: {
    XXL: 'right-[24px] left-auto',
    XL: 'right-[24px] left-auto',
    LARGE: 'right-[20px] left-auto',
    MEDIUM: 'right-[16px] left-auto',
    SMALL: 'right-[16px] left-auto',
    XS: 'right-[8px] left-auto',
  },
}

const inputClassAlignment: Record<Alignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

// TODO: Refactor to share utils
export const getClassName = ({
  size,
  iconSize = size,
  leftIcon,
  rightIcon,
  isError,
  hideLabel,
  align,
}: ClassNameProps) => {
  const sharedLabelClassName = clsx(
    'pointer-events-none',
    isError
      ? 'text-coral-500'
      : 'group-focus:text-blue group-active:text-blue peer-focus:text-blue-600',
    'absolute z-10 origin-[0] text-grey-500 transform duration-300',
    ['xl', 'xxl'].includes(size) ? 'font-semibold' : 'font-normal',
    hideLabel && 'peer-focus:hidden hidden peer-placeholder-shown:block',
  )
  const sharedInputClassName = clsx(
    isError ? 'ring-coral-500 focus:ring-coral-500' : 'ring-opacity-black-8 active:ring-blue',
    'border-none group bg-transparent peer block w-full placeholder-white focus:placeholder-grey-400 appearance-none rounded-lg ring-[2px] text-grey-900 focus:ring-blue focus:placeholder-grey-300 focus:outline-none',
  )

  const borderSizeClassName = borderSize[size]

  const sharedLeftIconClassName = 'absolute top-[50%] translate-y-[-50%]'
  const inputClassNameWithoutLabel = inputSizesWithoutLabel[size]
  const inputClassNameWithLabel = inputSizesWithLabelObj[size]
  const fontSizeClassName = fontSizes[size]

  const leftIconClassName = clsx(sharedLeftIconClassName, leftIconSizes[iconSize])
  const rightIconClassName = clsx(sharedLeftIconClassName, rightIconSizes[iconSize])
  const secondRightIconClassName = clsx(sharedLeftIconClassName, secondRightIconSizes[iconSize])
  const labelClassName = clsx(
    sharedLabelClassName,
    labelSizes[size],
    !!leftIcon && labelSizesWithLeftIcon[size],
    !!rightIcon && labelSizesWithRightIcon[size],
    labelClassNameAlignment[align][size],
  )
  const valueClassName = clsx(
    labelSizes[size],
    !!leftIcon && labelSizesWithLeftIcon[size],
    !!rightIcon && labelSizesWithRightIcon[size],
  )
  // TODO: input height and center contents
  const inputClassName = clsx(
    sharedInputClassName,
    borderSizeClassName,
    hideLabel ? inputClassNameWithoutLabel : inputClassNameWithLabel,
    !!leftIcon && inputClassNameObjWithLeftIcon[size],
    !!rightIcon && inputClassNameObjWithRightIcon[size],
    inputClassAlignment[align],
    'no-arrow',
  )
  return {
    labelClassName,
    valueClassName,
    inputClassName,
    leftIconClassName,
    rightIconClassName,
    secondRightIconClassName,
    // TODO: this field's used only for dropdown options, rename or move it to Select component
    fontSizeClassName,
  }
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    label,
    placeholder = ' ',
    leftIcon,
    rightIcon,
    size = 'MEDIUM',
    iconSize = size,
    isError = false,
    hideLabel = false,
    className,
    disabled,
    align = 'left',
    ...inputProps
  } = props
  const { labelClassName, inputClassName, leftIconClassName, rightIconClassName } = getClassName({
    leftIcon,
    rightIcon,
    size,
    iconSize,
    isError,
    hideLabel,
    align,
  })

  const inputLabel = `floating_label_input_${inputProps.name}`

  return (
    <div className={clsx('relative', className)}>
      <input
        type="text"
        id={inputLabel}
        placeholder={placeholder}
        className={clsx(
          inputClassName,
          disabled && 'opacity-60' /* BREAK DESIGN TOKEN opacity-24 */,
        )}
        {...inputProps}
        ref={ref}
        disabled={disabled}
      />
      {!!leftIcon && (
        <div
          className={clsx(
            leftIconClassName,
            disabled && 'opacity-60' /* BREAK DESIGN TOKEN opacity-24 */,
          )}
        >
          {leftIcon}
        </div>
      )}
      <label
        htmlFor={inputLabel}
        className={clsx(
          labelClassName,
          disabled && 'opacity-60' /* BREAK DESIGN TOKEN opacity-24 */,
        )}
      >
        {label}
      </label>
      {!!rightIcon && (
        <div
          className={clsx(
            rightIconClassName,
            disabled && 'opacity-60' /* BREAK DESIGN SYSTEM opacity-24 */,
          )}
        >
          {rightIcon}
        </div>
      )}
    </div>
  )
})

export default TextField
