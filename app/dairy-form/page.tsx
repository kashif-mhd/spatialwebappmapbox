import { Combobox } from "@/components/Combobox";
import Container from "@/components/Container";
import { DatePicker } from "@/components/DatePicker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { ColumnDef } from "@tanstack/react-table";
import { redirect } from "next/navigation";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type PastoralData = {
  id: string;
  landClass: string;
  area: number;
  valuePerHa: number;
  totalValue: number;
  msPerHa: number;
  totalMs: number;
  suPerHa: number;
  totalSu: number;
  description: string;
};

type ImprovementData = {
  id: string;
  improvement: string;
  unit: number;
  ratePerUnit: number;
  value: number;
  condition: string;
  description: string;
};

type InclusiontData = {
  id: string;
  improvement: string;
  unit: number;
  ratePerUnit: number;
  value: number;
  description: string;
};
type DetailChattelsData = {
  id: string;
  item: string;
  unit: number;
  ratePerUnit: number;
  value: number;
  description: string;
};

const pastoralData: PastoralData[] = [
  {
    id: "1",
    landClass: "Class A",
    area: 100,
    valuePerHa: 5000,
    totalValue: 500000,
    msPerHa: 50,
    totalMs: 5000,
    suPerHa: 10,
    totalSu: 1000,
    description: "Description A",
  },
  {
    id: "2",
    landClass: "Class B",
    area: 200,
    valuePerHa: 6000,
    totalValue: 1200000,
    msPerHa: 60,
    totalMs: 12000,
    suPerHa: 20,
    totalSu: 4000,
    description: "Description B",
  },
];

const improvementData: ImprovementData[] = [
  {
    id: "1",
    improvement: "Fence",
    unit: 10,
    ratePerUnit: 100,
    value: 1000,
    condition: "Good",
    description: "Wooden fence around property",
  },
  {
    id: "2",
    improvement: "Barn",
    unit: 1,
    ratePerUnit: 5000,
    value: 5000,
    condition: "Excellent",
    description: "Large barn for storage",
  },
];

const inclusionData: InclusiontData[] = [
  {
    id: "1",
    improvement: "Fence",
    unit: 10,
    ratePerUnit: 100,
    value: 1000,
    description: "Wooden fence around property",
  },
  {
    id: "2",
    improvement: "Barn",
    unit: 1,
    ratePerUnit: 5000,
    value: 5000,
    description: "Large barn for storage",
  },
];

const detailChattelsData: DetailChattelsData[] = [
  {
    id: "1",
    item: "Furniture",
    unit: 5,
    ratePerUnit: 200,
    value: 1000,
    description: "Living room furniture",
  },
  {
    id: "2",
    item: "Appliances",
    unit: 3,
    ratePerUnit: 500,
    value: 1500,
    description: "Kitchen appliances",
  },
];

const pastoralColumns: ColumnDef<PastoralData>[] = [
  { accessorKey: "landClass", header: "Land Class" },
  { accessorKey: "area", header: "Area (Ha)" },
  { accessorKey: "valuePerHa", header: "Value (Ha)" },
  { accessorKey: "totalValue", header: "Total Value" },
  { accessorKey: "msPerHa", header: "MS/Ha" },
  { accessorKey: "totalMs", header: "Total MS" },
  { accessorKey: "suPerHa", header: "SU/Ha" },
  { accessorKey: "totalSu", header: "Total SU" },
  { accessorKey: "description", header: "Description" },
];
const improvementColumns: ColumnDef<ImprovementData>[] = [
  { accessorKey: "improvement", header: "Improvement" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "ratePerUnit", header: "Rate /Unit" },
  { accessorKey: "value", header: "Value" },
  { accessorKey: "condition", header: "Cond" },
  { accessorKey: "description", header: "Description" },
];

const inclusionColumns: ColumnDef<InclusiontData>[] = [
  { accessorKey: "improvement", header: "Item" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "ratePerUnit", header: "Rate /Unit" },
  { accessorKey: "value", header: "Value" },
  { accessorKey: "description", header: "Description" },
];
const detailChattelsColumns: ColumnDef<DetailChattelsData>[] = [
  { accessorKey: "item", header: "Item" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "ratePerUnit", header: "Rate /Unit" },
  { accessorKey: "value", header: "Value" },
  { accessorKey: "description", header: "Description" },
];

export default async function DairyForm() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <Container>
      <div className="px-6">
        <div className="py-3">
          <span className="font-semibold text-xl">Dashboard</span>
        </div>
        <div>
          <div className="grid gap-4">
            <Card className="p-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Vender/Purchaser
                  </Label>
                  <div>
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Street No:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Address:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Property Name:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Distance:
                  </Label>
                  <div>
                    <Input
                      type="text"
                      placeholder=""
                      value={"17km N of Tokoroa "}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Sale Date:
                  </Label>
                  <div>
                    <DatePicker />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    RT:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Use:
                  </Label>
                  <div>
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Relationship:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Total Area:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Roll:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    GCV:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Analysed By:
                  </Label>
                  <div>
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Tenure:
                  </Label>
                  <div>
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    GLV:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Analyses Status:
                  </Label>
                  <div>
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="grid grid-cols-4 gap-3 ">
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Gross Sale Price:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Ineff Area:
                  </Label>
                  <div>
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Date:
                  </Label>
                  <div>
                    <DatePicker />
                  </div>
                </div>
                <div>
                  <Label htmlFor="" className="block mb-2">
                    Date Analysed:
                  </Label>
                  <div>
                    <DatePicker />
                  </div>
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Gross Sale Price:
                    </Label>
                    <div>
                      <Input type="text" placeholder="" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Ineff Area:
                    </Label>
                    <div>
                      <Input type="text" placeholder="" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Date:
                    </Label>
                    <div>
                      <DatePicker />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Date Analysed:
                    </Label>
                    <div>
                      <DatePicker />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Gross Sale Price:
                    </Label>
                    <div>
                      <Input type="text" placeholder="" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Ineff Area:
                    </Label>
                    <div>
                      <Input type="text" placeholder="" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Date:
                    </Label>
                    <div>
                      <DatePicker />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="" className="block mb-2">
                      Date Analysed:
                    </Label>
                    <div>
                      <DatePicker />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Notes</TabsTrigger>
                <TabsTrigger value="password">Sales Description</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card className="p-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Velit voluptatum sapiente error sunt aut exercitationem enim
                  similique, est cumque dolore voluptas sed iste autem a et
                  soluta fugiat maxime odit?
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card className="p-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Velit voluptatum sapiente error sunt aut exercitationem enim
                  similique, est cumque dolore voluptas sed iste autem a et
                  soluta fugiat maxime odit?
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
                  <CstTable
                    data={improvementData}
                    columns={improvementColumns}
                  />
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
                  <CstTable
                    data={detailChattelsData}
                    columns={detailChattelsColumns}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
