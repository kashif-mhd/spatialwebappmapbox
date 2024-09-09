'use client'

import { FC, useEffect, useState } from 'react'
import { Form, Formik, FormikHelpers, setIn } from 'formik'
import { useParams } from 'next/navigation'

import Fields from './Fields'
import {
  DetailChattelsData,
  FieldsType,
  formInitialValues,
  formSchema,
  ImprovementData,
  InclusionData,
  PastoralData
} from './formData'
import { ListValuersData, LocalityData } from '../page'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'

export type DataFormProps = {
  localityData: LocalityData[]
  listValuersData: ListValuersData[]
}

const DataForm: FC<DataFormProps> = ({ localityData, listValuersData }) => {
  const { id }: any = useParams()
  const { toast } = useToast()
  const [initialValues, setInitialValues] = useState<FieldsType>()

  const supabase = createClient()

  const handleSubmit = async (values: FieldsType, actions: FormikHelpers<FieldsType>) => {
    console.log(values, actions)
    // const updatedPayLoad = {
    //   organization_id: '542bcf59-4ac4-4bab-92d2-a8b9fee921e6',
    //   vendor: 'test',
    //   street_no: 123,
    //   address: 'test',
    //   locality: 'Chatham Island',
    //   property_name: 'test property',
    //   district: 'Rotorua District',
    //   region: 'Auckland Region',
    //   distance: '20',
    //   sale_date: '2024-08-21T00:00:00.000Z',
    //   rt: '',
    //   legal_des: '',
    //   use: '',
    //   relationship: 'test',
    //   total_area: 100,
    //   roll: 23,
    //   gcv: 20,
    //   gcv_percentage: -0.8,
    //   analysed_by: '6fbabcea-a091-4d1e-9d4e-bff68caca9b1',
    //   tenure: '',
    //   eff_area: 100,
    //   assess: 200,
    //   glv: '2000',
    //   glv_percentage: -0.96,
    //   analyses_status: '',
    //   gross_sale_price: 200,
    //   ineff_area: 0,
    //   gv_date: new Date('2024-08-21').toISOString(),
    //   gvi: -1980,
    //   gvi_percentage: -0.5050505050505051,
    //   date_analysed: new Date('2024-08-14').toISOString(),
    //   inclusions: 1000,
    //   su: 1000,
    //   sp_ha: -8,
    //   sp_su: -80,
    //   sp_kgms: -8,
    //   ps_flag: '20',
    //   net_sale_price: -800,
    //   su_eff_ha: 10,
    //   lv_ha: -19.2,
    //   lv_su: -1.92,
    //   lv_kgms: -19.2,
    //   sc_flag: 'test',
    //   dwelling_chattels: '20',
    //   actual_kgms: 40,
    //   sp_eff_ha: 5010.4,
    //   sp_eff_su: 501,
    //   sp_eff_kgms: 5010.4,
    //   cw_flag: '20',
    //   cw_number: 23,
    //   farm_chattels: 100,
    //   avg_eff_kgms: 100,
    //   lv_eff_ha: 5000.4,
    //   lv_eff_su: null,
    //   lv_eff_kgms: 5000.4,
    //   rainfall: '150',
    //   detailed_chattels: 0,
    //   kgms_eff_ha: 1,
    //   sp_ex_ha: null,
    //   sp_ex_su: 501,
    //   sp_ex_kgms: 5010,
    //   altitude: 16,
    //   land_value: -1920,
    //   kgms_su: 0.001,
    //   lv_ex_ha: 5000,
    //   lv_ex_su: 500,
    //   lv_ex_kgms: 5000,
    //   n_limit: 220,
    //   improved_value: 1000,
    //   actual_ebitda: 30,
    //   actual_cap_rate: 0,
    //   avgeff_ebitda: 10,
    //   avgeff_cap_rate: -0.0125,
    //   notes: 'test notes',
    //   sales_description: 'test sales description',
    //   site_no: 20,
    //   site_value: 30,
    //   site_total_value: 40,
    //   pastoral_land: [
    //     {
    //       id: '1',
    //       landClass: '014be8be-a211-4002-8833-5e0a66e67a6d',
    //       area: 100,
    //       valuePerHa: 5000,
    //       totalValue: 500000,
    //       msPerHa: 50,
    //       totalMs: 5000,
    //       suPerHa: 10,
    //       totalSu: 1000,
    //       description: 'Description A',
    //       inOff: false
    //     }
    //   ],
    //   improvements: [
    //     {
    //       id: '1',
    //       improvement: '01abc685-8b51-4d86-b7b1-6d73c143eaf4',
    //       unit: 10,
    //       ratePerUnit: 100,
    //       value: 1000,
    //       condition: '0c957478-6cf9-44ee-a262-8c33cf81db1c',
    //       description: 'Wooden fence around property'
    //     }
    //   ],
    //   inclusions_data: [
    //     {
    //       id: '1',
    //       improvement: 'Fence',
    //       unit: 10,
    //       ratePerUnit: 100,
    //       value: 1000,
    //       description: 'Wooden fence around property'
    //     }
    //   ],
    //   detail_chattels_data: [
    //     {
    //       description: 'test description',
    //       item: 'Wire',
    //       rate: 20,
    //       unit: 10,
    //       value: 200
    //     }
    //   ]
    // }
    try {
      const { data, error } = await supabase.rpc('insert_sales_information', {
        payload: values
      })

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Something went wrong'
        })
        actions.setSubmitting(false)
        return
      }

      toast({
        title: 'Success',
        description: 'Data inserted successfully'
      })
      actions.setSubmitting(false)
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err?.message || 'Something went wrong'
      })
      actions.setSubmitting(false)
    }
  }

  async function getSalesInformation(id: string) {
    try {
      const { data, error } = await supabase.rpc('get_sales_information', {
        input_lngsaleanalysisid: id
      })
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message
        })
        return
      }

      const pastoral_land: PastoralData[] = data.pastoral_land_analysis.map((item: any) => {
        const data: PastoralData = {
          id: item.id,
          inOff: item.streffectiveineffective,
          landClass: item.strpastorallandclasses,
          area: item.strlandclassarea,
          valuePerHa: item.lnglandclassvalue,
          totalValue: item.lnglandclassvalue * item.strlandclassarea,
          // todo: return from bane
          msPerHa: 0,
          // todo: msPerHa * area
          totalMs: 0,
          suPerHa: item.lnglandclasssuperha,
          totalSu: item.lnglandclasssuperha * item.strlandclassarea,
          description: item.strlandclassdescription
        }
        return data
      })

      const improvements: ImprovementData[] = data.improvement_analysis.map((item: any) => {
        const data: ImprovementData = {
          id: item.id,
          improvement: item.str_improvement_type,
          unit: item.lng_measurement_unit,
          ratePerUnit: item.lng_improvement_rate,
          value: item.lng_measurement_unit * item.lng_improvement_rate,
          condition: item.str_building_condition,
          description: item.lng_improvement_description
        }
        return data
      })

      const inclusions_data: InclusionData[] = data.inclusion_analysis.map((item: any) => {
        const data: InclusionData = {
          id: item.id,
          improvement: item.str_inclusion_type,
          unit: item.lng_inclusion_unit,
          ratePerUnit: item.lng_inclusion_rate,
          value: item.lng_inclusion_unit * item.lng_inclusion_rate,
          description: item.str_inclusion_description
        }
        return data
      })

      const detail_chattels_data: DetailChattelsData[] = data.detailed_chattels.map((item: any) => {
        const data: DetailChattelsData = {
          id: item.id,
          item: item.strinclusiontype,
          unit: item.lnginclusionunit,
          ratePerUnit: item.lnginclusionrate,
          value: item.lnginclusionunit * item.lnginclusionrate,
          description: item.strinclusiondescription
        }
        return data
      })

      const sales_information = data.sales_information

      const inclusions = inclusions_data.reduce((a, b) => a + b.value, 0)
      const net_sale_price = sales_information.lnggrosssaleprice - inclusions

      const gcv_percentage = net_sale_price / inclusions

      const ineff_area = pastoral_land.reduce((a, b) => (b.inOff ? a + b.area : a), 0)

      const eff_area = sales_information.lngtotalarea - ineff_area

      const improved_value = improvements.reduce((a, b) => a + b.value, 0)

      const land_value =
        net_sale_price -
        sales_information.lngdwellingchattels -
        sales_information.lngfarmchattels -
        sales_information.lngdetailedchattels -
        improved_value

      const glv_percentage = land_value / sales_information.lngglv

      const gvi_percentage = improved_value / sales_information.lnggvi

      const su_eff_ha = sales_information.lngstockunits / eff_area

      const sp_ha = net_sale_price / sales_information.lngtotalarea
      const sp_su = net_sale_price / su_eff_ha
      const sp_kgms = net_sale_price / sales_information.lngavgeffkgms

      const lv_ha = land_value / sales_information.lngtotalarea
      const lv_su = land_value / sales_information.lngstockunits
      const lv_kgms = land_value / sales_information.lngavgeffkgms

      // todo: site_no * formik.values.site_value
      const site_total_value = sales_information.site_no * sales_information.site_value

      const sp_eff_ha =
        pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) +
        improved_value +
        site_total_value +
        eff_area
      const sp_eff_su =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + improved_value + site_total_value) /
        sales_information.lngstockunits

      const sp_eff_kgms =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + improved_value + site_total_value) /
        sales_information.lngavgeffkgms

      const lv_eff_ha =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + site_total_value) / eff_area
      const lv_eff_su =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + site_total_value) /
        sales_information.lngstockunits
      const lv_eff_kgms =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + site_total_value) /
        sales_information.lngavgeffkgms

      const kgms_eff_ha = sales_information.lngavgeffkgms / eff_area

      const sp_ex_ha = (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + improved_value) / eff_area
      const sp_ex_su =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + improved_value) /
        sales_information.lngstockunits
      const sp_ex_kgms =
        (pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) + improved_value) /
        sales_information.lngavgeffkgms

      const kgms_su = kgms_eff_ha / sales_information.lngstockunits

      const lv_ex_ha = pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) / eff_area
      const lv_ex_su =
        pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) / sales_information.lngstockunits
      const lv_ex_kgms =
        pastoral_land.reduce((a, b) => (b.inOff ? a : a + b.totalValue), 0) / sales_information.lngavgeffkgms

      const avgeff_cap_rate = sales_information.lngavgeffebitda / net_sale_price

      const payload: FieldsType = {
        pastoral_land,
        improvements,
        inclusions_data,
        detail_chattels_data,
        vendor: sales_information.strvendorpurchaser,
        street_no: sales_information.strstreetnumber,
        address: sales_information.straddress,
        locality: sales_information.locality_id,
        property_name: sales_information.strpropertyname,
        district: sales_information.district_id,
        region: sales_information.region_id,
        distance: sales_information.strdistance,
        sale_date: sales_information.dtmsaledate,
        // todo: add in db
        rt: sales_information.rt,
        // todo: add in db
        legal_des: sales_information.legal_des,
        use: sales_information.strpropertyuse,
        relationship: sales_information.strrelationship,
        total_area: sales_information.lngtotalarea,
        roll: sales_information.strroll,
        gcv: sales_information.lnggcv,
        gcv_percentage: gcv_percentage,
        // todo: send id from BE
        analysed_by: sales_information.strvalueranalysed,
        tenure: sales_information.strtenure,
        eff_area: eff_area,
        assess: sales_information.strassessment,
        glv: sales_information.lngglv,
        glv_percentage: glv_percentage,
        analyses_status: sales_information.stranalysisstatus,
        gross_sale_price: sales_information.lnggrosssaleprice,
        ineff_area: ineff_area,
        gv_date: sales_information.dtmgvsdate,
        gvi: sales_information.lnggvi,
        gvi_percentage: gvi_percentage,
        date_analysed: sales_information.dtmdateanalysed,
        inclusions: inclusions,
        su: sales_information.lngstockunits,
        sp_ha: sp_ha,
        sp_su: sp_su,
        sp_kgms: sp_kgms,
        // todo: need confirmation
        ps_flag: sales_information.ps_flag,
        net_sale_price: net_sale_price,
        su_eff_ha: su_eff_ha,
        lv_ha: lv_ha,
        lv_su: lv_su,
        lv_kgms: lv_kgms,
        // todo: need confirmation
        sc_flag: sales_information.sc_flag,
        dwelling_chattels: sales_information.lngdwellingchattels,
        actual_kgms: sales_information.lngactualkgms,
        sp_eff_ha: sp_eff_ha,
        sp_eff_su: sp_eff_su,
        sp_eff_kgms: sp_eff_kgms,
        // todo: need confirmation
        cw_flag: sales_information.cw_flag,
        // todo: need confirmation
        cw_number: sales_information.cw_number,
        farm_chattels: sales_information.lngfarmchattels,
        avg_eff_kgms: sales_information.lngavgeffkgms,
        lv_eff_ha: lv_eff_ha,
        lv_eff_su: lv_eff_su,
        lv_eff_kgms: lv_eff_kgms,
        rainfall: sales_information.lngrainfall,
        // todo: send from BE
        detailed_chattels: sales_information.lngdetailedchattels,
        kgms_eff_ha: kgms_eff_ha,
        sp_ex_ha: sp_ex_ha,
        sp_ex_su: sp_ex_su,
        sp_ex_kgms: sp_ex_kgms,
        altitude: sales_information.lngaltitude,
        land_value: land_value,
        kgms_su: kgms_su,
        lv_ex_ha: lv_ex_ha,
        lv_ex_su: lv_ex_su,
        lv_ex_kgms: lv_ex_kgms,
        n_limit: sales_information.lngnlimit,
        improved_value: improved_value,
        actual_ebitda: sales_information.lngactualebitda,
        // todo: need confirmation as it is shown to be computed but now formula is provided
        actual_cap_rate: sales_information.actual_cap_rate,
        avgeff_ebitda: sales_information.lngavgeffebitda,
        avgeff_cap_rate: avgeff_cap_rate,
        notes: sales_information.strconfidentialnotes,
        sales_description: sales_information.strsaledescription,
        // todo: need confirmation
        site_no: sales_information.site_no,
        // todo: need confirmation
        site_value: sales_information.site_value,
        site_total_value: site_total_value
      }

      setInitialValues(payload)
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err?.message || 'Something went wrong'
      })
    }
  }

  useEffect(() => {
    // ? is this needed?
    async function fetchData() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      console.log({ user })
    }
    fetchData()

    if (id) {
      const ID = Array.isArray(id) ? id[0] : id
      getSalesInformation(ID)
    } else {
      setInitialValues(formInitialValues)
    }
  }, [])

  if (!initialValues) {
    return (
      <Card className="p-3">
        <CardContent>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-100 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-100" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Formik<FieldsType>
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {(formik) => (
        <Form>
          <Fields formik={formik} localityData={localityData} listValuersData={listValuersData} />
        </Form>
      )}
    </Formik>
  )
}

export default DataForm
