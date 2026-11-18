"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
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
import { sleep } from "@/lib/util";
import { DialogProps } from "@/type/component";

export function AddNewTripDialog({ refetch }: DialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<addNewTripFormType>({
    resolver: zodResolver(addNewTripFormSchema),
    defaultValues: {
      driverFullName: "",
      price: "0",
      route: "",
      status: "pending",
      fullName: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: addNewTripFormType) => {
      await sleep(3000);
      return data;
    },
  });

  const onSubmit: SubmitHandler<addNewTripFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("سفر جدید ثبت شد", {
        description: "اطلاعات سفر با موفقیت ثبت شد.",
      });

      refetch?.();
      form.reset();
      setOpen(false);
    } catch {
      toast.error("خطا در ثبت سفر", {
        description: "متأسفانه ثبت اطلاعات سفر انجام نشد. دوباره تلاش کنید.",
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
            ثبت سفر جدید
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ثبت سفر جدید</DialogTitle>
          <DialogDescription>
            اطلاعات مسافر، راننده و مسیر سفر را وارد کنید.
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
                    value={field.value}
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
              ثبت سفر
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
