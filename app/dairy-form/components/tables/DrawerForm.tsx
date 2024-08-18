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
import { Formik, FormikHelpers } from 'formik'

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
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
  fields: FormField[]
  fieldsInitialValue?: object
  fieldsValidationSchema: any
  onSubmit: (values: any) => void
}

const DrawerForm: FC<Props> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  fields,
  fieldsInitialValue = {},
  fieldsValidationSchema,
  onSubmit: onSubmit
}) => {
  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    onSubmit(values)
    setIsDrawerOpen(false)
    actions.resetForm()
  }

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <Formik
        initialValues={fieldsInitialValue}
        validationSchema={fieldsValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <SheetContent className="customLabel">
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
            </div>
            <SheetFooter>
              <Button type="button" onClick={() => formik.submitForm()}>
                Save changes
              </Button>
            </SheetFooter>
          </SheetContent>
        )}
      </Formik>
    </Sheet>
  )
}

export default DrawerForm
