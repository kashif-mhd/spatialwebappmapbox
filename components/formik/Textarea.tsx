'use client'

import { FC, useId } from 'react'
import { Textarea as UITextarea, TextareaProps } from '../ui/textarea'
import { Label } from '../ui/label'
import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'

type Props = {
  name: string
  label?: string
  placeholder?: string
  groupClassName?: string
  labelClassName?: string
  className?: string
  handleChange?: (value: any) => void
} & TextareaProps

export const Input: FC<Props> = ({
  name,
  label,
  placeholder,
  groupClassName,
  labelClassName,
  className,
  handleChange,
  ...restProps
}) => {
  const id = useId()
  const [field, meta] = useField(name)

  const { onChange, ...restFieldProps } = field

  return (
    <div className={clsx('mb-2', groupClassName)}>
      {label && (
        <Label htmlFor={id} className={clsx('block mb-2', labelClassName)}>
          {label}
        </Label>
      )}
      <div>
        <UITextarea
          id={id}
          placeholder={placeholder}
          className={clsx(className, {
            'border-red-500': meta.touched && meta.error
          })}
          onChange={(e) => {
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
