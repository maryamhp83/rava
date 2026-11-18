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
import { Loader2, Pen, Save } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewCustomerFormSchema,
  addNewCustomerFormType,
} from "@/lib/formSchema";
import { Field, FieldLabel, FieldError } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { EditCustomerDialogProps } from "@/type/component";
import { useState } from "react";
import { toast } from "sonner";
import { sleep } from "@/lib/util";

export default function EditCustomerDialog({
  refetch,
  data,
}: EditCustomerDialogProps) {
  const [open, onOpenChange] = useState(false);

  const form = useForm<addNewCustomerFormType>({
    resolver: zodResolver(addNewCustomerFormSchema),
    defaultValues: data,
  });

  const mutation = useMutation({
    mutationFn: (data: addNewCustomerFormType) => sleep(3000),
  });

  const onSubmit: SubmitHandler<addNewCustomerFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("اطلاعات مشتری با موفقیت ویرایش شد", {
        description: "تغییرات اطلاعات مشتری با موفقیت ذخیره شد.",
      });

      refetch?.();
      onOpenChange(false);
    } catch {
      toast.error("ویرایش اطلاعات مشتری ناموفق بود", {
        description:
          "متأسفانه هنگام ویرایش اطلاعات مشتری خطایی رخ داد. لطفاً دوباره تلاش کنید.",
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
          <DialogTitle>ویرایش مشتری</DialogTitle>
          <DialogDescription>
            اطلاعات مشتری را ویرایش کرده و تغییرات را ذخیره کنید.
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
                    placeholder="نام و نام خانوادگی مشتری را وارد کنید"
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
                    placeholder="کد ملی مشتری را وارد کنید"
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
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>آدرس</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="آدرس کامل مشتری را وارد کنید"
                    rows={3}
                    aria-invalid={fieldState.invalid}
                  />
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
