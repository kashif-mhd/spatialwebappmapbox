'use client'

import { FC, useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, isValid } from 'date-fns'

import { cn } from '../utils/tailwindmerge'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface DatePickerProps {
  id?: string
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string | undefined) => void
  onBlur?: () => void
}

export const DatePicker: FC<DatePickerProps> = ({
  id = '',
  className,
  placeholder = 'Select a date',
  value,
  onChange,
  onBlur
}) => {
  const [currentValue, setCurrentValue] = useState<Date | undefined>(
    value && isValid(new Date(value)) ? new Date(value) : undefined
  )

  const handleChange = (value: Date | undefined) => {
    setCurrentValue(value)
    if (typeof onChange === 'function') {
      const date = value ? value.toISOString() : undefined
      onChange(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={'outline'}
          className={cn('w-full pl-3 text-left font-normal', !currentValue && 'text-muted-foreground', className)}
          onClick={() => {
            if (typeof onBlur === 'function') {
              onBlur()
            }
          }}
        >
          {currentValue ? format(currentValue, 'PPP') : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={currentValue} onSelect={handleChange} />
      </PopoverContent>
    </Popover>
  )
}
