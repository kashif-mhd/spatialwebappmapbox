'use client'

import { FC, useId } from 'react'
import { Checkbox as UICheckbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'

export type FormikCheckboxProps = {
  name: string
  label?: string
  groupClassName?: string
  labelClassName?: string
  fieldClassName?: string
  className?: string
  handleChange?: (value: any) => void
}

export const Checkbox: FC<FormikCheckboxProps> = ({
  name,
  label,
  groupClassName,
  labelClassName,
  fieldClassName,
  className,
  handleChange,
  ...restProps
}) => {
  const id = useId()
  const [field, meta, helpers] = useField(name)

  const { onChange, ...restFieldProps } = field
  return (
    <div className={clsx('mb-2', groupClassName)}>
      {label && (
        <Label htmlFor={id} className={clsx('block mb-2', labelClassName)}>
          {label}
        </Label>
      )}
      <div className={className}>
        <UICheckbox
          id={id}
          className={clsx(fieldClassName, {
            'border-red-500': meta.touched && meta.error
          })}
          onCheckedChange={(value) => {
            if (value === field.value) return
            helpers.setValue(value)
            if (handleChange) {
              handleChange(value)
            }
          }}
          {...restFieldProps}
          {...restProps}
        />

        {label && <ErrorMessage name={name} component="div" className="text-red-500" />}
      </div>
    </div>
  )
}
