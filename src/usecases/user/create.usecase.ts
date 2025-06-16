import { UserEntity } from "../../domain/entities/user.entity";
import { UserInterface } from "../../domain/interfaces/user.interface";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type CreateUserOutputDto = void;

export class CreateUserUsecase
    implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
    private constructor(private readonly userInterface: UserInterface) {}

    public static build(userInterface: UserInterface) {
        return new CreateUserUsecase(userInterface);
    }

    public async execute(input: CreateUserInputDto): Promise<void> {
        const { username, firstName, lastName, password } = input;

        const user = await UserEntity.build(
            username,
            firstName,
            lastName,
            password
        );
        await this.userInterface.create(user);

        return;
    }
}
