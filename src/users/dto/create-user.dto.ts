import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

//User Body Validation in creation
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
