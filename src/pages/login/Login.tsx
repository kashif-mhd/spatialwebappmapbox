import React from 'react'
import OnBoarding from '../../component/OnBoarding'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
const Login = () => {
  return (
    <OnBoarding>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-center">
              <img src="./images/logo.svg" alt="" className='h-12 mb-8 inline-block'/>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              </div>
              <form className="space-y-3 md:space-y-4" action="#">
                  <div>
                       <Label htmlFor="email">Email</Label>
                      <Input type="email" placeholder="Email" />
                  </div>
                  <div>
                       <Label htmlFor="email">Password</Label>
                      <Input type="password" placeholder="Password" />    </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remember me
      </label>
    </div>
                      </div>
                      <Link to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <Button variant="destructive" className='w-full bg-primary'>Sign in</Button>
            
              </form>
          </div>
          </div>
    </OnBoarding>
  )
}

export default Login