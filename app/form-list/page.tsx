import Container from "@/components/Container";
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FormListTable } from "./components/FormListTable";

export default async function FormList() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('user id :', user?.id)

  if (!user) {
    return redirect("/login");
  }

  const fetchSalesInformationByUser = async (userId: string) => {
    const { data, error } = await supabase.rpc(
      "get_sales_information_by_user",
      { user_id: userId }
    );

    if (error) {
      console.error("Error fetching sales information:", error);
      return null;
    }
    console.log('data of get_sales_information_by_user :', data)

    return data;
  };

  fetchSalesInformationByUser(user.id);


  //// API for fetching data for a single form based on id

  // async function getSalesInformation(lngSaleAnalysisID: string) {
  //   try {
  //     const { data, error } = await supabase
  //       .rpc('get_sales_information', { lngsaleanalysisid: lngSaleAnalysisID });
  
  //     if (error) {
  //       console.error('Error fetching sales information:', error.message);
  //       return null;
  //     }
  
  //     console.log('Sales Information:', data);
  //     return data;
  //   } catch (err) {
  //     console.error('Unexpected error:', err);
  //     return null;
  //   }
  // }
  

  return (
    <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl dark:text-black">
            Form List
          </span>
        </div>
        <Card className="p-3">
          <FormListTable />
        </Card>
      </div>
    </Container>
  );
}
