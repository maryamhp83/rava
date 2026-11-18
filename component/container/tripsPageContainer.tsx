"use client";

import { TitleOnlyProps } from "@/type/component";
import PageInfoCard from "@/component/card/pageInfoCard";
import { TripsFilterableTable } from "../table/filterable/tripsFilterableTable";
import { AddNewTripDialog } from "../dialog/trip/addNewTripDialog";
import ApiLoader from "../api/apiLoader";
import { useQuery } from "@tanstack/react-query";
import { getTrips } from "@/lib/api/trips";

export default function TripsPageContainer({ title }: TitleOnlyProps) {
  const query = useQuery({
    queryFn: getTrips,
    queryKey: ["trips"],
  });

  const trips = query.data?.rows ?? [];

  return (
    <ApiLoader
      isLoading={query.isLoading}
      isError={query.isError}
      refetch={query.refetch}
    >
      <PageInfoCard
        title={title}
        subTitle="ثبت و پیگیری سفرهای آژانس"
        className="mb-8"
        cta={<AddNewTripDialog refetch={query.refetch} />}
      />
      <TripsFilterableTable
        refetch={query.refetch}
        data={trips.map((item) => ({
          ...item,
          id: item.$id,
          createdAt: item.$createdAt,
        }))}
      />
    </ApiLoader>
  );
}
