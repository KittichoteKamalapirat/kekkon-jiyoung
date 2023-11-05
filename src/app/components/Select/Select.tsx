import React, { Fragment, ReactNode, useState } from 'react'

import clsx from 'clsx'

import { ReactComponent as ChevronDown } from '@/assets/svg/chevron-down.svg'
import { ReactComponent as ChevronRight } from '@/assets/svg/chevron-right.svg'
import { ReactComponent as ChevronUp } from '@/assets/svg/chevron-up.svg'

import { Listbox } from '../../../../../node_modules/@headlessui/react/dist/components/listbox/listbox'
import { Transition } from '../../../../../node_modules/@headlessui/react/dist/components/transitions/transition'
import { getClassName } from '../TextField/TextField'
import { Size } from '../token.interface'

export interface Option {
  value: string
  label: string
  id: string
  icon?: ReactNode
}

const emptyOption: Option = {
  value: '',
  label: 'Please select an option',
  id: '',
}
export interface SelectProps {
  name: string
  options: Option[]
  density: 'comfort' | 'condensed' // TODO: Implement
  value?: Option
  onChange: (e: any) => void
  size: Size
  label: string
  className?: string
}

const backgroundOptionClass =
  'hover:bg-interactive/[0.04] active:bg-interactive/[0.12] disabled:bg-primary/[0.04] active:bg-interactive/[0.08] focus:bg-interactive/[0.04]'
const borderOptionClass = 'focus:border-interactive focus:border rounded-[8px] p-4'

export const Select = (props: SelectProps) => {
  const { size, label, options, className, onChange, value, name } = props
  const {
    labelClassName,
    inputClassName,
    rightIconClassName,
    leftIconClassName,
    valueClassName,
    fontSizeClassName,
  } = getClassName({
    size,
    leftIcon: options[0]?.icon,
    isError: false,
    hideLabel: !label,
    align: 'left',
  })

  const [selected, setSelected] = useState(value)

  return (
    <Listbox
      value={selected?.value}
      onChange={(e) => {
        const option = options.find((option) => option.value === e) || emptyOption
        setSelected(option)
        onChange({ target: { value: e, name: name } })
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Button role="list" className={clsx('w-full', className)}>
            <div className={clsx('relative flex items-center', inputClassName)}>
              {selected?.icon ? <div className={leftIconClassName}>{selected.icon}</div> : null}
              <label className={valueClassName}>{selected?.label}</label>
              <label className={labelClassName}>{label}</label>
              {open ? (
                <ChevronUp className={clsx('h-6 w-6', 'ml-auto', rightIconClassName)} />
              ) : (
                <ChevronDown className={clsx('h-6 w-6', 'ml-auto', rightIconClassName)} />
              )}
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="w-full rounded-[8px] shadow-menu">
              {options.map((option, index) => (
                <Listbox.Option
                  key={option.id}
                  value={option.value} // This value will be set to react-hook-form when selected
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      active && 'bg-interactive/[0.08]',
                      backgroundOptionClass,
                      borderOptionClass,
                    )
                  }
                >
                  <div tabIndex={index} className={clsx('flex items-center')}>
                    {option?.icon ? <div className="mr-3 w-9 h-9">{option.icon}</div> : null}
                    <div className={fontSizeClassName}>{option.label}</div>
                    <ChevronRight className={clsx('h-6 w-6', 'ml-auto')} />
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  )
}

export default Select
