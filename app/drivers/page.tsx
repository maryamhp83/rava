import DriversPageContainer from "@/component/container/driversPageContainer";
import MainLayout from "@/component/mainLayout";

const title = "مدیریت رانندگان";

export default function DriversPage() {
  return (
    <MainLayout>
      <DriversPageContainer title={title} />
    </MainLayout>
  );
}
