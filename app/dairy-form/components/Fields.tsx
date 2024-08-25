'use client'

import { FC, useCallback, useEffect, useMemo } from 'react'
import { FormikProps } from 'formik'

import { DatePicker, Input, Select, Textarea } from '@/components/formik'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FieldsType } from './formData'
import { Button } from '@/components/ui/button'
import { DetailChattelsTable, ImprovementsTable, InclusionTable, PastoralLandTable } from './tables'
import { ListValuersData, LocalityData } from '../page'

type FieldsProps = {
  formik: FormikProps<FieldsType>
  localityData: LocalityData[]
  listValuersData: ListValuersData[]
}

const Fields: React.FC<FieldsProps> = ({ formik, localityData, listValuersData }) => {
  const localityArray = useMemo(() => {
    const uniqueLocalities = new Map()
    localityData.forEach((item) => {
      uniqueLocalities.set(item.locality, { label: item.locality, value: item.locality })
    })
    return Array.from(uniqueLocalities.values())
  }, [localityData])

  const districtArray = useMemo(() => {
    const uniqueLocalities = new Map()
    localityData.forEach((item) => {
      uniqueLocalities.set(item.district, { label: item.district, value: item.district })
    })
    return Array.from(uniqueLocalities.values())
  }, [localityData])

  const regionArray = useMemo(() => {
    const uniqueLocalities = new Map()
    localityData.forEach((item) => {
      uniqueLocalities.set(item.region, { label: item.region, value: item.region })
    })
    return Array.from(uniqueLocalities.values())
  }, [localityData])

  const listValuersArray = useMemo(() => {
    const uniqueListValuers = new Map()
    listValuersData.forEach((item) => {
      uniqueListValuers.set(item.id, { label: item.strvaluername, value: item.id })
    })
    return Array.from(uniqueListValuers.values())
  }, [listValuersData])

  const setComputedValue = useCallback(
    (fieldName: keyof FieldsType, value: number) => {
      if (Number.isNaN(value)) return
      formik.setFieldValue(fieldName, value)
    },
    [formik.setFieldValue]
  )

  useEffect(() => {
    setComputedValue('eff_area', formik.values.total_area - formik.values.ineff_area)
  }, [setComputedValue, formik.values.total_area, formik.values.ineff_area])

  useEffect(() => {
    setComputedValue(
      'ineff_area',
      formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a + b.area : a), 0)
    )
  }, [setComputedValue, formik.values.pastoral_land])

  useEffect(() => {
    setComputedValue('gcv_percentage', formik.values.net_sale_price / formik.values.inclusions)
  }, [setComputedValue, formik.values.net_sale_price, formik.values.inclusions])

  useEffect(() => {
    setComputedValue('glv_percentage', formik.values.land_value / formik.values.glv)
  }, [setComputedValue, formik.values.land_value, formik.values.glv])

  useEffect(() => {
    setComputedValue('gvi', formik.values.gcv - formik.values.glv)
  }, [setComputedValue, formik.values.gcv, formik.values.glv])

  useEffect(() => {
    setComputedValue('gvi_percentage', formik.values.improved_value / formik.values.gvi)
  }, [setComputedValue, formik.values.improved_value, formik.values.gvi])

  useEffect(() => {
    setComputedValue(
      'inclusions',
      formik.values.inclusions_data.reduce((a, b) => a + b.value, 0)
    )
  }, [setComputedValue, formik.values.inclusions_data])

  useEffect(() => {
    setComputedValue('sp_ha', formik.values.net_sale_price / formik.values.total_area)
  }, [setComputedValue, formik.values.net_sale_price, formik.values.total_area])

  useEffect(() => {
    setComputedValue('sp_su', formik.values.net_sale_price / formik.values.su_eff_ha)
  }, [setComputedValue, formik.values.net_sale_price, formik.values.su_eff_ha])

  useEffect(() => {
    setComputedValue('sp_kgms', formik.values.net_sale_price / formik.values.avg_eff_kgms)
  }, [setComputedValue, formik.values.net_sale_price, formik.values.avg_eff_kgms])

  useEffect(() => {
    setComputedValue('net_sale_price', formik.values.gross_sale_price - formik.values.inclusions)
  }, [setComputedValue, formik.values.gross_sale_price, formik.values.inclusions])

  useEffect(() => {
    setComputedValue('su_eff_ha', formik.values.su / formik.values.eff_area)
  }, [setComputedValue, formik.values.su, formik.values.eff_area])

  useEffect(() => {
    setComputedValue('lv_ha', formik.values.land_value / formik.values.total_area)
  }, [setComputedValue, formik.values.land_value, formik.values.total_area])

  useEffect(() => {
    setComputedValue('lv_su', formik.values.land_value / formik.values.su)
  }, [setComputedValue, formik.values.land_value, formik.values.su])

  useEffect(() => {
    setComputedValue('lv_kgms', formik.values.land_value / formik.values.avg_eff_kgms)
  }, [setComputedValue, formik.values.land_value, formik.values.avg_eff_kgms])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.improved_value
    value += formik.values.site_total_value
    value = value / formik.values.eff_area
    setComputedValue('sp_eff_ha', value)
  }, [
    setComputedValue,
    formik.values.pastoral_land,
    formik.values.improved_value,
    formik.values.site_total_value,
    formik.values.eff_area
  ])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.improved_value
    value += formik.values.site_total_value
    value = value / formik.values.su
    setComputedValue('sp_eff_su', value)
  }, [
    setComputedValue,
    formik.values.pastoral_land,
    formik.values.improved_value,
    formik.values.site_no,
    formik.values.su
  ])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.improved_value
    value += formik.values.site_total_value
    value = value / formik.values.avg_eff_kgms
    setComputedValue('sp_eff_kgms', value)
  }, [
    setComputedValue,
    formik.values.pastoral_land,
    formik.values.improved_value,
    formik.values.site_total_value,
    formik.values.avg_eff_kgms
  ])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.site_total_value
    value = value / formik.values.eff_area
    setComputedValue('lv_eff_ha', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.site_total_value, formik.values.eff_area])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.site_total_value
    value = value / formik.values.su
    setComputedValue('lv_eff_su', value)
  }, [setComputedValue])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.site_total_value
    value = value / formik.values.avg_eff_kgms
    setComputedValue('lv_eff_kgms', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.site_total_value, formik.values.avg_eff_kgms])

  useEffect(() => {
    setComputedValue('kgms_eff_ha', formik.values.avg_eff_kgms / formik.values.eff_area)
  }, [setComputedValue, formik.values.avg_eff_kgms, formik.values.eff_area])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.improved_value
    value = value / formik.values.eff_area
    setComputedValue('sp_ex_ha', value)
  }, [setComputedValue])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.improved_value
    value = value / formik.values.su
    setComputedValue('sp_ex_su', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.improved_value, formik.values.su])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value += formik.values.improved_value
    value = value / formik.values.avg_eff_kgms
    setComputedValue('sp_ex_kgms', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.improved_value, formik.values.avg_eff_kgms])

  useEffect(() => {
    setComputedValue(
      'land_value',
      formik.values.net_sale_price -
        formik.values.dwelling_chattels -
        formik.values.farm_chattels -
        formik.values.detailed_chattels -
        formik.values.improved_value
    )
  }, [
    setComputedValue,
    setComputedValue,
    formik.values.net_sale_price,
    formik.values.dwelling_chattels,
    formik.values.farm_chattels,
    formik.values.detailed_chattels,
    formik.values.improved_value
  ])

  useEffect(() => {
    setComputedValue('kgms_su', formik.values.kgms_eff_ha / formik.values.su)
  }, [setComputedValue, formik.values.kgms_eff_ha, formik.values.su])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value = value / formik.values.eff_area
    formik.setFieldValue('lv_ex_ha', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.eff_area])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value = value / formik.values.su
    formik.setFieldValue('lv_ex_su', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.su])

  useEffect(() => {
    let value = 0
    value += formik.values.pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0)
    value = value / formik.values.avg_eff_kgms
    formik.setFieldValue('lv_ex_kgms', value)
  }, [setComputedValue, formik.values.pastoral_land, formik.values.avg_eff_kgms])

  useEffect(() => {
    let value = formik.values.improvements.reduce((a, b) => a + b.value, 0)
    formik.setFieldValue('improved_value', value)
  }, [setComputedValue])

  useEffect(() => {
    setComputedValue('avgeff_cap_rate', formik.values.avgeff_ebitda / formik.values.net_sale_price)
  }, [setComputedValue, formik.values.avgeff_ebitda, formik.values.net_sale_price])

  useEffect(() => {
    setComputedValue('site_total_value', formik.values.site_no * formik.values.site_value)
  }, [setComputedValue, formik.values.site_no, formik.values.site_value])

  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          Submit
        </Button>
      </div>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <Input name="vendor" label="Vender/Purchaser" placeholder="Enter Vendor/Purchaser" />

          <Input type="number" name="street_no" label="Street No" placeholder="Enter Street No" />

          <Input type="text" name="address" label="Address" placeholder="Enter Address" />

          <Select name="locality" label="Locality" options={localityArray} />

          <Input type="text" name="property_name" label="Property Name" placeholder="Enter Property Name" />

          <Select name="district" label="District" options={districtArray} />

          <Select name="region" label="Region" options={regionArray} />

          <Input type="text" name="distance" label="Distance" placeholder="Enter Distance" />

          <DatePicker name="sale_date" label="Sale Date" placeholder="Enter Sale Date" />

          <Select name="rt" label="RT" options={[]} />

          <Select name="legal_des" label="Legal Des" options={[]} />

          <Select name="use" label="Use" options={[]} />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <Input type="text" name="relationship" label="Relationship" placeholder="Enter Relationship" />
          <Input type="number" name="total_area" label="Total Area" placeholder="Enter Total Area" />
          <Input type="string" name="roll" label="Roll" placeholder="Enter Roll" />

          <Input type="number" name="gcv" label="GCV" placeholder="Enter GCV" />
          <Input type="number" name="gcv_percentage" label="GCV Percentage" placeholder="GCV Percentage" readOnly />

          <Select name="analysed_by" label="Analysed By" options={listValuersArray} />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-3 gap-3">
          <Select name="tenure" label="Tenure" options={[]} />

          <Input type="number" name="eff_area" label="Eff. Area" placeholder="Enter Eff. Area" />

          <Input type="number" name="assess" label="Assess" placeholder="Enter Assess" />

          <Input type="number" name="glv" label="GLV" placeholder="Enter GLV" />
          <Input type="number" name="glv_percentage" label="GLV Percentage" placeholder="GLV Percentage" readOnly />

          <Select name="analyses_status" label="Analyses Status" options={[]} />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3 ">
          <Input type="number" name="gross_sale_price" label="Gross Sale Price" placeholder="Enter Gross Sale Price" />

          <Input type="text" name="ineff_area" label="Ineff Area" placeholder="Enter Ineff Area" readOnly />

          <DatePicker name="gv_date" label="GV Date" placeholder="Enter GV Date" />

          <Input type="number" name="gvi" label="GVI" placeholder="Enter GVI" readOnly />
          <Input type="text" name="gvi_percentage" label="GVI Percentage" placeholder="GVI Percentage" readOnly />

          <DatePicker name="date_analysed" label="Date Analysed" placeholder="Enter Date Analysed" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3 ">
          <Input type="text" name="inclusions" label="Inclusions" placeholder="Enter Inclusions" readOnly />

          <Input type="number" name="su" label="SU" placeholder="Enter SU" />

          <Input type="number" name="sp_ha" label="Sp/Ha" placeholder="Enter Sp/Ha" readOnly />

          <Input type="number" name="sp_su" label="Sp/Su" placeholder="Enter Sp/Su" readOnly />

          <Input type="number" name="sp_kgms" label="Sp/kgMS" placeholder="Enter Sp/kgMS" readOnly />

          <Input type="text" name="ps_flag" label="PS Flag" placeholder="Enter PS Flag" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3 ">
          <Input
            type="number"
            name="net_sale_price"
            label="Net Sale Price"
            placeholder="Enter Net Sale Price"
            readOnly
          />

          <Input type="number" name="su_eff_ha" label="SU/Eff Ha" placeholder="Enter SU/Eff Ha" readOnly />

          <Input type="number" name="lv_ha" label="LV/Ha" placeholder="Enter LV/Ha" readOnly />

          <Input type="number" name="lv_su" label="LV/Su" placeholder="Enter LV/Su" readOnly />

          <Input type="number" name="lv_kgms" label="LV/kgMS" placeholder="Enter LV/kgMS" readOnly />

          <Input type="text" name="sc_flag" label="SC Flag" placeholder="Enter SC Flag" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3 ">
          <Input type="text" name="dwelling_chattels" label="Dwelling Chattels" placeholder="Enter Dwelling Chattels" />

          <Input type="number" name="actual_kgms" label="Actual kgMs" placeholder="Enter Actual kgMs" />

          <Input type="number" name="sp_eff_ha" label="SP_Eff/Ha" placeholder="Enter SP_Eff/Ha" readOnly />

          <Input type="number" name="sp_eff_su" label="SP_Eff/SU" placeholder="Enter SP_Eff/SU" readOnly />

          <Input type="number" name="sp_eff_kgms" label="SP_Eff/kgMS" placeholder="Enter SP_Eff/kgMS" readOnly />

          <Input type="text" name="cw_flag" label="CW Flag" placeholder="Enter CW Flag" />
          <Input type="number" name="cw_number" label="CW Number" placeholder="Enter CW Number" />
        </div>
      </Card>
      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <Input type="number" name="farm_chattels" label="Farm Chattels" placeholder="Enter Farm Chattels" />

          <Input type="number" name="avg_eff_kgms" label="AvgEff. kgMS" placeholder="Enter AvgEff. kgMS" />

          <Input type="number" name="lv_eff_ha" label="LV_Eff/Ha" placeholder="Enter LV_Eff/Ha" readOnly />

          <Input type="number" name="lv_eff_su" label="LV_Eff/SU" placeholder="Enter LV_Eff/SU" readOnly />

          <Input type="number" name="lv_eff_kgms" label="LV_Eff/kgMS" placeholder="Enter LV_Eff/kgMS" readOnly />

          <Input type="text" name="rainfall" label="Rainfall" placeholder="Enter Rainfall" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <Input
            type="number"
            name="detailed_chattels"
            label="Detailed Chattels"
            placeholder="Enter Detailed Chattels"
            readOnly
          />

          <Input type="number" name="kgms_eff_ha" label="kgMS/Eff Ha" placeholder="Enter kgMS/Eff Ha" readOnly />

          <Input type="number" name="sp_ex_ha" label="SP(ex.site)/Ha" placeholder="Enter SP(ex.site)/Ha" readOnly />

          <Input type="number" name="sp_ex_su" label="SP(ex.site)/SU" placeholder="Enter SP(ex.site)/SU" readOnly />

          <Input
            type="number"
            name="sp_ex_kgms"
            label="SP(ex.site)/kgMS"
            placeholder="Enter SP(ex.site)/kgMS"
            readOnly
          />

          <Input type="number" name="altitude" label="Altitude" placeholder="Enter Altitude" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <Input type="number" name="land_value" label="Land Value" placeholder="Enter Land Value" readOnly />

          <Input type="number" name="kgms_su" label="kgMS/SU" placeholder="Enter kgMS/SU" readOnly />

          <Input type="number" name="lv_ex_ha" label="LV(ex.site)/Ha" placeholder="Enter LV(ex.site)/Ha" readOnly />

          <Input type="number" name="lv_ex_su" label="LV(ex.site)/SU" placeholder="Enter LV(ex.site)/SU" readOnly />

          <Input
            type="number"
            name="lv_ex_kgms"
            label="LV(ex.site)/kgMS"
            placeholder="Enter LV(ex.site)/kgMS"
            readOnly
          />

          <Input type="number" name="n_limit" label="N Limit" placeholder="Enter N Limit" />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3 ">
          <Input
            type="number"
            name="improved_value"
            label="Improved Value"
            placeholder="Enter Improved Value"
            readOnly
          />

          <Input type="number" name="actual_ebitda" label="Actual EBITDA" placeholder="Enter Actual Ebitda" />

          <Input
            type="number"
            name="actual_cap_rate"
            label="Actual Cap Rate"
            placeholder="Enter Actual Cap Rate"
            readOnly
          />

          <Input type="number" name="avgeff_ebitda" label="AvgEff. EBITDA" placeholder="Enter AvgEff. EBITDA" />

          <Input
            type="number"
            name="avgeff_cap_rate"
            label="AvgEff. Cap Rate"
            placeholder="Enter AvgEff. Cap Rate"
            readOnly
          />
        </div>
      </Card>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="sales_description">Sales Description</TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <Card>
            <Textarea name="notes" placeholder="Enter Notes" />
          </Card>
        </TabsContent>
        <TabsContent value="sales_description">
          <Card>
            <Textarea name="sales_description" placeholder="Enter Sales Description" />
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <h4 className="font-semibold">Site Value</h4>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Input type="number" name="site_no" placeholder="No" />
            <Input type="number" name="site_value" placeholder="Site Value" />
            <Input type="number" name="site_total_value" placeholder="Total Value" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <PastoralLandTable />

        <ImprovementsTable />

        <InclusionTable />

        <DetailChattelsTable />
      </div>
    </div>
  )
}

export default Fields
