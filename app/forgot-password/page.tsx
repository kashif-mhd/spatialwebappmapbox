import OnBoarding from "@/components/OnBoarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPassword() {

  return (
    <OnBoarding>
      <div className="flex-1 flex flex-col px-8 sm:max-w-md justify-center gap-2 w-full">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-center">
            <img src="./images/logo.svg" alt="" className="h-12 mb-8 inline-block" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <p>No worries, we'll send you reset instructions</p>
          </div>
          <form
            method="post"
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          >
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" placeholder="Email" required />

        
            <Button type="submit" variant="destructive" className="w-full bg-primary">
             Reset Password
            </Button>
                <p className="text-center">
              <Link href="/login" className="font-semibold text-primary">
                Back to login
              </Link>
            </p>
         
          </form>
        </div>
      </div>
    </OnBoarding>
  )
}
