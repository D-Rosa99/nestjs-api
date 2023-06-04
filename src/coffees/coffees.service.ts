import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';
import { Coffee, Flavor } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findAll() {
    return await this.coffeeRepository.find({ relations: ['flavors'] });
  }

  async findOne(id: number) {
    const data = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });

    if (!data) {
      throw new NotFoundException('Coffe not found');
    }

    return data;
  }

  async insertOne(coffeeData: CreateCoffeeDto) {
    const flavorsData = await Promise.all(
      coffeeData.flavors.map((flavor) => this.preloadFlavorsEntity(flavor)),
    );

    const data = this.coffeeRepository.create({
      ...coffeeData,
      flavors: flavorsData,
    });
    const dataInserted = await this.coffeeRepository.save(data);
    return dataInserted;
  }

  async updateOne(coffeId: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavorsData =
      updateCoffeeDto.flavors.length > 0 &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((flavor) =>
          this.preloadFlavorsEntity(flavor),
        ),
      ));

    const data = await this.coffeeRepository.update(coffeId, {
      ...updateCoffeeDto,
      flavors: flavorsData,
    });

    if (!data.affected) {
      throw new NotFoundException(`Did not found a coffee with id ${coffeId}`);
    }
  }

  async deleteOne(id: number) {
    const data = await this.findOne(id);

    this.coffeeRepository.remove(data);
    return `Row deleted successfully`;
  }

  async preloadFlavorsEntity(name: string) {
    const existingFlavors = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavors) {
      return existingFlavors;
    }

    const data = this.flavorRepository.create({ name });
    return this.flavorRepository.save(data);
  }
}
