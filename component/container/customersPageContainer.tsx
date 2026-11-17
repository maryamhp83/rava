"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import CustomersFilterableTable from "../table/filterable/customersFilterableTable";

import { Customer } from "@/type/general";
import AddNewCustomerDialog from "../dialog/customer/addNewCustomerDialog";
export const fakeCustomers: Customer[] = [
  {
    id: "customer-001",
    createdAt: "2026-11-01T09:24:00.000Z",
    fullName: "علی رضایی",
    phoneNumber: "09123456781",
    nationalCode: "0012345678",
    address: "تهران، سعادت‌آباد، خیابان سرو",
  },
  {
    id: "customer-002",
    createdAt: "2026-11-02T11:15:00.000Z",
    fullName: "مریم محمدی",
    phoneNumber: "09123456782",
    nationalCode: "0023456789",
    address: "تهران، پونک، بلوار عدل",
  },
  {
    id: "customer-003",
    createdAt: "2026-11-03T14:30:00.000Z",
    fullName: "محمد امیری",
    phoneNumber: "09123456783",
    nationalCode: "0034567890",
    address: "اصفهان، مرداویج، خیابان شیخ صدوق",
  },
  {
    id: "customer-004",
    createdAt: "2026-11-04T08:45:00.000Z",
    fullName: "زهرا احمدی",
    phoneNumber: "09123456784",
    nationalCode: "0045678901",
    address: "شیراز، معالی‌آباد، خیابان دوستان",
  },
  {
    id: "customer-005",
    createdAt: "2026-11-05T16:20:00.000Z",
    fullName: "حسین کریمی",
    phoneNumber: "09123456785",
    nationalCode: "0056789012",
    address: "مشهد، وکیل‌آباد، بلوار هاشمیه",
  },
  {
    id: "customer-006",
    createdAt: "2026-11-06T10:10:00.000Z",
    fullName: "فاطمه موسوی",
    phoneNumber: "09123456786",
    nationalCode: "0067890123",
    address: "کرج، عظیمیه، بلوار شریعتی",
  },
  {
    id: "customer-007",
    createdAt: "2026-11-07T12:40:00.000Z",
    fullName: "رضا حیدری",
    phoneNumber: "09123456787",
    nationalCode: "0078901234",
    address: "تبریز، ولیعصر، خیابان فروغی",
  },
  {
    id: "customer-008",
    createdAt: "2026-11-08T09:00:00.000Z",
    fullName: "نگار جعفری",
    phoneNumber: "09123456788",
    nationalCode: "0089012345",
    address: "رشت، گلسار، بلوار دیلمان",
  },
  {
    id: "customer-009",
    createdAt: "2026-11-09T13:25:00.000Z",
    fullName: "امیرحسین قاسمی",
    phoneNumber: "09123456789",
    nationalCode: "0090123456",
    address: "تهران، تهرانپارس، خیابان جشنواره",
  },
  {
    id: "customer-010",
    createdAt: "2026-11-10T15:50:00.000Z",
    fullName: "سارا اکبری",
    phoneNumber: "09123456790",
    nationalCode: "0101234567",
    address: "یزد، صفائیه، بلوار دانشگاه",
  },
  {
    id: "customer-011",
    createdAt: "2026-11-11T07:35:00.000Z",
    fullName: "محمدرضا عباسی",
    phoneNumber: "09123456791",
    nationalCode: "0112345678",
    address: "قم، سالاریه، بلوار امین",
  },
  {
    id: "customer-012",
    createdAt: "2026-11-12T17:10:00.000Z",
    fullName: "الهام صادقی",
    phoneNumber: "09123456792",
    nationalCode: "0123456789",
    address: "اهواز، کیانپارس، خیابان پهلوان",
  },
  {
    id: "customer-013",
    createdAt: "2026-11-13T10:55:00.000Z",
    fullName: "آرمان نادری",
    phoneNumber: "09123456793",
    nationalCode: "0134567890",
    address: "تهران، شهرک غرب، بلوار فرحزادی",
  },
  {
    id: "customer-014",
    createdAt: "2026-11-14T12:15:00.000Z",
    fullName: "پریسا رحیمی",
    phoneNumber: "09123456794",
    nationalCode: "0145678901",
    address: "بندرعباس، گلشهر، بلوار امام خمینی",
  },
  {
    id: "customer-015",
    createdAt: "2026-11-15T08:30:00.000Z",
    fullName: "سعید مرادی",
    phoneNumber: "09123456795",
    nationalCode: "0156789012",
    address: "کرمان، هزار و یک شب، خیابان جهاد",
  },
];

export default function CustomersPageContainer({ title }: TitleOnlyProps) {
  return (
    <>
      <PageInfoCard
        title={title}
        subTitle="ثبت و مدیریت اطلاعات مشتریان"
        className="mb-8"
        cta={<AddNewCustomerDialog />}
      />
      <CustomersFilterableTable data={fakeCustomers} />
    </>
  );
}
