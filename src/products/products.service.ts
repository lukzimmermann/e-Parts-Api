import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";

import { Postgres } from "src/lib/postgres";
import { PrismaClient} from "@prisma/client";
import { Product, ProductDocument, ProductPrice, ProductSupplier, ProductValue } from "src/products/product.model"

@Injectable()
export class ProductsService {

  postgres = new Postgres();
  
  
  async getSingleProduct(product_id: number) {
    const prisma = new PrismaClient()

    const product = await prisma.product.findUnique({
      include: {product_type: true, product_document:true },
      where: { id: parseInt(product_id.toString()) }
    })

    const supplier = await prisma.product_supplier.findMany({
      include: {supplier: true},
      where: {product_id: parseInt(product_id.toString()) }
    })

    const value = await prisma.product_value.findMany({
      include: {unit: true, valuename: true},
      where: {product_id: parseInt(product_id.toString()) }
    })

    const price = await prisma.product_price.findMany({
      include: { supplier: true },
      where: {product_id: parseInt(product_id.toString()) }
    })

    const prod = new Product();
    prod.id = product.id;
    prod.number = product.number;
    prod.name = product.name;
    prod.category_id = product.product_type.id;
    prod.category_name = product.product_type.name;
    prod.factory_number = product.factory_number;
    prod.housing = product.housing;
    prod.quantity = parseFloat(product.quantity.toString());
    prod.minimum_quantity = parseFloat(product.minimum_quantity.toString());
    prod.storagePlace = product.storageplace;
    prod.entryDate = product.entrydate;
    prod.updateDate = product.updatedate;
    prod.manufacturer = product.manufacturer;
    prod.supplier = [];
    prod.document = [];
    prod.value = [];
    prod.price = [];

    supplier.forEach(element => {
      const supp = new ProductSupplier()
      supp.id = element.supplier.id;
      supp.number = element.number;
      supp.supplier = element.supplier.name;
      supp.productPage = element.product_page;
      prod.supplier.push(supp)
    });

    product.product_document.forEach(element => {
      const doc = new ProductDocument()
      doc.id = element.id;
      doc.description = element.description;
      doc.filepath = element.filename;
      doc.filename = element.path;
      prod.document.push(doc)
    });

    value.forEach(element => {
      const value = new ProductValue()
      value.unit = element.unit.unit;
      value.value = parseFloat(element.value.toString());
      value.factor = parseFloat(element.unit.factor.toString());
      value.baseUnitId = element.unit.baseunit;
      prod.value.push(value)
    })

    price.forEach(element => {
      const pri = new ProductPrice();
      pri.supplier = element.supplier.name;
      pri.price = parseFloat(element.price.toString());
      pri.quantity = parseFloat(element.quantity.toString())
      prod.price.push(pri)
    })

    return {...prod}
  }


  async getAllProducts() {
    const prisma = new PrismaClient()
    const result = await prisma.product.findMany({
      include: {
        product_document: true,
      },
    })
    return result;
  }  
}
