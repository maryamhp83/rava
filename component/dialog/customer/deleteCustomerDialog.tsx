"use client";

import { Button } from "@/component/ui/button";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/component/ui/dialog";
import { sleep } from "@/lib/util";
import { DeleteCustomerDialogProps } from "@/type/component";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteCustomerDialog({
  data,
}: DeleteCustomerDialogProps) {
  const [open, onOpenChange] = useState(false);

  const mutation = useMutation({
    mutationFn: () => sleep(3000),
    onSuccess: () => {
      toast.success("مشتری با موفقیت حذف شد", {
        description: `اطلاعات مشتری ${data.fullName} با موفقیت حذف شد.`,
      });

      onOpenChange(false);
    },
    onError: () => {
      toast.error("حذف مشتری ناموفق بود", {
        description:
          "متأسفانه هنگام حذف اطلاعات مشتری خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!mutation.isPending) {
          onOpenChange(open);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>حذف مشتری</DialogTitle>
          <DialogDescription>
            آیا از حذف مشتری{" "}
            <span className="font-semibold text-foreground">
              {data.fullName}
            </span>{" "}
            اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={
              <Button disabled={mutation.isPending} variant="outline">
                انصراف
              </Button>
            }
          />

          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleDelete}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
            حذف مشتری
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
