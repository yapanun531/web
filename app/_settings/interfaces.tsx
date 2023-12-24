export type Product = {
  id: string;
  desc: string;
  type: string;
  price: number;
  visible?: boolean;
  res_name: string;
  photo: string;
};

export type MenuItems = {
  restaurant: string;
  type: string;
}

export type Store = {
  id: string;
  name: string;
  account:string;
  password: string;
}