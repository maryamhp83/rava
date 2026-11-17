import { getInitials } from "@/lib/util";
import { FullNameBadgeProps } from "@/type/component";
import { cn } from "cn";

export default function FullNameBadge({
  fullName,
  className,
}: FullNameBadgeProps) {
  return (
    <div className={cn("flex items-center justify-start gap-2", className)}>
      <div className="size-8 text-xs font-light bg-input/50 rounded-md flex items-center justify-center">
        {getInitials(fullName)}
      </div>
      {fullName}
    </div>
  );
}
