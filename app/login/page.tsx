import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import OnBoarding from "@/src/components/OnBoarding";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <OnBoarding>
      <div className="flex-1 flex flex-col px-8 sm:max-w-md justify-center gap-2 w-full">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-center">
            <img src="./images/logo.svg" alt="" className='h-12 mb-8 inline-block' />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
          </div>
          <form method="post" action={signIn} className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
            />

            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="terms"
                    className="text-sm flex items-center cursor-pointer gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Checkbox id="terms" />
                    Remember me
                  </label>
                </div>
              </div>
              <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
            </div>
            <Button type="submit" variant="destructive" className='w-full bg-primary'>Sign in</Button>
            <p>Don't have an account? <Link href="/signup" className='font-semibold text-primary'>Sign Up</Link></p>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </OnBoarding>
  );
}
