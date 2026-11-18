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

export interface Trip {
  id: string;
  createdAt: string;

  fullName: string;
  driverFullName: string;
  price: number;
  status: "done" | "pending" | "cancled";
  route: string;
}
