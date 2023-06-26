export class Product {
  constructor(
    public id: number,
    public name: string,
    public catagory: string,
  ) {};
}

export interface IProduct {
  "id": number,
  "number": string,
  "name": string,
  "category": string,
  "housing": string,
  "quantity": number,
  "manufacturer": string
}
