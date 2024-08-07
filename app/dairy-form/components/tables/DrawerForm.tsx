'use client'

import { FC } from 'react'
import { Button } from '@/components/ui/button'

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  DatePicker,
  FormikDatePickerProps,
  FormikInputProps,
  FormikSelectProps,
  FormikTextareaProps,
  Input,
  Select,
  Textarea
} from '@/components/formik'
import { Checkbox, FormikCheckboxProps } from '@/components/formik/Checkbox'

type InputField = {
  type: 'text' | 'number'
} & FormikInputProps

type DateField = {
  type: 'date'
} & FormikDatePickerProps

type TextareaField = {
  type: 'textarea'
} & FormikTextareaProps

type SelectField = {
  type: 'select'
} & FormikSelectProps

type CheckboxField = {
  type: 'checkbox'
} & FormikCheckboxProps

export type FormField = InputField | DateField | TextareaField | SelectField | CheckboxField

type Props = {
  isSheetOpen: boolean
  setIsSheetOpen: (value: boolean) => void
  fields: FormField[]
}

const DrawerForm: FC<Props> = ({ isSheetOpen, setIsSheetOpen, fields }) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Records</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field, index) => {
            switch (field.type) {
              case 'text':
              case 'number':
                return <Input {...field} key={index} />

              case 'date':
                return <DatePicker {...field} key={index} />

              case 'textarea':
                return <Textarea {...field} key={index} />

              case 'select':
                return <Select {...field} key={index} />

              case 'checkbox':
                return <Checkbox {...field} key={index} />

              default:
                break
            }
          })}

          {/* // <div className="grid grid-cols-4 items-center gap-4">
          //   <Label htmlFor="area" className="text-right">
          //     InOff
          //   </Label>
          //   <div className="col-span-3">
          //     <Checkbox />
          //   </div>
          // </div>
          // <div className="grid  gap-4">
          //   <Label htmlFor="area">Description</Label>
          //   <Textarea />
          // </div> */}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DrawerForm
