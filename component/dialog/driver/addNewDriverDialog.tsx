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
import { Loader2, Plus } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewDriverFormSchema, addNewDriverFormType } from "@/lib/formSchema";
import { Field, FieldLabel, FieldError } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { DialogProps } from "@/type/component";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { createDriver } from "@/lib/api/drivers";

export default function AddNewDriverDialog({ refetch }: DialogProps) {
  const [open, onOpenChange] = useState(false);

  const form = useForm<addNewDriverFormType>({
    resolver: zodResolver(addNewDriverFormSchema),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
      address: "",
      licensePlate: "",
      car: "",
      status: "active",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: addNewDriverFormType) => createDriver(data),
  });

  const onSubmit: SubmitHandler<addNewDriverFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("راننده با موفقیت ثبت شد", {
        description: "اطلاعات راننده جدید با موفقیت ذخیره شد.",
      });

      refetch?.();
      onOpenChange(false);
      form.reset();
    } catch {
      toast.error("ثبت راننده ناموفق بود", {
        description:
          "متأسفانه هنگام ثبت اطلاعات راننده خطایی رخ داد. لطفاً دوباره تلاش کنید.",
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
          <Button size="lg">
            <Plus />
            ثبت راننده جدید
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ثبت راننده</DialogTitle>
          <DialogDescription>
            اطلاعات زیر را با دقت تکمیل کنید.
          </DialogDescription>
        </DialogHeader>

        <form action="#" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 space-y-4">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    نام و نام خانوادگی
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="نام و نام خانوادگی راننده را وارد کنید"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>شماره تماس</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    placeholder="09123456789"
                    autoComplete="tel"
                    dir="ltr"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="nationalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>کد ملی</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="کد ملی راننده را وارد کنید"
                    inputMode="numeric"
                    dir="ltr"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="car"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>مدل خودرو</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="مثلاً پژو ۲۰۶"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="licensePlate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>شماره پلاک</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="مثلاً ۱۲ الف ۳۴۵ ایران ۶۷"
                    dir="rtl"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>آدرس</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="آدرس کامل راننده را وارد کنید"
                    rows={3}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>وضعیت راننده</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="وضعیت راننده را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">فعال</SelectItem>
                      <SelectItem value="deactive">غیرفعال</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  disabled={form.formState.isSubmitting}
                  variant="outline"
                >
                  بستن
                </Button>
              }
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Plus />
              )}
              ثبت راننده
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
