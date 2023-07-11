import {ApiProperty} from "@nestjs/swagger";

export class AuthRegisterResponse {

}

export class AuthTokensResponse {
    @ApiProperty()
    accessToken: string

    @ApiProperty()
    refreshToken: string
}

export class AuthLoginResponse {

}