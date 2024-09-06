import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

// export const createTestClient = () =>
//   createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL_TEST!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_TEST!,
//   );
