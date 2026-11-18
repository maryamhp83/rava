import { z } from "zod";
import {
  verifyIranianNationalId,
  isPhoneNumberValid,
} from "@persian-tools/persian-tools";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "وارد کردن ایمیل الزامی است.")
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید."),
  password: z.string().min(1, "وارد کردن رمز عبور الزامی است."),
});

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "وارد کردن ایمیل الزامی است.")
      .email("لطفاً یک آدرس ایمیل معتبر وارد کنید."),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر داشته باشد."),
    confirmPassword: z.string().min(1, "لطفاً رمز عبور خود را تأیید کنید."),
    name: z
      .string()
      .trim()
      .min(2, "نام باید حداقل ۲ کاراکتر داشته باشد.")
      .max(128, "نام نباید بیشتر از ۱۲۸ کاراکتر باشد."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور با یکدیگر مطابقت ندارند.",
    path: ["confirmPassword"],
  });

export const recoveryFormSchema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر داشته باشد."),
    confirmPassword: z.string().min(1, "لطفاً رمز عبور خود را تأیید کنید."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمزهای عبور با یکدیگر مطابقت ندارند.",
    path: ["confirmPassword"],
  });

export const settingsFormSchema = z.object({
  email: z
    .string()
    .min(1, "وارد کردن ایمیل الزامی است.")
    .email("آدرس ایمیل معتبر نیست."),
  userName: z
    .string()
    .min(1, "وارد کردن نام کاربری الزامی است.")
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد.")
    .max(30, "نام کاربری نمی‌تواند بیشتر از ۳۰ کاراکتر باشد."),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر داشته باشد.")
    .optional(),
});

export const addNewCustomerFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است.")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد."),
  nationalCode: z
    .string()
    .min(1, "کد ملی الزامی است.")
    .refine(
      (value) => verifyIranianNationalId(value),
      "کد ملی وارد شده معتبر نیست.",
    ),
  phoneNumber: z
    .string()
    .min(1, "شماره تلفن الزامی است.")
    .refine(
      (value) => isPhoneNumberValid(value),
      "شماره تلفن وارد شده معتبر نیست.",
    ),
  address: z
    .string()
    .trim()
    .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد.")
    .max(300, "آدرس نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد."),
});

export const addNewDriverFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است.")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد."),

  nationalCode: z
    .string()
    .min(1, "کد ملی الزامی است.")
    .refine(
      (value) => verifyIranianNationalId(value),
      "کد ملی وارد شده معتبر نیست.",
    ),

  phoneNumber: z
    .string()
    .min(1, "شماره تلفن الزامی است.")
    .refine(
      (value) => isPhoneNumberValid(value),
      "شماره تلفن وارد شده معتبر نیست.",
    ),

  address: z
    .string()
    .trim()
    .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد.")
    .max(300, "آدرس نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد."),

  licensePlate: z
    .string()
    .trim()
    .min(1, "پلاک خودرو الزامی است.")
    .min(5, "پلاک خودرو معتبر نیست.")
    .max(15, "پلاک خودرو نمی‌تواند بیشتر از ۱۵ کاراکتر باشد."),

  car: z
    .string()
    .trim()
    .min(1, "مدل خودرو الزامی است.")
    .min(2, "مدل خودرو باید حداقل ۲ کاراکتر باشد.")
    .max(100, "مدل خودرو نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  status: z.enum(["active", "deactive"], {
    error: "وضعیت راننده الزامی است.",
  }),
});

export type addNewDriverFormType = z.infer<typeof addNewDriverFormSchema>;
export type signupFormType = z.infer<typeof signupFormSchema>;
export type addNewCustomerFormType = z.infer<typeof addNewCustomerFormSchema>;
export type loginFormType = z.infer<typeof loginFormSchema>;
export type recoveryFormType = z.infer<typeof recoveryFormSchema>;
export type settingsFormType = z.infer<typeof settingsFormSchema>;
