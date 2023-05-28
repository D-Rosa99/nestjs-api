import { IsNumber, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly exportCountry: string;

  @IsString()
  readonly type: string;

  @IsNumber()
  readonly stock: number;
}
