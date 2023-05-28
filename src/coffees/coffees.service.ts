import { Injectable } from '@nestjs/common';
import { CoffeeProps } from 'src/interfaces/coffee';
import { coffees } from 'src/coffees/mock/coffees';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Injectable()
export class CoffeesService {
  findAll(): CoffeeProps[] {
    return coffees;
  }

  findOne(coffeeId: number): CoffeeProps {
    return coffees.find((coffee) => coffee.id === coffeeId);
  }

  insertOne(coffeeProps: CreateCoffeeDto) {
    coffees.push({ ...coffeeProps, id: coffees.length + 1 });
    return 'Coffee register successfully';
  }

  updateOne(coffeId: number, updateCoffeeDto: UpdateCoffeeDto): string {
    return `Se actualizo el cafe ${updateCoffeeDto} de id ${coffeId}`;
  }

  deleteOne(coffeId: number): string {
    return `Se elimino el cafe ${coffeId}`;
  }
}
