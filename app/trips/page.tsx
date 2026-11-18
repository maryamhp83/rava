import type { Metadata } from "next";
import TripsPageContainer from "@/component/container/tripsPageContainer";
import MainLayout from "@/component/mainLayout";

const title = "مدیریت سفرها";

export const metadata: Metadata = { title };

export default function TripsPage() {
  return (
    <MainLayout>
      <TripsPageContainer title={title} />
    </MainLayout>
  );
}
