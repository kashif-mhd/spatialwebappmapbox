import Container from '@/components/Container'
import React from 'react'
import { FormListTable } from './components/FormListTable'
import { Card } from '@/components/ui/card'

const page = () => {
  return (
       <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl">Form List</span>
        </div>
        <Card className="p-3">
          <FormListTable/>
        </Card>
      </div>
    </Container>
  )
}

export default page