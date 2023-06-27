import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";

import { Postgres } from "src/lib/postgres";
import { PrismaClient, product } from "@prisma/client";

@Injectable()
export class ProductsService {

  postgres = new Postgres();
  
  
  async getSingleProduct(product_id: number) {
    const prisma = new PrismaClient()
    const result = await prisma.product.findUnique({
      include: { product_document: true },
      where: { id: parseInt(product_id.toString()) }
    })
    return result
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
