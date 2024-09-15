import { createClient } from "../supabase/client";

const supabase = createClient();
let user: any;


supabase.auth.getUser().then((data) => {
  console.log("User: ", data?.data?.user)
  user = data?.data?.user
})

export const fetchSlopeClasses = async () => {
  return await supabase.from('list_pastoral_land_classes').select()
  
}

export const fetchSlopeGeometry = async () => {
  return await supabase.from('bespokeslopesample').select('wkb_geometry')
  
}
export async function fetchLandcoverGeometry(){
  return await supabase.from('bespokelandcoversample').select('wkb_geometry')
  
}

export const fetchLandCoverAnalysis = async () => {
  return await supabase.rpc('land_cover_analysis_v15', {})
}

export const saveToSalesTable = async (data: any) => {
  return supabase.from('sales_based_information').insert(data)
}
export const fetchSalesInfo = async () => {
  return supabase.from('sales_based_information').select().eq('organization_id', user?.user_metadata?.organization_id)
}