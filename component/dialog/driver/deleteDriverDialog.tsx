"use client";

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
import { Button } from "@/component/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { DeleteDriverDialogProps } from "@/type/component";
import { useState } from "react";
import { toast } from "sonner";
import { deleteDriver } from "@/lib/api/drivers";

export default function DeleteDriverDialog({
  refetch,
  data,
}: DeleteDriverDialogProps) {
  const [open, onOpenChange] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteDriver(data.id),
  });

  const onDelete = async () => {
    try {
      await mutation.mutateAsync();

      toast.success("راننده با موفقیت حذف شد", {
        description: `اطلاعات راننده ${data.fullName} با موفقیت حذف شد.`,
      });

      refetch?.();
      onOpenChange(false);
    } catch {
      toast.error("حذف راننده ناموفق بود", {
        description:
          "متأسفانه هنگام حذف اطلاعات راننده خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      });
    }
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
          <Button size="icon" variant="outline">
            <Trash2 className="text-destructive" />
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>حذف راننده</DialogTitle>
          <DialogDescription>
            آیا از حذف راننده{" "}
            <span className="font-semibold text-foreground">
              {data.fullName}
            </span>{" "}
            اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <DialogClose
            render={
              <Button disabled={mutation.isPending} variant="outline">
                انصراف
              </Button>
            }
          />

          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 />
            )}
            حذف راننده
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
