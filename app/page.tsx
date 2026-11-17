import PageInfoCard from "@/component/card/pageInfoCard";
import DashboardPageContainer from "@/component/container/dashboardPageContainer";
import MainLayout from "@/component/mainLayout";
import { Button } from "@/component/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const title = "داشبورد";

export default function HomePage() {
  return (
    <MainLayout>
      <PageInfoCard
        title={title}
        subTitle="در ادامه خلاصه‌ای از فعالیت‌های امروز و وضعیت مالی را می‌بینید."
        className="mb-8"
        cta={
          <Button
            size="lg"
            render={
              <Link href="/trips">
                <Plus />
                ثبت سفر جدید
              </Link>
            }
          />
        }
      />
      <DashboardPageContainer />
    </MainLayout>
  );
}
