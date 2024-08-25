import Container from '@/components/Container'
import { Card } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { FormListTable } from './components/FormListTable'
import { SalesBasedInformationData } from '../dairy-form/components/formData'

export default async function FormList() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  console.log('user id :', user?.id)

  if (!user) {
    return redirect('/login')
  }

    const { data:salesBasedInformationData, error } = await supabase.rpc('get_sales_information_by_user', { user_id: user.id })
    // const updatedSalesBasedInformationData = {
    //   ...salesBasedInformationData,
    //   saleDate: salesBasedInformationData.dtmsaledate ? new Date(salesBasedInformationData.dtmsaledate).toLocaleDateString : ''
    // }
    if (error) {
      console.error('Error fetching sales information:', error)
      return null
    }
    console.log('data of get_sales_information_by_user :', salesBasedInformationData)

  return (
    <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl dark:text-black">Form List</span>
        </div>
        <Card className="p-3">
          <FormListTable formListData={salesBasedInformationData}  />
        </Card>
      </div>
    </Container>
  )

}
