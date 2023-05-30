import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';
import { Coffee } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll() {
    return await this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const data = await this.coffeeRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Coffe not found');
    }

    return data;
  }

  async insertOne(coffeeData: CreateCoffeeDto) {
    const data = this.coffeeRepository.create(coffeeData);
    const dataInserted = await this.coffeeRepository.save(data);
    return dataInserted;
  }

  async updateOne(coffeId: number, updateCoffeeDto: UpdateCoffeeDto) {
    const data = await this.coffeeRepository.update(coffeId, updateCoffeeDto);

    if (!data.affected) {
      throw new NotFoundException(`Did not found a coffee with id ${coffeId}`);
    }
  }

  async deleteOne(id: number) {
    const data = await this.findOne(id);

    this.coffeeRepository.remove(data);
    return `Row deleted successfully`;
  }
}
