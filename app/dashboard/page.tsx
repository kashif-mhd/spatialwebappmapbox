
import Container from '../../components/Container'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <Container>
      <div className='px-6'>
        <div className='py-3'>
          <span className='font-semibold text-xl dark:text-black'>Dashboard</span>
        </div>
        <div>
          <Card className="w-[350px]">
             <CardContent className='py-4'>
              <div className="flex flex-wrap gap-x-3">
            <Button > Dairy Form</Button>
            <Button variant="outline">Dairy Reports</Button>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
