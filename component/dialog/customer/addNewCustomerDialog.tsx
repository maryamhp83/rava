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
import {
  addNewCustomerFormSchema,
  addNewCustomerFormType,
} from "@/lib/formSchema";
import { Field, FieldLabel, FieldError } from "@/component/ui/field";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { DialogProps } from "@/type/component";
import { useState } from "react";
import { toast } from "sonner";
import { sleep } from "@/lib/util";

export default function AddNewCustomerDialog({ refetch }: DialogProps) {
  const [open, onOpenChange] = useState(false);
  const form = useForm<addNewCustomerFormType>({
    resolver: zodResolver(addNewCustomerFormSchema),
    defaultValues: {
      address: "",
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: addNewCustomerFormType) => sleep(3000),
  });

  const onSubmit: SubmitHandler<addNewCustomerFormType> = async (data) => {
    try {
      await mutation.mutateAsync(data);

      toast.success("مشتری با موفقیت ثبت شد", {
        description: "اطلاعات مشتری جدید با موفقیت ذخیره شد.",
      });

      refetch?.();
      onOpenChange(false);
    } catch {
      toast.error("ثبت مشتری ناموفق بود", {
        description:
          "متأسفانه هنگام ثبت اطلاعات مشتری خطایی رخ داد. لطفاً دوباره تلاش کنید.",
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
            ثبت مشتری جدید
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>ثبت مشتری</DialogTitle>
          <DialogDescription>
            اطلاعات زیر را با دقت تکمیل کنید.
          </DialogDescription>
        </DialogHeader>
        <form action="#" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-6">
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
                  variant={"outline"}
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
              ثبت
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
