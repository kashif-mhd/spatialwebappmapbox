import { ColumnDef } from '@tanstack/react-table'
import * as yup from 'yup'

export const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]

export type PastoralData = {
  id: string
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

export const pastoralData: PastoralData[] = [
  {
    id: '1',
    landClass: 'Class A',
    area: 100,
    valuePerHa: 5000,
    totalValue: 500000,
    msPerHa: 50,
    totalMs: 5000,
    suPerHa: 10,
    totalSu: 1000,
    description: 'Description A'
  },
  {
    id: '2',
    landClass: 'Class B',
    area: 200,
    valuePerHa: 6000,
    totalValue: 1200000,
    msPerHa: 60,
    totalMs: 12000,
    suPerHa: 20,
    totalSu: 4000,
    description: 'Description B'
  }
]

export const improvementData: ImprovementData[] = [
  {
    id: '1',
    improvement: 'Fence',
    unit: 10,
    ratePerUnit: 100,
    value: 1000,
    condition: 'Good',
    description: 'Wooden fence around property'
  },
  {
    id: '2',
    improvement: 'Barn',
    unit: 1,
    ratePerUnit: 5000,
    value: 5000,
    condition: 'Excellent',
    description: 'Large barn for storage'
  }
]

export const inclusionData: InclusionData[] = [
  {
    id: '1',
    improvement: 'Fence',
    unit: 10,
    ratePerUnit: 100,
    value: 1000,
    description: 'Wooden fence around property'
  },
  {
    id: '2',
    improvement: 'Barn',
    unit: 1,
    ratePerUnit: 5000,
    value: 5000,
    description: 'Large barn for storage'
  }
]

export const detailChattelsData: DetailChattelsData[] = [
  {
    id: '1',
    item: 'Furniture',
    unit: 5,
    ratePerUnit: 200,
    value: 1000,
    description: 'Living room furniture'
  },
  {
    id: '2',
    item: 'Appliances',
    unit: 3,
    ratePerUnit: 500,
    value: 1500,
    description: 'Kitchen appliances'
  }
]

export const pastoralColumns: ColumnDef<PastoralData>[] = [
  { accessorKey: 'landClass', header: 'Land Class' },
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
  { accessorKey: 'ratePerUnit', header: 'Rate /Unit' },
  { accessorKey: 'value', header: 'Value' },
  { accessorKey: 'condition', header: 'Cond' },
  { accessorKey: 'description', header: 'Description' }
]

export const inclusionColumns: ColumnDef<InclusionData>[] = [
  { accessorKey: 'improvement', header: 'Item' },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'ratePerUnit', header: 'Rate /Unit' },
  { accessorKey: 'value', header: 'Value' },
  { accessorKey: 'description', header: 'Description' }
]
export const detailChattelsColumns: ColumnDef<DetailChattelsData>[] = [
  { accessorKey: 'item', header: 'Item' },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'ratePerUnit', header: 'Rate /Unit' },
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
  pastoral_land: [],
  improvements: [],
  inclusions_data: [],
  detail_chattels_data: []
}

export type FieldsType = typeof formInitialValues

export const formSchema = yup.object().shape({
  vendor: yup.string().required().label('Vender/Purchaser'),
  street_no: yup.string().required().label('Street No'),
  address: yup.string().required().label('Address'),
  locality: yup.string().required().label('Locality'),
  property_name: yup.string().required().label('Property Name'),
  district: yup.string().required().label('District'),
  region: yup.string().required().label('Region'),
  distance: yup.string().required().label('Distance'),
  sale_date: yup.string().required().label('Sale Date'),
  rt: yup.string().required().label('RT'),
  legal_des: yup.string().required().label('Legal Des'),
  use: yup.string().required().label('Use'),
  relationship: yup.string().required().label('Relationship'),
  total_area: yup.string().required().label('Total Area'),
  roll: yup.string().required().label('Roll'),
  gcv: yup.string().required().label('GCV'),
  gcv_percentage: yup.string().required().label('GCV Percentage'),
  analysed_by: yup.string().required().label('Analysed By'),
  tenure: yup.string().required().label('Tenure'),
  eff_area: yup.string().required().label('Eff. Area'),
  assess: yup.string().required().label('Assess'),
  glv: yup.string().required().label('GLV'),
  glv_percentage: yup.string().required().label('GLV Percentage'),
  analyses_status: yup.string().required().label('Analyses Status'),
  gross_sale_price: yup.string().required().label('Gross Sale Price'),
  ineff_area: yup.string().required().label('Ineff Area'),
  gv_date: yup.string().required().label('GV Date'),
  gvi: yup.string().required().label('GVI'),
  gvi_percentage: yup.string().required().label('GVI Percentage'),
  date_analysed: yup.string().required().label('Date Analysed'),
  inclusions: yup.string().required().label('Inclusions'),
  su: yup.string().required().label('SU'),
  sp_ha: yup.string().required().label('Sp/Ha'),
  sp_su: yup.string().required().label('Sp/Su'),
  sp_kgms: yup.string().required().label('Sp/kgMS'),
  ps_flag: yup.string().required().label('PS Flag'),
  net_sale_price: yup.string().required().label('Net Sale Price'),
  su_eff_ha: yup.string().required().label('SU/Eff Ha'),
  lv_ha: yup.string().required().label('LV/Ha'),
  lv_su: yup.string().required().label('LV/Su'),
  lv_kgms: yup.string().required().label('LV/kgMS'),
  sc_flag: yup.string().required().label('SC Flag'),
  dwelling_chattels: yup.string().required().label('Dwelling Chattels'),
  actual_kgms: yup.string().required().label('Actual kgMs'),
  sp_eff_ha: yup.string().required().label('SP_Eff/Ha'),
  sp_eff_su: yup.string().required().label('SP_Eff/SU'),
  sp_eff_kgms: yup.string().required().label('SP_Eff/kgMS'),
  cw_flag: yup.string().required().label('CW Flag'),
  cw_number: yup.string().required().label('CW Number'),
  farm_chattels: yup.string().required().label('Farm Chattels'),
  avg_eff_kgms: yup.string().required().label('AvgEff. kgMS'),
  lv_eff_ha: yup.string().required().label('LV_Eff/Ha'),
  lv_eff_su: yup.string().required().label('LV_Eff/SU'),
  lv_eff_kgms: yup.string().required().label('LV_Eff/kgMS'),
  rainfall: yup.string().required().label('Rainfall'),
  detailed_chattels: yup.string().required().label('Detailed Chattels'),
  kgms_eff_ha: yup.string().required().label('kgMS/Eff Ha'),
  sp_ex_ha: yup.string().required().label('SP(ex.site)/Ha'),
  sp_ex_su: yup.string().required().label('SP(ex.site)/SU'),
  sp_ex_kgms: yup.string().required().label('SP(ex.site)/kgMS'),
  altitude: yup.string().required().label('Altitude'),
  land_value: yup.string().required().label('Land Value'),
  kgms_su: yup.string().required().label('kgMS/SU'),
  lv_ex_ha: yup.string().required().label('LV(ex.site)/Ha'),
  lv_ex_su: yup.string().required().label('LV(ex.site)/SU'),
  lv_ex_kgms: yup.string().required().label('LV(ex.site)/kgMS'),
  n_limit: yup.string().required().label('N Limit'),
  improved_value: yup.string().required().label('Improved Value'),
  actual_ebitda: yup.string().required().label('Actual EBITDA'),
  actual_cap_rate: yup.string().required().label('Actual Cap Rate'),
  avgeff_ebitda: yup.string().required().label('AvgEff. EBITDA'),
  avgeff_cap_rate: yup.string().required().label('AvgEff. Cap Rate'),
  notes: yup.string().required().label('Notes'),
  sales_description: yup.string().required().label('Sales Description')
})
