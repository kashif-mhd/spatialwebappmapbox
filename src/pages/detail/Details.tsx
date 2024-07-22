import React from 'react'
import { Combobox } from '../../components/Combobox'
import Container from '../../components/Container'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { DatePicker } from '../../components/DatePicker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { CstTable } from './table/CstTable'

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
]

const Details = () => {

  return (
    <Container>
      <div className='px-6'>
        <div className='py-3'>
          <span className='font-semibold text-xl'>Dashboard</span>
        </div>
        <div>
          <div className="grid gap-4">
            <Card className='p-3'>
              <div className="grid grid-cols-4 gap-3">
                <div >
                  <Label htmlFor="" className='block mb-2'>Vender/Purchaser</Label>
                  <div >
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Street No:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Address:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Property Name:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Distance:</Label>
                  <div >
                    <Input type="text" placeholder="" value={"17km N of Tokoroa "} disabled />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Sale Date:</Label>
                  <div >
                    <DatePicker />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>RT:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Use:</Label>
                  <div >
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className='p-3'>
              <div className="grid grid-cols-4 gap-3">
                <div >
                  <Label htmlFor="" className='block mb-2'>Relationship:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Total Area:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Roll:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>GCV:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
 <div >
                  <Label htmlFor="" className='block mb-2'>Analysed By:</Label>
                  <div >
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
           
              </div>
          
            </Card>
            <Card className='p-3'>
              
              <div className="grid grid-cols-3 gap-3">
                     <div >
                  <Label htmlFor="" className='block mb-2'>Tenure:</Label>
                  <div >
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>GLV:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Analyses Status:</Label>
                  <div >
                    <Combobox frameworks={frameworks} />
                  </div>
                </div>

              </div>
            </Card>
            <Card className='p-3'>
              
              <div className="grid grid-cols-4 gap-3 ">
                     <div >
                  <Label htmlFor="" className='block mb-2'>Gross Sale Price:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Ineff Area:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Date:</Label>
                  <div >
                    <DatePicker/>
                  </div>
                </div>
                  <div >
                  <Label htmlFor="" className='block mb-2'>Date Analysed:</Label>
                  <div >
                    <DatePicker/>
                  </div>
                </div>

              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
               <Card className='p-3'>
                <div className="grid grid-cols-2 gap-4">
                   <div >
                  <Label htmlFor="" className='block mb-2'>Gross Sale Price:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Ineff Area:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Date:</Label>
                  <div >
                    <DatePicker/>
                  </div>
                </div>
                  <div >
                  <Label htmlFor="" className='block mb-2'>Date Analysed:</Label>
                  <div >
                    <DatePicker/>
                  </div>
                </div>
                </div>
               </Card>
                <Card className='p-3'>
                <div className="grid grid-cols-2 gap-4">
                   <div >
                  <Label htmlFor="" className='block mb-2'>Gross Sale Price:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Ineff Area:</Label>
                  <div >
                    <Input type="text" placeholder="" />
                  </div>
                </div>
                <div >
                  <Label htmlFor="" className='block mb-2'>Date:</Label>
                  <div >
                    <DatePicker/>
                  </div>
                </div>
                  <div >
                  <Label htmlFor="" className='block mb-2'>Date Analysed:</Label>
                  <div >
                    <DatePicker/>
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
              <Card className='p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit voluptatum sapiente error sunt aut exercitationem enim similique, est cumque dolore voluptas sed iste autem a et soluta fugiat maxime odit?
              </Card>
              </TabsContent>
            <TabsContent value="password">
              <Card className='p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit voluptatum sapiente error sunt aut exercitationem enim similique, est cumque dolore voluptas sed iste autem a et soluta fugiat maxime odit?
              </Card>
            </TabsContent>
          </Tabs>
          <div className="grid grid-cols-2 gap-4">
             <Card>
                <CardHeader className='pb-2'>
                  <h4 className='font-semibold'>Pastoral Land</h4>
                </CardHeader>
                <CardContent className='pt-0'>
                  <CstTable/>
                </CardContent>
             </Card>
                <Card>
                <CardHeader className='pb-2'>
                  <h4 className='font-semibold'>Improvements</h4>
                </CardHeader>
                <CardContent className='pt-0'>
                  <CstTable/>
                </CardContent>
             </Card>
            
             </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Details