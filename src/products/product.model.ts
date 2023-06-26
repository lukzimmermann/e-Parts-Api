export class Product {
  id: number;
  number: string;
  name: string;
  catagory: string;
  housing: string;
  quantity: number;
  manufacturer: string  
  factory_number?: string;
  minimum_quantity?: number;
  storageplace?: string;
  entrydate?: Date;
  updatedate?: Date;
  supplier?: Supplier[];
  documents?: Documents[];
  properties?: Properties[];
  price?: Price[]; 
}

export class Supplier {
  name: string;
  supplier_productnumber: string;
  product_page: string;
}

export class Documents {
  document_id: number;
  description: string;
  path: string;
  filename: string;
}

export class Properties {
  name: string;
  value: number;
  unit: string;
}

export class Price {
  supplier: string;
  quantity: number;
  price: number;
}
