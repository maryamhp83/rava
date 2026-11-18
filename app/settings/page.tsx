import type { Metadata } from "next";
import MainLayout from "@/component/mainLayout";
import SettingsForm from "@/component/form/settingsForm";
import PageInfoCard from "@/component/card/pageInfoCard";

const title = "تنظیمات";

export const metadata: Metadata = {
  title,
};

export default function MedicalRecordsPage() {
  return (
    <MainLayout>
      <PageInfoCard
        title={title}
        subTitle="مدیریت تنظیمات سامانه،"
        className="mb-8"
      />
      <SettingsForm />
    </MainLayout>
  );
}
