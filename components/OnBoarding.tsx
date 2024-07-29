import  { ReactNode } from 'react'

const OnBoarding = ({ children }: { children: ReactNode }) => {
  return (
       <div className='min-h-screen flex items-center relative flex-col bg-white'>
      <div className=" flex-1 flex w-full">

        <div className='w-full'>
       
          <div className="px-4 lg:pt-[100px] lg:pb-[40px] py-12 relative z-10 h-full flex flex-col ">
            <div className='flex-1 flex flex-col justify-center max-w-md mx-auto w-full '>
              <div className='flex-1 flex flex-col justify-center items-center py-8'>
                {children}
              </div>
            </div>
            <div className='flex justify-between text-base  w-full  max-w-md mx-auto '>
              <p className="text-[#9CA3AF]">All Rights Reserved</p>
              <p className="text-[#6B7280]">Copyrights © 2024 Spatial</p>
            </div>
          </div>
        </div>
      </div>
      {/* <img src="./images/bgBottom.png" alt="" className="absolute bottom-0 left-0 lg:max-w-max max-w-[250px]" /> */}
    </div>
  )
}

export default OnBoarding