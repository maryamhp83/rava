"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Pen, Save } from "lucide-react";
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
import { Field, FieldError, FieldLabel } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import {
  addNewExpenseFormSchema,
  type addNewExpenseFormType,
} from "@/lib/formSchema";
import type { EditExpenseDialogProps } from "@/type/component";
import { editExpense } from "@/lib/api/expenses";

export function EditExpenseDialog({ data, refetch }: EditExpenseDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<addNewExpenseFormType>({
    resolver: zodResolver(addNewExpenseFormSchema),
    defaultValues: {
      name: data.name,
      price: data.price,
      description: data.description,
    },
  });

  const mutation = useMutation({
    mutationFn: (data2) =>
      editExpense(data.id, {
        ...data2,
        price: Number(data.price),
      }),
  });

  const onSubmit: SubmitHandler<addNewExpenseFormType> = async (values) => {
    try {
      await mutation.mutateAsync(values);

      toast.success("اطلاعات ویرایش شد", {
        description: "تغییرات هزینه با موفقیت ذخیره شدند.",
      });

      refetch?.();
      form.reset(values);
      setOpen(false);
    } catch {
      toast.error("خطا در ویرایش هزینه", {
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
          <Button size="icon" variant="outline">
            <Pen />
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ویرایش هزینه</DialogTitle>
          <DialogDescription>
            اطلاعات هزینه را ویرایش کنید و تغییرات را ذخیره کنید.
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
                <Save />
              )}
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
