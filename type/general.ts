export interface Customer {
  id: string;
  createdAt: string;

  fullName: string;
  phoneNumber: string;
  nationalCode: string;
  address: string;
}

export interface Driver {
  id: string;
  createdAt: string;

  fullName: string;
  phoneNumber: string;
  nationalCode: string;
  address: string;
  licensePlate: string;
  car: string;
  status: "active" | "deactive";
}
