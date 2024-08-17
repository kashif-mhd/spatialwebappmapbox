'use client'

import { Combobox } from '@/components/Combobox'
import { DatePicker, Input, Select } from '@/components/formik'
import { Button } from '@/components/ui/button'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  email: '',
  password: '',
  gender: '',
  dob: ''
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
  gender: Yup.string().required().label('Gender'),
  dob: Yup.date().required().label('Date of Birth')
})

export default function FormPage() {
  const handleSubmit = (values: any) => {
    console.log(values)
  }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Input name="name" label="Name" type="text" placeholder="Name" groupClassName="mb-2" />

          <Input name="email" label="Email" type="email" placeholder="Email" groupClassName="mb-2" />

          <Input name="password" label="Password" type="password" placeholder="Password" groupClassName="mb-2" />

          <Select
            name="gender"
            label="Gender"
            placeholder="Gender"
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
            ]}
            groupClassName="mb-2"
          />

          <Combobox
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
            ]}
          />

          <DatePicker name="dob" label="Date of Birth" placeholder="Date of Birth" groupClassName="mb-2" />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
