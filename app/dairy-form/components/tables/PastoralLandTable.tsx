'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FC, useMemo } from 'react'
import { FieldsType, pastoralColumns } from '../formData'
import { TableFields } from './TableFields'
import { FormField } from './DrawerForm'
import { FieldArray, useFormikContext } from 'formik'
import * as yup from 'yup'

const formFields: FormField[] = [
  {
    type: 'text',
    label: 'Land Class',
    name: 'landClass',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Area (Ha)',
    name: 'area',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Value/Ha',
    name: 'valuePerHa',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Value',
    name: 'totalValue',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'MS/Ha',
    name: 'msPerHa',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Total MS',
    name: 'totalMs',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'SU/Ha',
    name: 'suPerHa',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Total SU',
    name: 'totalSu',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3',
    readOnly: true
  },
  {
    type: 'checkbox',
    label: 'In Off',
    name: 'inOff',
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

const pastoralLandValidationSchema = yup.object().shape({
  landClass: yup.string().required().label('Land Class'),
  area: yup.number().required().label('Area (Ha)'),
  valuePerHa: yup.number().required().label('Value/Ha'),
  totalValue: yup.number().required().label('Total Value'),
  msPerHa: yup.number().required().label('MS/Ha'),
  totalMs: yup.number().required().label('Total MS'),
  suPerHa: yup.number().required().label('SU/Ha'),
  totalSu: yup.number().required().label('Total SU'),
  inOff: yup.boolean().nullable().label('In Off'),
  description: yup.string().required().label('Description')
})

export const PastoralLandTable: FC = () => {
  const formik = useFormikContext<FieldsType>()
  const footerData = useMemo(() => {
    const data = formik.values.pastoral_land || []
    return {
      id: '',
      landClass: 'Total',
      area: data.reduce((acc, row) => acc + row.area, 0),
      valuePerHa: data.reduce((acc, row) => acc + row.valuePerHa, 0), // Replace with calculation if needed
      totalValue: data.reduce((acc, row) => acc + row.totalValue, 0),
      msPerHa: 0, // Replace with calculation if needed
      totalMs: data.reduce((acc, row) => acc + row.totalMs, 0),
      suPerHa: 0, // Replace with calculation if needed
      totalSu: data.reduce((acc, row) => acc + row.totalSu, 0),
      inOff: false,
      description: ''
    }
  }, [formik.values.pastoral_land])
  return (
    <Card>
      <CardHeader className="pb-2">
        <h4 className="font-semibold">Pastoral Land</h4>
      </CardHeader>
      <CardContent className="pt-0">
        <FieldArray name="pastoral_land">
          {(arrayHelpers) => (
            <TableFields
              columns={pastoralColumns}
              data={formik.values.pastoral_land}
              formFields={formFields}
              formFieldsValidationSchema={pastoralLandValidationSchema}
              footerData={footerData}
              onAdd={(row) => {
                const calculatedRow = { ...row }
                calculatedRow.totalSu = row.suPerHa * row.area
                arrayHelpers.push(calculatedRow)
              }}
              onEdit={(index, row) => {
                const calculatedRow = { ...row }
                calculatedRow.totalSu = row.suPerHa * row.area
                arrayHelpers.replace(index, row)
              }}
              onDelete={(index) => arrayHelpers.remove(index)}
              bulkAction={{
                label: 'Calculate',
                onClick: (rows) => {
                  const index = rows[0].index

                  const area =
                    formik.values.total_area -
                    formik.values.pastoral_land
                      .filter((value, index) => index !== index)
                      .reduce((acc, row) => acc + row.area, 0)
                  const valuePerHa = formik.values.pastoral_land[index].totalValue / area
                  const totalValue =
                    formik.values.land_value -
                    formik.values.site_total_value -
                    formik.values.pastoral_land
                      .filter((value, index) => index !== index)
                      .reduce((acc, row) => acc + row.totalValue, 0)

                  const totalMs =
                    formik.values.avg_eff_kgms -
                    formik.values.pastoral_land
                      .filter((value, index) => index !== index)
                      .reduce((acc, row) => acc + row.totalMs, 0)
                  const msPerHa = totalMs / valuePerHa

                  const totalSu =
                    formik.values.su -
                    formik.values.pastoral_land
                      .filter((value, index) => index !== index)
                      .reduce((acc, row) => acc + row.totalSu, 0)
                  const suPerHa = totalSu / valuePerHa

                  formik.setFieldValue(`pastoral_land[${index}].area`, area)
                  formik.setFieldValue(`pastoral_land[${index}].valuePerHa`, valuePerHa)
                  formik.setFieldValue(`pastoral_land[${index}].totalValue`, totalValue)
                  formik.setFieldValue(`pastoral_land[${index}].msPerHa`, msPerHa)
                  formik.setFieldValue(`pastoral_land[${index}].totalMs`, totalMs)
                  formik.setFieldValue(`pastoral_land[${index}].suPerHa`, suPerHa)
                  formik.setFieldValue(`pastoral_land[${index}].totalSu`, totalSu)
                }
              }}
            />
          )}
        </FieldArray>
      </CardContent>
    </Card>
  )
}

export default PastoralLandTable
