
import Container from '@/components/Container'
import SearchMain from './components/SearchMain'


export default async function SalesSearch() {
 

  return (
    <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl">Sales Search</span>
        </div>
        <div className="pb-3">
          <SearchMain/>
        </div>
      </div>
    </Container>
  )
}
