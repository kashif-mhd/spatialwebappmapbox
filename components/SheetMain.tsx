
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";

const SheetMain = ({ isSheetOpen, setIsSheetOpen }:any) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="customLabel">
        <SheetHeader>
          <SheetTitle>Add Records</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="land" className="text-right dark:text-black text-black">
              Land Class
            </Label>
            <Input id="land" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              Area (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
              <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              Value  (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              MS  (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              Total MS
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              5U  (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              Total 5I
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
             <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right dark:text-black text-black">
              InOff
            </Label>
            <div className="col-span-3">
              <Checkbox/>
            </div>
          </div>
              <div className="grid  gap-4">
            <Label htmlFor="area" className="dark:text-black text-black" >
             Description
            </Label>
            <Textarea  />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMain;
