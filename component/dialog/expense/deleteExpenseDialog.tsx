"use client";

import { useState } from "react";
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

import { sleep } from "@/lib/util";
import type { DeleteExpenseDialogProps } from "@/type/component";

export function DeleteExpenseDialog({
  data,
  refetch,
}: DeleteExpenseDialogProps) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      await sleep(3000);
    },
  });

  const onDelete = async () => {
    try {
      await mutation.mutateAsync();

      toast.success("هزینه حذف شد", {
        description: `هزینه «${data.name}» با موفقیت حذف شد.`,
      });

      refetch?.();
      setOpen(false);
    } catch {
      toast.error("خطا در حذف هزینه", {
        description: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!mutation.isPending) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size="icon" variant="destructive">
            <Trash2 />
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>حذف هزینه</DialogTitle>
          <DialogDescription>
            آیا از حذف هزینه «{data.name}» مطمئن هستید؟ این عملیات قابل بازگشت
            نیست.
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
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
