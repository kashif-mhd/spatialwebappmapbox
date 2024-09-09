import { createClient } from "../supabase/client";

const supabase = createClient();

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

export const saveToSalesTable = async (geojsondata: any) => {
  return supabase.from('sales_based_information').insert({spatialdatafield: geojsondata})
}