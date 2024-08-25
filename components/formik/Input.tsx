'use client'

import { FC, useEffect, useId, useState } from 'react'
import { Input as UIInput, InputProps } from '../ui/input'
import { Label } from '../ui/label'
import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'

export type FormikInputProps = {
  name: string
  label?: string
  type?: string
  placeholder?: string
  groupClassName?: string
  labelClassName?: string
  fieldClassName?: string
  className?: string
  handleChange?: (value: any) => void
} & InputProps

export const Input: FC<FormikInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  groupClassName,
  labelClassName,
  fieldClassName,
  className,
  handleChange,
  ...restProps
}) => {
  const id = useId()
  const [field, meta] = useField(name)
  const [computedValue, setComputedValue] = useState()

  const { onChange, value, ...restFieldProps } = field

  useEffect(() => {
    let computedValue = value

    if (type === 'number' && Number.isNaN(value) && !Number.isFinite(computedValue)) {
      computedValue = undefined
    }

    setComputedValue(computedValue)
  }, [name, type, value])

  return (
    <div className={clsx('mb-2', groupClassName)}>
      {label && (
        <Label htmlFor={id} className={clsx('block mb-2', labelClassName)}>
          {label}
        </Label>
      )}
      <div className={className}>
        <UIInput
          id={id}
          type={type}
          placeholder={placeholder}
          className={clsx(fieldClassName, {
            'border-red-500': meta.touched && meta.error
          })}
          value={computedValue}
          onChange={(e) => {
            if (e.target.value === field.value) return
            onChange(e)
            if (typeof handleChange === 'function') handleChange(e.target.value)
          }}
          {...restFieldProps}
          {...restProps}
        />

        <ErrorMessage name={name} component="div" className="text-red-500" />
      </div>
    </div>
  )
}
