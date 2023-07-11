import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class BusinessAccountsCreateRequest {
    @ApiProperty({ example: '2', description: 'The user id' })
    @IsNotEmpty()
    userId: number

    @ApiProperty({ example: 'Nails Beauty', description: 'The business name' })
    @IsNotEmpty()
    @IsString()
    businessName: string
}

export class BusinessAccountsUpdateRequest extends PartialType(BusinessAccountsCreateRequest) {}