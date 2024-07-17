import React from 'react'
import Menu from './Menu'

const Sidebar = () => {
  return (
    <div
        className={`max-w-full w-[280px] lg:pt-8 pt-4 fixed top-0 bottom-0 z-[999] h-full flex flex-col bg-primary `}
      >
        <div className='px-4 mb-8'>
          <img src="./images/logo.svg" alt="" className='h-12 brightness-0 invert-[1]'/>
        </div>
        <div className="flex-1">
            <Menu/>
        </div>
     
      </div>
  )
}

export default Sidebar