"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import AddNewDriverDialog from "../dialog/driver/addNewDriverDialog";
import DriversFilterableTable from "../table/filterable/driversFilterableTable";
import { Driver } from "@/type/general";

const drivers: Driver[] = [
  {
    id: "1",
    createdAt: "2026-11-01T09:30:00.000Z",
    fullName: "محمد رضایی",
    phoneNumber: "09123456781",
    nationalCode: "0012345678",
    address: "تهران، خیابان آزادی، خیابان حبیب‌الله",
    licensePlate: "۲۱ ب ۳۴۵ ایران ۱۱",
    car: "پژو ۴۰۵",
    status: "active",
  },
  {
    id: "2",
    createdAt: "2026-11-02T11:15:00.000Z",
    fullName: "علی محمدی",
    phoneNumber: "09123456782",
    nationalCode: "0023456789",
    address: "تهران، میدان ونک، خیابان ملاصدرا",
    licensePlate: "۴۵ ج ۶۷۸ ایران ۲۲",
    car: "سمند LX",
    status: "active",
  },
  {
    id: "3",
    createdAt: "2026-11-03T14:20:00.000Z",
    fullName: "حسین کریمی",
    phoneNumber: "09123456783",
    nationalCode: "0034567890",
    address: "کرج، عظیمیه، بلوار استقلال",
    licensePlate: "۱۲ د ۹۱۲ ایران ۶۸",
    car: "پژو پارس",
    status: "deactive",
  },
  {
    id: "4",
    createdAt: "2026-11-04T08:45:00.000Z",
    fullName: "رضا احمدی",
    phoneNumber: "09123456784",
    nationalCode: "0045678901",
    address: "تهران، تهرانپارس، خیابان فرجام",
    licensePlate: "۳۳ هـ ۴۵۶ ایران ۱۱",
    car: "پراید ۱۳۱",
    status: "active",
  },
  {
    id: "5",
    createdAt: "2026-11-05T16:10:00.000Z",
    fullName: "امیرحسین حسینی",
    phoneNumber: "09123456785",
    nationalCode: "0056789012",
    address: "قم، بلوار امین، خیابان شهید صدوقی",
    licensePlate: "۵۶ ط ۷۸۹ ایران ۱۶",
    car: "دنا پلاس",
    status: "active",
  },
  {
    id: "6",
    createdAt: "2026-11-06T10:00:00.000Z",
    fullName: "مهدی جعفری",
    phoneNumber: "09123456786",
    nationalCode: "0067890123",
    address: "تهران، شهرری، خیابان فدائیان اسلام",
    licensePlate: "۶۷ ل ۱۲۳ ایران ۲۰",
    car: "تیبا ۲",
    status: "deactive",
  },
  {
    id: "7",
    createdAt: "2026-11-07T12:30:00.000Z",
    fullName: "سعید موسوی",
    phoneNumber: "09123456787",
    nationalCode: "0078901234",
    address: "اصفهان، خیابان چهارباغ بالا",
    licensePlate: "۷۸ م ۵۶۷ ایران ۱۳",
    car: "پژو ۲۰۶",
    status: "active",
  },
  {
    id: "8",
    createdAt: "2026-11-08T09:15:00.000Z",
    fullName: "فرهاد نادری",
    phoneNumber: "09123456788",
    nationalCode: "0089012345",
    address: "تهران، سعادت‌آباد، بلوار پاکنژاد",
    licensePlate: "۸۹ ن ۸۹۰ ایران ۱۱",
    car: "شاهین",
    status: "active",
  },
  {
    id: "9",
    createdAt: "2026-11-09T13:45:00.000Z",
    fullName: "پیمان اکبری",
    phoneNumber: "09123456789",
    nationalCode: "0090123456",
    address: "شیراز، معالی‌آباد، خیابان دوستان",
    licensePlate: "۹۰ و ۲۳۴ ایران ۶۳",
    car: "رانا پلاس",
    status: "deactive",
  },
  {
    id: "10",
    createdAt: "2026-11-10T15:20:00.000Z",
    fullName: "احمد مرادی",
    phoneNumber: "09123456790",
    nationalCode: "0101234567",
    address: "تهران، نارمک، میدان هفت‌حوض",
    licensePlate: "۲۳ ص ۶۷۸ ایران ۱۱",
    car: "دنا",
    status: "active",
  },
];

export default function DriversPageContainer({ title }: TitleOnlyProps) {
  return (
    <>
      <PageInfoCard
        title={title}
        subTitle="رانندگان و وضعیت فعالیت آن‌ها"
        className="mb-8"
        cta={<AddNewDriverDialog />}
      />
      <DriversFilterableTable data={drivers} />
    </>
  );
}
