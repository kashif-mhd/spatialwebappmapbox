'use client'

import { FC, useId } from 'react'
import { Input as UIInput, InputProps } from '../ui/input'
import { Label } from '../ui/label'
import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'

type Props = {
  name: string
  label?: string
  type?: string
  placeholder?: string
  groupClassName?: string
  labelClassName?: string
  className?: string
} & InputProps

export const Input: FC<Props> = ({
  name,
  label,
  type = 'text',
  placeholder,
  groupClassName,
  labelClassName,
  className,
  ...restProps
}) => {
  const id = useId()
  const [field, meta] = useField(name)
  return (
    <div className={clsx('mb-2', groupClassName)}>
      {label && (
        <Label htmlFor={id} className={clsx('block mb-2', labelClassName)}>
          {label}
        </Label>
      )}
      <div>
        <UIInput
          id={id}
          type={type}
          placeholder={placeholder}
          className={clsx(className, {
            'border-red-500': meta.touched && meta.error
          })}
          {...field}
          {...restProps}
        />

        <ErrorMessage name={name} component="div" className="text-red-500" />
      </div>
    </div>
  )
}
