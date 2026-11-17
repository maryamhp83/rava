import CustomersPageContainer from "@/component/container/customersPageContainer";
import MainLayout from "@/component/mainLayout";

const title = "مدیریت مشتریان";

export default function CustomersPage() {
  return (
    <MainLayout>
      <CustomersPageContainer title={title} />
    </MainLayout>
  );
}
