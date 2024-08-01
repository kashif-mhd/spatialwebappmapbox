'use client'

import clsx from 'clsx'
import { ErrorMessage, useField } from 'formik'
import { FC, useId } from 'react'
import { Label } from '../ui/label'
import { DatePicker as UIDatePicker, DatePickerProps } from '../DatePicker'

type Props = {
  name: string
  label?: string
  groupClassName?: string
  labelClassName?: string
  className?: string
} & DatePickerProps

export const DatePicker: FC<Props> = ({
  name,
  label,
  placeholder,
  groupClassName,
  labelClassName,
  className,
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
      <div>
        <UIDatePicker
          id={id}
          className={clsx(className, {
            'border-red-500': meta.touched && meta.error
          })}
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
