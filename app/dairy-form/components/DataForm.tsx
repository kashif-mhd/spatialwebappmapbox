'use client'

import { FC } from 'react'
import { Form, Formik, FormikHelpers, FormikValues } from 'formik'

import Fields from './Fields'
import { FieldsType, formInitialValues, formSchema } from './formData'

const DataForm: FC = () => {
  const handleSubmit = (values: FieldsType, actions: FormikHelpers<FieldsType>) => {
    console.log(values, actions)
  }

  return (
    <Formik initialValues={formInitialValues} validationSchema={formSchema} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Fields formik={formik} />
        </Form>
      )}
    </Formik>
  )
}

export default DataForm
