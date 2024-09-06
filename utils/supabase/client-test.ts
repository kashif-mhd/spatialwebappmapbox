import { createBrowserClient } from "@supabase/ssr";



export const createTest = () =>
createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL_TEST!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST!,
);
