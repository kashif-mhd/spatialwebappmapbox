import { ColumnDef } from '@tanstack/react-table'

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

export type InclusiontData = {
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

export const inclusionData: InclusiontData[] = [
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
  { accessorKey: 'valuePerHa', header: 'Value (Ha)' },
  { accessorKey: 'totalValue', header: 'Total Value' },
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

export const inclusionColumns: ColumnDef<InclusiontData>[] = [
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
  distance: '',
  sale_date: '',
  rt: '',
  legal_des: '',
  use: '',
  relationship: '',
  total_area: '',
  roll: '',
  gcv: '',
  gcv_percentage: '',
  analysed_by: '',
  tenure: '',
  eff_area: '',
  assess: '',
  glv: '',
  glv_percentage: '',
  analyses_status: '',
  gross_sale_price: '',
  ineff_area: '',
  gv_date: '',
  gvi: '',
  gvi_percentage: '',
  date_analysed: '',
  inclusions: '',
  su: '',
  sp_ha: '',
  sp_su: '',
  sp_kgms: '',
  ps_flag: '',
  net_sale_price: '',
  su_eff_ha: '',
  lv_ha: '',
  lv_su: '',
  lv_kgms: '',
  sc_flag: '',
  dwelling_chattels: '',
  actual_kgms: '',
  sp_eff_ha: '',
  sp_eff_su: '',
  sp_eff_kgms: '',
  cw_flag: '',
  cw_number: '',
  farm_chattels: '',
  avg_eff_kgms: '',
  lv_eff_ha: '',
  lv_eff_su: '',
  lv_eff_kgms: '',
  rainfall: '',
  detailed_chattels: '',
  kgms_eff_ha: '',
  sp_ex_ha: '',
  sp_ex_su: '',
  sp_ex_kgms: '',
  altitude: '',
  land_value: '',
  kgms_su: '',
  lv_ex_ha: '',
  lv_ex_su: '',
  lv_ex_kgms: '',
  n_limit: '',
  improved_value: '',
  actual_ebitda: '',
  actual_cap_rate: '',
  avgeff_ebitda: '',
  avgeff_cap_rate: '',
  notes: '',
  sales_description: ''
}
