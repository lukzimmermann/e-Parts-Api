export class Product {
    id: number;
    number: string;
    name: string;
    category_id: number;
    category_name: string;
    factory_number: string;
    housing: string;
    quantity: number;
    minimum_quantity: number;
    storagePlace: string;
    entryDate: Date;
    updateDate: Date;
    manufacturer: string;
    document: ProductDocument[];
    supplier: ProductSupplier[];
    value: ProductValue[];
    price: ProductPrice[];
}

export class ProductDocument {
    id: number;
    description: string;
    filepath: string;
    filename: string;
}

export class ProductSupplier {
    id: number;
    supplier: string;
    number: string;
    productPage: string;
}

export class ProductValue {
    unit: string;
    baseUnitId: number;
    value: number;
    factor: number;
}

export class ProductPrice {
    supplier: string;
    quantity: number;
    price: number;
}