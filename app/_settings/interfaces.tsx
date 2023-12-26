export type Product = {
  id: string;
  desc: string;
  type: string;
  price: number;
  visible?: boolean;
  res_name: string;
  photo: string;
  hearts: number;
  heartClicked: boolean;
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