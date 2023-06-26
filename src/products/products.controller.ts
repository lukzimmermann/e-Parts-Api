import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}  

  @Get()
  getProducts(): any {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: number): any {
    return this.productsService.getSingleProduct(id)
  }

  @Post()  
  addProduct(
    @Body('name') name: string,
    @Body('catagory') catagory: string
  ): any {
    this.productsService.insertProduct(
      name,
      catagory
    );
  } 
}
