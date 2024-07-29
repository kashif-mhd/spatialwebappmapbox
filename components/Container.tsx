import { ReactNode } from 'react'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
const Container =  ({ children }: { children: ReactNode })  => {
  return (
    <div className='bg-muted min-h-screen'>
      <Sidebar/>
      <div className='flex flex-col flex-1 transition-all duration-300 h-full lg:pl-[280px]'>
        <Topbar/>
      {children}
      </div>
      </div>
  )
}

export default Container 