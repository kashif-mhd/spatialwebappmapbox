import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import Container from '@/components/Container'
import DataForm from './components/DataForm'

export default async function DairyForm() {
  // const supabase = createClient()

  // const {
  //   data: { user }
  // } = await supabase.auth.getUser()

  // if (!user) {
  //   return redirect('/login')
  // }

  return (
    <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl">Dashboard</span>
        </div>

        <DataForm />
      </div>
    </Container>
  )
}
