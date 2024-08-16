import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

const PropertyTypeDropdown = () => {
  const [openTrees, setOpenTrees] = useState<{ [key: string]: boolean }>({});

  const handleParentCheckboxChange = (parent: string) => {
    setOpenTrees((prev) => ({
      ...prev,
      [parent]: !prev[parent],
    }));
  };

  return (
    <Popover>
      <PopoverTrigger className="px-4 py-1.5  rounded-md border w-full text-left">
        Select Property Type
      </PopoverTrigger>
      <PopoverContent>
        <div className=" w-64">
          {/* Parent Checkbox 1 */}
          <div className="flex items-center space-x-2">
            <Checkbox id="residential" onCheckedChange={() => handleParentCheckboxChange("residential")} />
            <label htmlFor="residential" className="text-sm font-medium leading-none">Residential</label>
          </div>
          {/* Child Checkboxes under Parent 1 */}
          {openTrees["residential"] && (
            <div className="ml-4 my-2 grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="apartment" />
                <label htmlFor="apartment" className="text-sm font-medium leading-none">Apartment</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="villa" />
                <label htmlFor="villa" className="text-sm font-medium leading-none">Villa</label>
              </div>
            </div>
          )}

          {/* Parent Checkbox 2 */}
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="commercial" onCheckedChange={() => handleParentCheckboxChange("commercial")} />
            <label htmlFor="commercial" className="text-sm font-medium leading-none">Commercial</label>
          </div>
          {/* Child Checkboxes under Parent 2 */}
          {openTrees["commercial"] && (
            
            <div className="ml-4 my-2 grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="office" />
                <label htmlFor="office" className="text-sm font-medium leading-none">Office</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="retail" />
                <label htmlFor="retail" className="text-sm font-medium leading-none">Retail</label>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PropertyTypeDropdown;
