"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

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
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";

import {
  addNewExpenseFormSchema,
  type addNewExpenseFormType,
} from "@/lib/formSchema";
import type { DialogProps } from "@/type/component";
import { createExpense } from "@/lib/api/expenses";

export function AddNewExpenseDialog({ refetch }: DialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<
    z.input<typeof addNewExpenseFormSchema>,
    unknown,
    z.output<typeof addNewExpenseFormSchema>
  >({
    resolver: zodResolver(addNewExpenseFormSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: addNewExpenseFormType) =>
      createExpense({
        ...data,
        price: Number(data.price),
      }),
  });

  const onSubmit: SubmitHandler<addNewExpenseFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("هزینه ثبت شد", {
        description: "هزینه جدید با موفقیت ثبت شد.",
      });

      refetch?.();
      form.reset();
      setOpen(false);
    } catch {
      toast.error("خطا در ثبت هزینه", {
        description: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button size="lg">
            <Plus />
            ثبت هزینه جدید
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ثبت هزینه جدید</DialogTitle>
          <DialogDescription>
            اطلاعات هزینه را وارد کنید و روی ثبت هزینه جدید بزنید.
          </DialogDescription>
        </DialogHeader>

        <form action="#" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-4">
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>عنوان هزینه</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="عنوان هزینه را وارد کنید"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>مبلغ</FieldLabel>

                  <Input
                    {...field}
                    value={String(field.value ?? "")}
                    id={field.name}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    aria-invalid={fieldState.invalid}
                    placeholder="مبلغ را وارد کنید"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>توضیحات</FieldLabel>

                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="توضیحات هزینه را وارد کنید"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter className="mt-6">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={form.formState.isSubmitting}
                >
                  انصراف
                </Button>
              }
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Plus />
              )}
              ثبت هزینه جدید
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
