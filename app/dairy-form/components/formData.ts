import { ColumnDef } from '@tanstack/react-table'
import * as yup from 'yup'

export type PastoralData = {
  id: string
  inOff: boolean
  landClass: string
  area: number
  valuePerHa: number
  totalValue: number
  msPerHa: number
  totalMs: number
  suPerHa: number
  totalSu: number
  description: string
}

export type ImprovementData = {
  id: string
  improvement: string
  unit: number
  ratePerUnit: number
  value: number
  condition: string
  description: string
}

export type InclusionData = {
  id: string
  improvement: string
  unit: number
  ratePerUnit: number
  value: number
  description: string
}

export type DetailChattelsData = {
  id: string
  item: string
  unit: number
  ratePerUnit: number
  value: number
  description: string
}

export const pastoralColumns: ColumnDef<PastoralData>[] = [
  { accessorKey: 'landClass', header: 'Land Class' },
  { accessorKey: 'inOff', header: 'In Off' },
  { accessorKey: 'area', header: 'Area (Ha)' },
  { accessorKey: 'valuePerHa', header: 'Value/Ha' },
  { accessorKey: 'totalValue', header: 'Value' },
  { accessorKey: 'msPerHa', header: 'MS/Ha' },
  { accessorKey: 'totalMs', header: 'Total MS' },
  { accessorKey: 'suPerHa', header: 'SU/Ha' },
  { accessorKey: 'totalSu', header: 'Total SU' },
  { accessorKey: 'description', header: 'Description' }
]

export const improvementColumns: ColumnDef<ImprovementData>[] = [
  { accessorKey: 'improvement', header: 'Improvement' },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'ratePerUnit', header: 'Rate' },
  { accessorKey: 'value', header: 'Value' },
  { accessorKey: 'condition', header: 'Cond' },
  { accessorKey: 'description', header: 'Description' }
]

export const inclusionColumns: ColumnDef<InclusionData>[] = [
  { accessorKey: 'improvement', header: 'Item' },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'ratePerUnit', header: 'Rate' },
  { accessorKey: 'value', header: 'Value' },
  { accessorKey: 'description', header: 'Description' }
]

export const detailChattelsColumns: ColumnDef<DetailChattelsData>[] = [
  { accessorKey: 'item', header: 'Item' },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'ratePerUnit', header: 'Rate' },
  { accessorKey: 'value', header: 'Value' },
  { accessorKey: 'description', header: 'Description' }
]

export const formInitialValues = {
  vendor: '',
  street_no: '',
  address: '',
  locality: '',
  property_name: '',
  district: '',
  region: '',
  distance: 0,
  sale_date: '',
  rt: '',
  legal_des: '',
  use: '',
  relationship: '',
  total_area: 0,
  roll: '',
  gcv: 0,
  gcv_percentage: 0,
  analysed_by: '',
  tenure: '',
  eff_area: 0,
  assess: '',
  glv: 0,
  glv_percentage: 0,
  analyses_status: '',
  gross_sale_price: 0,
  ineff_area: 0,
  gv_date: '',
  gvi: 0,
  gvi_percentage: 0,
  date_analysed: '',
  inclusions: 0,
  su: 0,
  sp_ha: 0,
  sp_su: 0,
  sp_kgms: 0,
  ps_flag: 0,
  net_sale_price: 0,
  su_eff_ha: 0,
  lv_ha: 0,
  lv_su: 0,
  lv_kgms: 0,
  sc_flag: '',
  dwelling_chattels: 0,
  actual_kgms: 0,
  sp_eff_ha: 0,
  sp_eff_su: 0,
  sp_eff_kgms: 0,
  cw_flag: '',
  cw_number: '',
  farm_chattels: 0,
  avg_eff_kgms: 0,
  lv_eff_ha: 0,
  lv_eff_su: 0,
  lv_eff_kgms: 0,
  rainfall: 0,
  detailed_chattels: 0,
  kgms_eff_ha: 0,
  sp_ex_ha: 0,
  sp_ex_su: 0,
  sp_ex_kgms: 0,
  altitude: 0,
  land_value: 0,
  kgms_su: 0,
  lv_ex_ha: 0,
  lv_ex_su: 0,
  lv_ex_kgms: 0,
  n_limit: 0,
  improved_value: 0,
  actual_ebitda: 0,
  actual_cap_rate: 0,
  avgeff_ebitda: 0,
  avgeff_cap_rate: 0,
  notes: '',
  sales_description: '',
  site_no: 0,
  site_value: 0,
  site_total_value: 0,
  pastoral_land: [],
  improvements: [],
  inclusions_data: [],
  detail_chattels_data: []
}

export type FieldsType = {
  vendor: string
  street_no: string
  address: string
  locality: string
  property_name: string
  district: string
  region: string
  distance: number
  sale_date: string
  rt: string
  legal_des: string
  use: string
  relationship: string
  total_area: number
  roll: string
  gcv: number
  gcv_percentage: number
  analysed_by: string
  tenure: string
  eff_area: number
  assess: string
  glv: number
  glv_percentage: number
  analyses_status: string
  gross_sale_price: number
  ineff_area: number
  gv_date: string
  gvi: number
  gvi_percentage: number
  date_analysed: string
  inclusions: number
  su: number
  sp_ha: number
  sp_su: number
  sp_kgms: number
  ps_flag: number
  net_sale_price: number
  su_eff_ha: number
  lv_ha: number
  lv_su: number
  lv_kgms: number
  sc_flag: string
  dwelling_chattels: number
  actual_kgms: number
  sp_eff_ha: number
  sp_eff_su: number
  sp_eff_kgms: number
  cw_flag: string
  cw_number: string
  farm_chattels: number
  avg_eff_kgms: number
  lv_eff_ha: number
  lv_eff_su: number
  lv_eff_kgms: number
  rainfall: number
  detailed_chattels: number
  kgms_eff_ha: number
  sp_ex_ha: number
  sp_ex_su: number
  sp_ex_kgms: number
  altitude: number
  land_value: number
  kgms_su: number
  lv_ex_ha: number
  lv_ex_su: number
  lv_ex_kgms: number
  n_limit: number
  improved_value: number
  actual_ebitda: number
  actual_cap_rate: number
  avgeff_ebitda: number
  avgeff_cap_rate: number
  notes: string
  sales_description: string
  site_no: number
  site_value: number
  site_total_value: number
  pastoral_land: PastoralData[]
  improvements: ImprovementData[]
  inclusions_data: InclusionData[]
  detail_chattels_data: DetailChattelsData[]
}

export const formSchema = yup.object().shape({
  vendor: yup.string().nullable().label('Vender/Purchaser'),
  street_no: yup.string().nullable().label('Street No'),
  address: yup.string().nullable().label('Address'),
  locality: yup.string().nullable().label('Locality'),
  property_name: yup.string().nullable().label('Property Name'),
  district: yup.string().nullable().label('District'),
  region: yup.string().nullable().label('Region'),
  distance: yup.string().nullable().label('Distance'),
  sale_date: yup.string().nullable().label('Sale Date'),
  rt: yup.string().label('RT'),
  legal_des: yup.string().label('Legal Des'),
  use: yup.string().label('Use'),
  relationship: yup.string().nullable().label('Relationship'),
  total_area: yup.string().nullable().label('Total Area'),
  roll: yup.string().nullable().label('Roll'),
  gcv: yup.string().nullable().label('GCV'),
  gcv_percentage: yup.string().nullable().label('GCV Percentage'),
  analysed_by: yup.string().nullable().label('Analysed By'),
  tenure: yup.string().label('Tenure'),
  eff_area: yup.string().nullable().label('Eff. Area'),
  assess: yup.string().nullable().label('Assess'),
  glv: yup.string().nullable().label('GLV'),
  glv_percentage: yup.string().nullable().label('GLV Percentage'),
  analyses_status: yup.string().label('Analyses Status'),
  gross_sale_price: yup.string().nullable().label('Gross Sale Price'),
  ineff_area: yup.string().nullable().label('Ineff Area'),
  gv_date: yup.string().nullable().label('GV Date'),
  gvi: yup.string().nullable().label('GVI'),
  gvi_percentage: yup.string().nullable().label('GVI Percentage'),
  date_analysed: yup.string().nullable().label('Date Analysed'),
  inclusions: yup.string().nullable().label('Inclusions'),
  su: yup.string().nullable().label('SU'),
  sp_ha: yup.string().nullable().label('Sp/Ha'),
  sp_su: yup.string().nullable().label('Sp/Su'),
  sp_kgms: yup.string().nullable().label('Sp/kgMS'),
  ps_flag: yup.string().nullable().label('PS Flag'),
  net_sale_price: yup.string().nullable().label('Net Sale Price'),
  su_eff_ha: yup.string().nullable().label('SU/Eff Ha'),
  lv_ha: yup.string().nullable().label('LV/Ha'),
  lv_su: yup.string().nullable().label('LV/Su'),
  lv_kgms: yup.string().nullable().label('LV/kgMS'),
  sc_flag: yup.string().nullable().label('SC Flag'),
  dwelling_chattels: yup.string().nullable().label('Dwelling Chattels'),
  actual_kgms: yup.string().nullable().label('Actual kgMs'),
  sp_eff_ha: yup.string().nullable().label('SP_Eff/Ha'),
  sp_eff_su: yup.string().nullable().label('SP_Eff/SU'),
  sp_eff_kgms: yup.string().nullable().label('SP_Eff/kgMS'),
  cw_flag: yup.string().nullable().label('CW Flag'),
  cw_number: yup.string().nullable().label('CW Number'),
  farm_chattels: yup.string().nullable().label('Farm Chattels'),
  avg_eff_kgms: yup.string().nullable().label('AvgEff. kgMS'),
  lv_eff_ha: yup.string().nullable().label('LV_Eff/Ha'),
  lv_eff_su: yup.string().nullable().label('LV_Eff/SU'),
  lv_eff_kgms: yup.string().nullable().label('LV_Eff/kgMS'),
  rainfall: yup.string().nullable().label('Rainfall'),
  detailed_chattels: yup.string().nullable().label('Detailed Chattels'),
  kgms_eff_ha: yup.string().nullable().label('kgMS/Eff Ha'),
  sp_ex_ha: yup.string().nullable().label('SP(ex.site)/Ha'),
  sp_ex_su: yup.string().nullable().label('SP(ex.site)/SU'),
  sp_ex_kgms: yup.string().nullable().label('SP(ex.site)/kgMS'),
  altitude: yup.string().nullable().label('Altitude'),
  land_value: yup.string().nullable().label('Land Value'),
  kgms_su: yup.string().nullable().label('kgMS/SU'),
  lv_ex_ha: yup.string().nullable().label('LV(ex.site)/Ha'),
  lv_ex_su: yup.string().nullable().label('LV(ex.site)/SU'),
  lv_ex_kgms: yup.string().nullable().label('LV(ex.site)/kgMS'),
  n_limit: yup.string().nullable().label('N Limit'),
  improved_value: yup.string().nullable().label('Improved Value'),
  actual_ebitda: yup.string().nullable().label('Actual EBITDA'),
  actual_cap_rate: yup.string().nullable().label('Actual Cap Rate'),
  avgeff_ebitda: yup.string().nullable().label('AvgEff. EBITDA'),
  avgeff_cap_rate: yup.string().nullable().label('AvgEff. Cap Rate'),
  notes: yup.string().nullable().label('Notes'),
  sales_description: yup.string().nullable().label('Sales Description')
})
