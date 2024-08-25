'use client'

import * as React from 'react'
import { FC, useEffect, useState } from 'react'

import { cn } from '../utils/tailwindmerge'
import { Button } from './ui/button'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CommandList } from 'cmdk'

export interface ComboboxProps {
  options: { value: string; label: string }[]
  value?: string
  id?: string
  className?: string
  placeholder?: string
  searchPlaceholder?: string
  noResultsText?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

export const Combobox: FC<ComboboxProps> = ({
  options,
  value = '',
  id = '',
  className,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search options...',
  noResultsText = 'No option found',
  onChange,
  onBlur
}) => {
  const [open, setOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(currentValue)
    }
  }, [onChange, currentValue])

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (typeof onBlur === 'function') {
          onBlur()
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {currentValue ? options.find((framework) => framework.value === currentValue)?.label : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList className='max-h-[250px] overflow-y-auto'>
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandEmpty>{noResultsText}</CommandEmpty>
            <CommandGroup>
              {options?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(selectedValue) => {
                    setCurrentValue(selectedValue === currentValue ? '' : selectedValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn('ml-auto h-4 w-4', currentValue === framework.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
