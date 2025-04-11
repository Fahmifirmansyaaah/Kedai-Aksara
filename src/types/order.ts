interface Imenu {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  isAvailable: string;
}

interface Icart {
  menuId?: string;
  quantity: number;
  notes?: string;
  menuItem?: Imenu;
  name?: string;
}

interface Iorder {
  id: string;
  customer_name: string;
  table_number: number;
  cart: Icart[];
  status: "PENDING" | "COMPLETE" | "PROCESSING";
  total: number;
}

export type { Iorder, Icart, Imenu };
