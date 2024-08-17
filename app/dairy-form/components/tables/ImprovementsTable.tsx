'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FieldsType, improvementColumns } from '../formData'
import { TableFields } from './TableFields'
import { FormField } from './DrawerForm'
import { FieldArray, useFormikContext } from 'formik'
import * as yup from 'yup'
import { useMemo } from 'react'

const formFields: FormField[] = [
  {
    label: 'Improvement',
    name: 'improvement',
    type: 'text',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Unit',
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
    label: 'Value',
    name: 'value',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3',
    readOnly: true
  },
  {
    label: 'Condition',
    name: 'condition',
    type: 'select',
    options: [
      {
        label: 'Excellent',
        value: 'excellent'
      },
      {
        label: 'Good',
        value: 'good'
      },
      {
        label: 'Fair',
        value: 'fair'
      },
      {
        label: 'Poor',
        value: 'poor'
      }
    ],
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    groupClassName: 'grid gap-4'
  }
]

const improvementValidationSchema = yup.object().shape({
  improvement: yup.string().required().label('Improvement'),
  unit: yup.number().required().label('Unit'),
  rate: yup.number().required().label('Rate'),
  value: yup.number().required().label('Value'),
  condition: yup.string().required().label('Condition'),
  description: yup.string().required().label('Description')
})

export const ImprovementsTable = () => {
  const formik = useFormikContext<FieldsType>()
  const footerData = useMemo(() => {
    const data = formik.values.improvements || []
    return {
      id: '',
      improvement: 'Total',
      unit: 0,
      ratePerUnit: 0,
      value: data.reduce((acc, row) => acc + row.value, 0),
      condition: '',
      description: ''
    }
  }, [formik.values.improvements])

  return (
    <Card>
      <CardHeader className="pb-2">
        <h4 className="font-semibold">Improvements</h4>
      </CardHeader>
      <CardContent className="pt-0">
        <FieldArray name="improvements">
          {(arrayHelpers) => (
            <TableFields
              columns={improvementColumns}
              data={formik.values.improvements}
              formFields={formFields}
              formFieldsValidationSchema={improvementValidationSchema}
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

export default ImprovementsTable
