import { ReactNode } from "react";
import { Customer } from "./general";

export interface ChildrenOnlyProps {
  children: ReactNode;
}

export interface APIDialogProps<T> {
  className?: string;
  refetch?: () => void;
  data?: T;
}

export interface ClassOnlyProps {
  className?: string;
}

export interface RecoveryFormProps {
  className?: string;
  userId?: string;
  secret?: string;
  expire?: string;
}

export interface AuthGuardProps {
  children: ReactNode;
  mode?: "auth-only" | "disabled" | "no-auth-only";
}

export interface AlertScreenProps {
  className?: string;
  title: string;
  description: string;
  variant: "default" | "destructive";
  button?: ReactNode;
}

export interface LoadingScreenProps {
  className?: string;
}

export interface MainLayoutProps {
  className?: string;
  children: ReactNode;
  mode?: "auth-only" | "disabled" | "no-auth-only";
}

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface NavbarStateProps {
  className?: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface StaticBreadCrumbProps {
  className?: string;
  values: string[];
}

export interface StatusCardProps {
  title: string;
  icon: {
    element: ReactNode;
    color: `text-${string}`;
  };
  className?: string;
  amount: number;
  unit?: "toman" | "people" | "none";
}

export interface SaleExpensesCardProps {
  className?: string;
  data: {
    month: string;
    sales: number;
    expenses: number;
  }[];
}

export interface PageInfoCardProps {
  className?: string;
  title: string;
  subTitle: string;
  cta?: ReactNode;
}

export interface TripsStatusCardProps {
  className?: string;
  data: {
    done: number;
    cancled: number;
    inProgress: number;
  };
}

export interface LatestTripsTableCardProps {
  className?: string;
  data: {
    fullName: string;
    driverFullName: string;
    price: number;
    status: "done" | "pending" | "cancled";
  }[];
}

export interface TitleOnlyProps {
  title: string;
}

interface FilterableTableProps<T> {
  className?: string;
  data: T[];
}

export type CustomersFilterableTableProps = FilterableTableProps<Customer>;

export interface FullNameBadgeProps {
  fullName: string;
  className?: string;
}

export interface DialogProps {
  refetch?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
