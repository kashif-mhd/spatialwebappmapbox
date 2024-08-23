"use client";

import { FC, useEffect } from "react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";

import Fields from "./Fields";
import { FieldsType, formInitialValues, formSchema } from "./formData";
import { ListValuersData, LocalityData } from "../page";
import { createClient } from "@/utils/supabase/client";

export type DataFormProps = {
  localityData: LocalityData[];
  listValuersData: ListValuersData[];
};

const DataForm: FC<DataFormProps> = ({
  localityData,
  listValuersData,
}: DataFormProps) => {
  const supabase = createClient();

  const handleSubmit = async (
    values: FieldsType,
    actions: FormikHelpers<FieldsType>
  ) => {
    console.log(values, actions);
    const updatedPayLoad = {
      organization_id: "542bcf59-4ac4-4bab-92d2-a8b9fee921e6",
      vendor: "test",
      street_no: 123,
      address: "test",
      locality: "Chatham Island",
      property_name: "test property",
      district: "Rotorua District",
      region: "Auckland Region",
      distance: "20",
      sale_date: "2024-08-21T00:00:00.000Z",
      rt: "",
      legal_des: "",
      use: "",
      relationship: "test",
      total_area: 100,
      roll: 23,
      gcv: 20,
      gcv_percentage: -0.8,
      analysed_by: "6fbabcea-a091-4d1e-9d4e-bff68caca9b1",
      tenure: "",
      eff_area: 100,
      assess: 200,
      glv: "2000",
      glv_percentage: -0.96,
      analyses_status: "",
      gross_sale_price: 200,
      ineff_area: 0,
      gv_date: new Date("2024-08-21").toISOString(),
      gvi: -1980,
      gvi_percentage: -0.5050505050505051,
      date_analysed: new Date("2024-08-14").toISOString(),
      inclusions: 1000,
      su: 1000,
      sp_ha: -8,
      sp_su: -80,
      sp_kgms: -8,
      ps_flag: "20",
      net_sale_price: -800,
      su_eff_ha: 10,
      lv_ha: -19.2,
      lv_su: -1.92,
      lv_kgms: -19.2,
      sc_flag: "test",
      dwelling_chattels: "20",
      actual_kgms: 40,
      sp_eff_ha: 5010.4,
      sp_eff_su: 501,
      sp_eff_kgms: 5010.4,
      cw_flag: "20",
      cw_number: 23,
      farm_chattels: 100,
      avg_eff_kgms: 100,
      lv_eff_ha: 5000.4,
      lv_eff_su: null,
      lv_eff_kgms: 5000.4,
      rainfall: "150",
      detailed_chattels: 0,
      kgms_eff_ha: 1,
      sp_ex_ha: null,
      sp_ex_su: 501,
      sp_ex_kgms: 5010,
      altitude: 16,
      land_value: -1920,
      kgms_su: 0.001,
      lv_ex_ha: 5000,
      lv_ex_su: 500,
      lv_ex_kgms: 5000,
      n_limit: 220,
      improved_value: 1000,
      actual_ebitda: 30,
      actual_cap_rate: 0,
      avgeff_ebitda: 10,
      avgeff_cap_rate: -0.0125,
      notes: "test notes",
      sales_description: "test sales description",
      site_no: 20,
      site_value: 30,
      site_total_value: 40,
      pastoral_land: [
        {
          id: "1",
          landClass: "014be8be-a211-4002-8833-5e0a66e67a6d",
          area: 100,
          valuePerHa: 5000,
          totalValue: 500000,
          msPerHa: 50,
          totalMs: 5000,
          suPerHa: 10,
          totalSu: 1000,
          description: "Description A",
          inOff: false,
        },
      ],
      improvements: [
        {
          id: "1",
          improvement: "01abc685-8b51-4d86-b7b1-6d73c143eaf4",
          unit: 10,
          ratePerUnit: 100,
          value: 1000,
          condition: "0c957478-6cf9-44ee-a262-8c33cf81db1c",
          description: "Wooden fence around property",
        },
      ],
      inclusions_data: [
        {
          id: "1",
          improvement: "Fence",
          unit: 10,
          ratePerUnit: 100,
          value: 1000,
          description: "Wooden fence around property",
        },
      ],
      detail_chattels_data: [
        {
          description: "test description",
          item: "Wire",
          rate: 20,
          unit: 10,
          value: 200,
        },
      ],
    };
    try {
      // Call the Supabase RPC function
      const { data, error } = await supabase.rpc("insert_sales_information", {
        payload: updatedPayLoad,
      });

      if (error) {
        console.error("Error inserting data:", error);
        actions.setSubmitting(false);
        // Optionally, handle the error (e.g., show a notification)
      } else {
        console.log("Data inserted successfully:", data);
        actions.setSubmitting(false);
        // Optionally, handle the success (e.g., redirect to another page)
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log({ user });
    }
    fetchData();
  }, []);
  return (
    <Formik<FieldsType>
      initialValues={formInitialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Fields
            formik={formik}
            localityData={localityData}
            listValuersData={listValuersData}
          />
        </Form>
      )}
    </Formik>
  );
};

export default DataForm;
