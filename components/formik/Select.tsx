'use client'

import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'
import { FC, useId } from 'react'
import { Label } from '../ui/label'
import { Combobox, ComboboxProps } from '../Combobox'

type Props = {
  name: string
  label?: string
  groupClassName?: string
  labelClassName?: string
  className?: string
} & ComboboxProps

export const Select: FC<Props> = ({
  name,
  label,
  options,
  placeholder,
  groupClassName,
  labelClassName,
  className,
  ...restProps
}) => {
  console.log({ options })
  const id = useId()
  const [field, meta, helpers] = useField(name)
  return (
    <div className={clsx('mb-2', groupClassName)}>
      {label && (
        <Label htmlFor={id} className={clsx('block mb-2', labelClassName)}>
          {label}
        </Label>
      )}
      <div>
        <Combobox
          id={id}
          className={clsx(className, {
            'border-red-500': meta.touched && meta.error
          })}
          options={options ?? []}
          value={field.value}
          onChange={helpers.setValue}
          onBlur={() => helpers.setTouched(true)}
          {...restProps}
        />

        <ErrorMessage name={name} component="div" className="text-red-500" />
      </div>
    </div>
  )
}
