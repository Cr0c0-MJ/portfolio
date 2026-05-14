import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty()
  @MaxLength(40)
  author!: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  content!: string;
}
