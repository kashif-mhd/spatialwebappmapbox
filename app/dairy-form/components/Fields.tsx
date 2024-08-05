'use client'

import { FC, useCallback, useEffect } from 'react'
import { FormikProps } from 'formik'

import { DatePicker, Input, Select } from '@/components/formik'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CstTable } from '@/components/ui/cst-table'

import {
  detailChattelsColumns,
  detailChattelsData,
  FieldsType,
  improvementColumns,
  improvementData,
  inclusionColumns,
  inclusionData,
  pastoralColumns,
  pastoralData
} from './formData'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const Fields: FC<{ formik: FormikProps<FieldsType> }> = ({ formik }) => {
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

  // useEffect(() => {
  //   todo: calculate ineff_area
  //   setComputedValue('ineff_area', )
  // }, [setComputedValue,]);

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

  // useEffect(() => {
  //   todo: calculate inclusions
  //   setComputedValue('inclusions', )
  // }, [setComputedValue,])

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

  // useEffect(() => {
  //   todo: calculate sp_eff_ha
  //   setComputedValue('sp_eff_ha', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate sp_eff_su
  //   setComputedValue('sp_eff_su', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate sp_eff_kgms
  //   setComputedValue('sp_eff_kgms', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate lv_eff_ha
  //   setComputedValue('lv_eff_ha', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate lv_eff_su
  //   setComputedValue('lv_eff_su', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate lv_eff_kgms
  //   setComputedValue('lv_eff_kgms', )
  // }, [setComputedValue,])

  useEffect(() => {
    setComputedValue('kgms_eff_ha', formik.values.avg_eff_kgms / formik.values.eff_area)
  }, [setComputedValue, formik.values.avg_eff_kgms, formik.values.eff_area])

  // useEffect(() => {
  //   todo: calculate sp_ex_ha
  //   setComputedValue('sp_ex_ha', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate sp_ex_su
  //   setComputedValue('sp_ex_su', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate sp_ex_kgms
  //   setComputedValue('sp_ex_kgms', )
  // }, [setComputedValue,])

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

  // useEffect(() => {
  //   todo: calculate lv_ex_ha
  //   formik.setFieldValue('lv_ex_ha', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate lv_ex_su
  //   formik.setFieldValue('lv_ex_su', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate lv_ex_kgms
  //   formik.setFieldValue('lv_ex_kgms', )
  // }, [setComputedValue,])

  // useEffect(() => {
  //   todo: calculate improved_value
  //   formik.setFieldValue('improved_value', )
  // }, [setComputedValue,])

  useEffect(() => {
    setComputedValue('avgeff_cap_rate', formik.values.avgeff_ebitda / formik.values.net_sale_price)
  }, [setComputedValue, formik.values.avgeff_ebitda, formik.values.net_sale_price])

  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>

      <Card className="p-3">
        <div className="grid grid-cols-4 gap-3">
          <Input name="vendor" label="Vender/Purchaser" placeholder="Enter Vendor/Purchaser" />

          <Input type="number" name="street_no" label="Street No" placeholder="Enter Street No" />

          <Input type="text" name="address" label="Address" placeholder="Enter Address" />

          <Select name="locality" label="Locality" options={[]} />

          <Input type="text" name="property_name" label="Property Name" placeholder="Enter Property Name" />

          <Select name="district" label="District" options={[]} />

          <Select name="region" label="Region" options={[]} />

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
          <Input type="number" name="roll" label="Roll" placeholder="Enter Roll" />

          <Input type="number" name="gcv" label="GCV" placeholder="Enter GCV" />
          <Input type="text" name="gcv_percentage" label="GCV Percentage" placeholder="GCV Percentage" readOnly />

          <Select name="analysed_by" label="Analysed By" options={[]} />
        </div>
      </Card>

      <Card className="p-3">
        <div className="grid grid-cols-3 gap-3">
          <Select name="tenure" label="Tenure" options={[]} />

          <Input type="number" name="eff_area" label="Eff. Area" placeholder="Enter Eff. Area" />

          <Input type="number" name="assess" label="Assess" placeholder="Enter Assess" />

          <Input type="text" name="glv" label="GLV" placeholder="Enter GLV" />
          <Input type="text" name="glv_percentage" label="GLV Percentage" placeholder="GLV Percentage" readOnly />

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

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <h4 className="font-semibold">Pastoral Land</h4>
          </CardHeader>
          <CardContent className="pt-0">
            <CstTable columns={pastoralColumns} data={pastoralData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <h4 className="font-semibold">Improvements</h4>
          </CardHeader>
          <CardContent className="pt-0">
            <CstTable data={improvementData} columns={improvementColumns} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <h4 className="font-semibold">Inclusion</h4>
          </CardHeader>
          <CardContent className="pt-0">
            <CstTable data={inclusionData} columns={inclusionColumns} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <h4 className="font-semibold">Detail Chattels</h4>
          </CardHeader>
          <CardContent className="pt-0">
            <CstTable data={detailChattelsData} columns={detailChattelsColumns} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Fields
