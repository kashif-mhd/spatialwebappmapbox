 "use client"
import { DatePicker } from "@/components/DatePicker"
import { DateRangePicker } from "@/components/DateRangePicker"
import PropertyTypeDropdown from "@/components/PropertyTypeDropdown"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-dropdown-menu"
import { ScrollArea } from "@radix-ui/react-scroll-area"

import * as Slider from '@radix-ui/react-slider';
import React from "react"
import { SearchableTable } from "./SearchableTable"

const SearchMain = () => {
  const [sliderValues, setSliderValues] = React.useState([0, 19500000]);
  const [values, setValues] = React.useState([0, 19500000]);
  return (
    <div>
      <Tabs defaultValue="salessearch" className="w-full">
  <TabsList>
    <TabsTrigger value="salessearch">Sales Search</TabsTrigger>
    <TabsTrigger value="database">Database</TabsTrigger>
    <TabsTrigger value="map-view">Map View</TabsTrigger>
  </TabsList>
  <TabsContent value="salessearch">
    <div className="grid grid-cols-3 gap-6">
          <Card className="p-3">
        <h4 className="font-bold mb-3">Select Region</h4>
        <ScrollArea  className="max-h-[250px] overflow-y-auto grid gap-2">
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
        </ScrollArea>
         </Card>
             <Card className="p-3">
        <h4 className="font-bold mb-3">Select District</h4>
        <ScrollArea  className="max-h-[250px] overflow-y-auto grid gap-2">
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
        </ScrollArea>
         </Card>
             <Card className="p-3">
        <h4 className="font-bold mb-3">Select Suburb/Locality</h4>
        <ScrollArea  className="max-h-[250px] overflow-y-auto grid gap-2">
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
      <div className="flex items-center space-x-2">
      <Checkbox id="a1" />
      <label
        htmlFor="a1"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Auckland
      </label>
    </div>
        </ScrollArea>
         </Card>
        </div>

        <Card className=" p-3 my-4">
            <div className="grid grid-cols-3 gap-3 items-end">
              <div className="col-span-3">
                <Label className="mb-2">
                Select Date
                </Label>
              <DateRangePicker/>
              </div>
              
                  <div>
                <Label className="mb-2">
                Rateable Value
                </Label>
                  <Slider.Root
                    min={0}
                  max={1950000}
                  step={1000}
                  value={sliderValues}
                  onValueChange={(values) => setSliderValues(values)}
                  className="relative flex items-center select-none touch-none w-full h-5"
                >
                  <Slider.Track className="bg-gray-300 relative flex-1 rounded-full h-1">
                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                  </Slider.Track>
                       <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                  <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
             
                </Slider.Root>
                    <div className="flex justify-between mt-2 text-sm text-gray-700">
                  <span>{sliderValues[0].toLocaleString()}</span>
                  <span>{sliderValues[1].toLocaleString()}</span>
                </div>
              </div>   
              <div >
                <Label className="mb-2">
                Sale Price
                </Label>
               <Slider.Root
                    min={0}
                  max={1950000}
                  step={1000}
                  value={sliderValues}
                  onValueChange={(values) => setSliderValues(values)}
                  className="relative flex items-center select-none touch-none w-full h-5"
                >
                  <Slider.Track className="bg-gray-300 relative flex-1 rounded-full h-1">
                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                  </Slider.Track>
                       <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                  <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
             
                </Slider.Root>
                   <div className="flex justify-between mt-2 text-sm text-gray-700">
                  <span>{sliderValues[0].toLocaleString()}</span>
                  <span>{sliderValues[1].toLocaleString()}</span>
                </div>
              </div>
                  <div>
                <Label className="mb-2">
              Land Area
                </Label>
                  <Slider.Root
                    min={0}
                  max={1950000}
                  step={1000}
                  value={sliderValues}
                  onValueChange={(values) => setSliderValues(values)}
                  className="relative flex items-center select-none touch-none w-full h-5"
                >
                  <Slider.Track className="bg-gray-300 relative flex-1 rounded-full h-1">
                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                  </Slider.Track>
                       <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                  <Slider.Thumb className="block w-4 h-4 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
             
                </Slider.Root>
                    <div className="flex justify-between mt-2 text-sm text-gray-700">
                  <span>{sliderValues[0].toLocaleString()}</span>
                  <span>{sliderValues[1].toLocaleString()}</span>
                </div>
              </div>
                  <div>
                <Label className="mb-2">
                Property Type
                </Label>
                <PropertyTypeDropdown/>
              </div>
              <div>

                <Label className="mb-2">
                Flag
                </Label>
                <Input type="text" />
              </div>
              
              <div className=" text-end">
                <Button className="w-full ">Search</Button>
              </div>
            </div>
        </Card>
        <Card className="p-3">
          <SearchableTable/>
        </Card>
  </TabsContent>
  <TabsContent value="database">Change your password here.</TabsContent>
  <TabsContent value="map-view">Change your Map view here.</TabsContent>
</Tabs>
    </div>
  )
}

export default SearchMain