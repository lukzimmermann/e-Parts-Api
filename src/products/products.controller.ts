import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IProduct } from "./product.model";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}  

  @Get()
  getProductAdvanced() {
    const response  = this.productsService.findAll()
    console.log(response)
    return response
  }

  @Get(':id')
  getProduct(@Param('id') id: number): any {
    return this.productsService.getSingleProduct(id)
  }
}
