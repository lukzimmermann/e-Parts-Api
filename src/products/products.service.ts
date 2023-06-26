import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Documents, Price, Product, Properties, Supplier } from './product.model'
import { Postgres } from "src/lib/postgres";

@Injectable()
export class ProductsService {
  products : Product[] = []
  postgres = new Postgres();

  async getSingleProduct(id: number): Promise<Product> {
    const query = `SELECT
      product.id,
      product.number,
      product.name,
      product_type.name as catageroy,
      product.manufacturer,
      product.factory_number,
      product.housing,
      product.quantity,
      product.minimum_quantity,
      product.storageplace,
      product.entrydate,
      product.updatedate
    FROM product
    INNER JOIN product_type ON product.category=product_type.id
    WHERE product.id =$1`;
    const queryValues = [id]
    let response: any = await this.postgres.execute(query, queryValues);
  

    response.id = parseInt(response.id);
    response.quantity = parseFloat(response.quantity);
    response.minimum_quantity = parseFloat(response.minimum_quantity);
    response.entrydate = Date.parse(response.entrydate);
    response.updatedate = Date.parse(response.updatedate);

    response = response[0];

    const supplier: Supplier[] = await this.getSupplier(id);
    response['supplier'] = supplier;

    const documents: Documents[] = await this.getDocuments(id);
    response['documents'] = documents;

    const properties: Properties[] = await this.getProperties(id);
    response['properties'] = properties;

    const price: Price[] = await this.getPrice(id);
    response['price'] = price

    this.checkResponse(response);
    return response;
  }

  async getAllProducts(): Promise<Product[]>{
    const query = `SELECT
        product.id,
        product.number,
        product.name,
        product_type.name as category,
        product.housing,
        product.quantity,
        product.manufacturer
        FROM product
        INNER JOIN product_type
        ON product.category=product_type.id
        ORDER BY product.number`
    const queryValues = []
    const response = await this.postgres.execute(query, queryValues);

    response.map((row: any) => {
      row.id = parseInt(row.id);
      row.quantity = parseFloat(row.quantity);
    })

    this.checkResponse(response)
    return response;
  }

  private async getDocuments(productId: number): Promise<Documents[]> {
    const query = `SELECT
      id as document_id,
      description,
      path, 
      filename
      FROM product_document
      WHERE product_id = $1`
    const queryValues = [productId]
    const response = await this.postgres.execute(query, queryValues);

    response.map((row: any) => {
      row.id = parseInt(row.id);
    })

    this.checkResponse(response)
    return response
  }

  private async getProperties(productId: number): Promise<Properties[]> {
    const query = `SELECT
      valuename.name,
      product_value.value,
      unit.unit
      FROM product_value
      INNER JOIN valuename ON valuename.id = product_value.valuename_id
      INNER JOIN unit ON product_value.unitid = unit.id
      WHERE product_value.product_id = $1`
    const queryValues = [productId]
    const response = await this.postgres.execute(query, queryValues);
    
    response.map((row: any) => {
      row.value = parseFloat(row.value);
    })

    this.checkResponse(response)
    return response
  }

  private async getPrice(productId: number): Promise<Price[]> {
    const query = `SELECT
      supplier.name as supplier,
      product_price.quantity,
      product_price.price
      FROM product_price
      INNER JOIN supplier ON supplier.id=product_price.supplier_id
      WHERE product_id = $1`
    const queryValues = [productId]
    const response = await this.postgres.execute(query, queryValues);

    response.map((row: any) => {
      row.quantity = parseFloat(row.quantity);
      row.price = parseFloat(row.price);
    })

    this.checkResponse(response)
    return response
  }

  private async getSupplier(productId: number): Promise<Supplier[]> {
    const query = `SELECT
      supplier.name,
      product_supplier.number as supplier_productnumber,
      product_supplier.product_page
      FROM product_supplier
      INNER JOIN supplier ON supplier.id=product_supplier.supplier_id
      WHERE product_supplier.product_id = $1`
    const queryValues = [productId]
    const response = await this.postgres.execute(query, queryValues);

    this.checkResponse(response)
    return response
  }

  private checkResponse(response){
    if (response === undefined) throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    if(response.length === 0) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
