import { createClient } from "../supabase/client";

const supabaseTest = createClient();

export async function fetchSlopeGeometry(){
  return await supabaseTest.from('bespokeslopesample').select('wkb_geometry')
  
}
export async function fetchLandcoverGeometry(){
  return await supabaseTest.from('bespokelandcoversample').select('wkb_geometry')
  
}