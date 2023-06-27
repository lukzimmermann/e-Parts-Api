import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}  

  @ApiResponse({
    status: 200,
    description: 'All Products',
  })
  
  @Get()
  async getProducts()  {
    const response = await this.productsService.getAllProducts();
    return response
  }

  @ApiParam({name: 'id', type: 'integer', description: 'ID of Product', required: true})
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.getSingleProduct(id)
  }

  //@Post()  
  //addProduct(
  //  @Body('name') name: string,
  //  @Body('catagory') catagory: string
  //): any {
  //  this.productsService.insertProduct(
  //    name,
  //    catagory
  //  );
  //} 
}
