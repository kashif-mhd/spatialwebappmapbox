import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import Container from '@/components/Container'
import DataForm from './components/DataForm'

export type LocalityData = {
  id: string
  locality: string
  region: string
  district: string
}

export type ListValuersData = {
  id: string
  strvaluername: string
}

export default async function DairyForm() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: localityData, error } = await supabase.from('localities').select('*')

  if (error) {
    console.error('Error fetching locality data:', error)
    return <div>Error loading data</div>
  }

  const { data: listValuersData, error: listValuersError } = await supabase.from('list_valuers').select('*')

  if (listValuersError) {
    console.error('Error fetching list valuers data:', error)
    return <div>Error loading list valuers data</div>
  }

  return (
    <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl dark:text-black">Dashboard</span>
        </div>

        <DataForm localityData={localityData} listValuersData={listValuersData} />
      </div>
    </Container>
  )
}
