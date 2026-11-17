import { PageInfoCardProps } from "@/type/component";
import StaticBreadCrumb from "@/component/staticBreadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";

export default function PageInfoCard({
  className,
  cta,
  subTitle,
  title,
}: PageInfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <StaticBreadCrumb className="mb-5" values={["راوا", title]} />
        {cta ? (
          <>
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <CardDescription>{subTitle}</CardDescription>
              {cta}
            </div>
          </>
        ) : (
          <>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subTitle}</CardDescription>
          </>
        )}
      </CardHeader>
    </Card>
  );
}
