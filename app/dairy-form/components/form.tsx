'use client'

import { FC } from 'react'
import { Form, Formik, FormikHelpers, FormikValues } from 'formik'
import * as yup from 'yup'

import { DatePicker, Input, Select } from '@/components/formik'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CstTable } from '@/components/ui/cst-table'

import {
  detailChattelsColumns,
  detailChattelsData,
  formInitialValues,
  improvementColumns,
  improvementData,
  inclusionColumns,
  inclusionData,
  pastoralColumns,
  pastoralData
} from './formData'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const schema = yup.object().shape({
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

const DataForm: FC = () => {
  const handleSubmit = (values: FormikValues, actions: FormikHelpers<any>) => {
    console.log(values, actions)
  }

  return (
    <Formik initialValues={formInitialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {() => (
        <Form>
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
                <Input
                  type="number"
                  name="gross_sale_price"
                  label="Gross Sale Price"
                  placeholder="Enter Gross Sale Price"
                />

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
                <Input
                  type="text"
                  name="dwelling_chattels"
                  label="Dwelling Chattels"
                  placeholder="Enter Dwelling Chattels"
                />

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

                <Input
                  type="number"
                  name="sp_ex_ha"
                  label="SP(ex.site)/Ha"
                  placeholder="Enter SP(ex.site)/Ha"
                  readOnly
                />

                <Input
                  type="number"
                  name="sp_ex_su"
                  label="SP(ex.site)/SU"
                  placeholder="Enter SP(ex.site)/SU"
                  readOnly
                />

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

                <Input
                  type="number"
                  name="lv_ex_ha"
                  label="LV(ex.site)/Ha"
                  placeholder="Enter LV(ex.site)/Ha"
                  readOnly
                />

                <Input
                  type="number"
                  name="lv_ex_su"
                  label="LV(ex.site)/SU"
                  placeholder="Enter LV(ex.site)/SU"
                  readOnly
                />

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
        </Form>
      )}
    </Formik>
  )
}

export default DataForm
