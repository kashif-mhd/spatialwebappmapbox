'use client'

import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'
import { FC, useId } from 'react'
import { Label } from '../ui/label'
import { DatePicker as UIDatePicker, DatePickerProps } from '../DatePicker'

export type FormikDatePickerProps = {
  name: string
  label?: string
  groupClassName?: string
  labelClassName?: string
  fieldClassName?: string
  className?: string
  handleChange?: (value: string) => void
} & DatePickerProps

export const DatePicker: FC<FormikDatePickerProps> = ({
  name,
  label,
  placeholder,
  groupClassName,
  labelClassName,
  fieldClassName,
  className,
  handleChange,
  ...restProps
}) => {
  const id = useId()
  const [field, meta, helpers] = useField(name)

  return (
    <div className={clsx('mb-2', groupClassName)}>
      {label && (
        <Label htmlFor={id} className={clsx('block mb-2', labelClassName)}>
          {label}
        </Label>
      )}
      <div className={className}>
        <UIDatePicker
          id={id}
          className={clsx(fieldClassName, {
            'border-red-500': meta.touched && meta.error
          })}
          value={field.value}
          onChange={(value) => {
            if (value === field.value) return
            helpers.setValue(value)
            if (value && typeof handleChange === 'function') handleChange(value)
          }}
          onBlur={() => helpers.setTouched(true)}
          {...restProps}
        />

        <ErrorMessage name={name} component="div" className="text-red-500" />
      </div>
    </div>
  )
}
