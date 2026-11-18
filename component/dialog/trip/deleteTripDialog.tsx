"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/component/ui/dialog";
import { Button } from "@/component/ui/button";
import type { DeleteTripDialogProps } from "@/type/component";
import { deleteTrip } from "@/lib/api/trips";

export function DeleteTripDialog({ data, refetch }: DeleteTripDialogProps) {
  const mutation = useMutation({
    mutationFn: () => deleteTrip(data.id),
  });

  const onDelete = async () => {
    try {
      await mutation.mutateAsync();

      toast.success("سفر حذف شد", {
        description: "اطلاعات سفر با موفقیت حذف شد.",
      });

      refetch?.();
    } catch {
      toast.error("خطا در حذف سفر", {
        description: "حذف سفر انجام نشد. دوباره تلاش کنید.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="icon" variant="destructive">
            <Trash2 />
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>حذف سفر</DialogTitle>
          <DialogDescription>
            آیا از حذف سفر مربوط به مسافر «{data.fullName}» مطمئن هستید؟ این
            عملیات قابل بازگشت نیست.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
              >
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
            حذف سفر
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
