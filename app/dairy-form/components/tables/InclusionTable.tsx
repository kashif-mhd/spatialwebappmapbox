'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FieldsType, inclusionColumns } from '../formData'
import { TableFields } from './TableFields'
import { FormField } from './DrawerForm'
import { useFormikContext } from 'formik'

const formFields: FormField[] = [
  {
    label: 'Item',
    name: 'item',
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
    className: 'col-span-3'
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    groupClassName: 'grid gap-4'
  }
]

export const InclusionTable = () => {
  const formik = useFormikContext<FieldsType>()

  return (
    <Card>
      <CardHeader className="pb-2">
        <h4 className="font-semibold">Inclusion</h4>
      </CardHeader>
      <CardContent className="pt-0">
        <TableFields columns={inclusionColumns} data={formik.values.inclusions_data} formFields={formFields} />
      </CardContent>
    </Card>
  )
}

export default InclusionTable
