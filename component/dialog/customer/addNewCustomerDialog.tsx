import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/component/ui/dialog";
import { Button } from "@/component/ui/button";
import { Plus } from "lucide-react";

export default function AddNewCustomerDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="lg">
            <Plus />
            ثبت مشتری جدید
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ثبت مشتری</DialogTitle>
          <DialogDescription>
            اطلاعات زیر را با دقت تکمیل کنید.
          </DialogDescription>
        </DialogHeader>
        <form action="#" className="px-6">
          HI
        </form>
      </DialogContent>
    </Dialog>
  );
}
