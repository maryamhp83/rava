"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import AddNewDriverDialog from "../dialog/driver/addNewDriverDialog";
import DriversFilterableTable from "../table/filterable/driversFilterableTable";
import ApiLoader from "../api/apiLoader";
import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "@/lib/api/drivers";

export default function DriversPageContainer({ title }: TitleOnlyProps) {
  const query = useQuery({
    queryFn: getDrivers,
    queryKey: ["drivers"],
  });

  const drivers = query.data?.rows ?? [];

  return (
    <ApiLoader
      isError={query.isError}
      isLoading={query.isLoading}
      refetch={query.refetch}
    >
      <PageInfoCard
        title={title}
        subTitle="رانندگان و وضعیت فعالیت آن‌ها"
        className="mb-8"
        cta={<AddNewDriverDialog refetch={query.refetch} />}
      />
      <DriversFilterableTable
        refetch={query.refetch}
        data={drivers.map((item) => ({
          ...item,
          id: item.$id,
          createdAt: item.$createdAt,
        }))}
      />
    </ApiLoader>
  );
}
