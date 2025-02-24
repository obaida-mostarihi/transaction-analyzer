import { Type } from "class-transformer";
import { ArrayNotEmpty, IsDateString, IsDefined, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

export class TransactionItemDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;
}

export class TransactionDto {
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransactionItemDto)
    transaction: TransactionItemDto;
}

export class TransactionsDto {
    @IsDefined({ each: true })
    @IsObject({ each: true })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => TransactionItemDto)
    transactions?: TransactionItemDto[];
}