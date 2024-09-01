export interface Account {
  id: string;
  id_doctor: string;
  id_manager: string;
  name: string;
  age: number;
  address: string;
  gender: string;
  phone: string;
  password: string;
  role: string;
  major: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export const initialAccount: Account = {
  id: "",
  id_doctor: "",
  id_manager: "",
  name: "",
  age: 0,
  address: "",
  password: "",
  role: "",
  major: "",
  updatedAt: "",
  createdAt: "",
  deletedAt: "",
  gender: "",
  phone: "",
}