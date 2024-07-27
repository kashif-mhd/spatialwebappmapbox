
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Records</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="land" className="text-right">
              Land Class
            </Label>
            <Input id="land" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Area (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
              <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Value  (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              MS  (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Total MS
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              5U  (HA)
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Total 5I
            </Label>
            <Input id="area" value="" className="col-span-3" />
          </div>
             <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              InOff
            </Label>
            <div className="col-span-3">
              <Checkbox/>
            </div>
          </div>
              <div className="grid  gap-4">
            <Label htmlFor="area" >
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
