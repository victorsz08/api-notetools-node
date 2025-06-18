import { AuthInterface } from "../../domain/interfaces/auth.interface";
import { Usecase } from "../usecase";

export type AuthLoginInputDto = {
    username: string;
    password: string;
};

export type AuthLoginOutputDto = {
    token: string;
};

export class AuthLoginUsecase
    implements Usecase<AuthLoginInputDto, AuthLoginOutputDto>
{
    private constructor(private readonly authInterface: AuthInterface) {}

    public static build(authInterface: AuthInterface) {
        return new AuthLoginUsecase(authInterface);
    }

    public async execute(
        input: AuthLoginInputDto
    ): Promise<AuthLoginOutputDto> {
        const { username, password } = input;

        const token = await this.authInterface.login(username, password);

        return {
            token,
        };
    }
}
