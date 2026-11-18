"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import CustomersFilterableTable from "../table/filterable/customersFilterableTable";
import AddNewCustomerDialog from "../dialog/customer/addNewCustomerDialog";
import ApiLoader from "../api/apiLoader";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/lib/api/customers";

export default function CustomersPageContainer({ title }: TitleOnlyProps) {
  const query = useQuery({
    queryFn: getCustomers,
    queryKey: ["customers"],
  });

  const customers = query.data?.rows ?? [];

  return (
    <ApiLoader
      isLoading={query.isLoading}
      isError={query.isError}
      refetch={query.refetch}
    >
      <PageInfoCard
        title={title}
        subTitle="ثبت و مدیریت اطلاعات مشتریان"
        className="mb-8"
        cta={<AddNewCustomerDialog refetch={query.refetch} />}
      />
      <CustomersFilterableTable
        refetch={query.refetch}
        data={customers.map((item) => ({
          ...item,
          id: item.$id,
          createdAt: item.$createdAt,
        }))}
      />
    </ApiLoader>
  );
}
