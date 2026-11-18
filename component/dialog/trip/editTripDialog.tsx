"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";

import {
  addNewTripFormSchema,
  type addNewTripFormType,
} from "@/lib/formSchema";
import type { EditTripDialogProps } from "@/type/component";
import { editTrip } from "@/lib/api/trips";
import { useState } from "react";

export function EditTripDialog({ data, refetch }: EditTripDialogProps) {
  const [open, onOpenChange] = useState(false);
  const form = useForm<addNewTripFormType>({
    resolver: zodResolver(addNewTripFormSchema),
    defaultValues: {
      fullName: data.fullName,
      driverFullName: data.driverFullName,
      price: data.price.toString(),
      route: data.route,
      status: data.status,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data2: addNewTripFormType) =>
      editTrip(data.id, {
        ...data2,
        price: Number(data2.price),
      }),
  });

  const onSubmit: SubmitHandler<addNewTripFormType> = async (formData) => {
    try {
      await mutation.mutateAsync(formData);

      toast.success("اطلاعات سفر ویرایش شد", {
        description: "تغییرات سفر با موفقیت ذخیره شدند.",
      });

      refetch?.();
      onOpenChange(false);
    } catch {
      toast.error("خطا در ویرایش سفر", {
        description: "ذخیره تغییرات انجام نشد. دوباره تلاش کنید.",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          onOpenChange(open);
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
          <DialogTitle>ویرایش اطلاعات سفر</DialogTitle>
          <DialogDescription>
            اطلاعات سفر را ویرایش و تغییرات را ذخیره کنید.
          </DialogDescription>
        </DialogHeader>

        <form action="#" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-4">
            <Controller
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>نام مسافر</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="نام و نام خانوادگی مسافر"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="driverFullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>نام راننده</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="نام و نام خانوادگی راننده"
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
                  <FieldLabel htmlFor={field.name}>مبلغ سفر (تومان)</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min="1"
                    inputMode="numeric"
                    aria-invalid={fieldState.invalid}
                    placeholder="مبلغ سفر را وارد کنید"
                    value={field.value || ""}
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="route"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>مسیر سفر</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="مبدأ و مقصد سفر را وارد کنید"
                    rows={3}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>وضعیت سفر</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="وضعیت سفر را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">در انتظار</SelectItem>
                      <SelectItem value="done">تکمیل‌شده</SelectItem>
                      <SelectItem value="cancled">لغوشده</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Button type="button" variant="outline">
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
