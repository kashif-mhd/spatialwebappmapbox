'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FieldsType, inclusionColumns } from '../formData'
import { TableFields } from './TableFields'
import { FormField } from './DrawerForm'
import { FieldArray, useFormikContext } from 'formik'
import * as yup from 'yup'
import { useMemo } from 'react'

const formFields: FormField[] = [
  {
    label: 'Item',
    name: 'improvement',
    type: 'text',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'unit',
    name: 'unit',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Rate',
    name: 'rate',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Number',
    name: 'value',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3',
    readOnly: true
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    groupClassName: 'grid gap-4'
  }
]

const inclusionsDataSchema = yup.object().shape({
  improvement: yup.string().required('Item is required'),
  unit: yup.number().required('Unit is required'),
  rate: yup.number().required('Rate is required'),
  value: yup.number().required('Value is required'),
  description: yup.string().required('Description is required')
})

export const InclusionTable = () => {
  const formik = useFormikContext<FieldsType>()
  const footerData = useMemo(() => {
    const data = formik.values.improvements || []
    return {
      id: '',
      improvement: 'Total',
      unit: 0,
      ratePerUnit: 0,
      value: data.reduce((acc, row) => acc + row.value, 0),
      description: ''
    }
  }, [formik.values.improvements])

  return (
    <Card>
      <CardHeader className="pb-2">
        <h4 className="font-semibold">Inclusion</h4>
      </CardHeader>
      <CardContent className="pt-0">
        <FieldArray name="inclusions_data">
          {(arrayHelpers) => (
            <TableFields
              columns={inclusionColumns}
              data={formik.values.inclusions_data}
              formFields={formFields}
              formFieldsValidationSchema={inclusionsDataSchema}
              footerData={footerData}
              onAdd={(row) => {
                const calculatedRow = { ...row }
                calculatedRow.value = row.unit * row.ratePerUnit
                arrayHelpers.push(row)
              }}
              onEdit={(index, row) => {
                const calculatedRow = { ...row }
                calculatedRow.value = row.unit * row.ratePerUnit
                arrayHelpers.replace(index, row)
              }}
              onDelete={(index) => arrayHelpers.remove(index)}
            />
          )}
        </FieldArray>
      </CardContent>
    </Card>
  )
}

export default InclusionTable
