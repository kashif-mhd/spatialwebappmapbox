'use client'

import { FC } from 'react'
import { Form, Formik, FormikHelpers, FormikValues } from 'formik'

import Fields from './Fields'
import { FieldsType, formInitialValues, formSchema } from './formData'
import { LocalityData } from '../page'

export type DataFormProps = {
  localityData: LocalityData[]
}

const DataForm: React.FC<DataFormProps> = ({localityData}: DataFormProps) => {

  const handleSubmit = (values: FieldsType, actions: FormikHelpers<FieldsType>) => {
    console.log(values, actions)
  }

  return (
    <Formik initialValues={formInitialValues} validationSchema={formSchema} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Fields formik={formik} localityData={localityData} />
        </Form>
      )}
    </Formik>
  )
}

export default DataForm
