import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Response } from 'express';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get('/')
  getCoffees(@Res() res: Response) {
    res.status(200).send(this.coffeesService.findAll());
  }

  @Get(':id')
  getCoffee(@Param('id') id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  postCoffee(@Body() coffeeProps: CreateCoffeeDto) {
    return this.coffeesService.insertOne(coffeeProps);
  }

  @Patch(':id')
  updateCoffee(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
    return this.coffeesService.updateOne(id, body);
  }

  @Delete(':id')
  deleteCoffee(@Param('id') id: number) {
    return this.coffeesService.deleteOne(id);
  }
}
