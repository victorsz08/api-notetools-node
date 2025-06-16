import { UserInterface } from "../../domain/interfaces/user.interface";
import userMapper from "../../package/mapper/user-mapper";
import { Usecase } from "../usecase";

export type FindUserInputDto = {
    id: string;
};

export type FindUserOutputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export class FindUserUsecase
    implements Usecase<FindUserInputDto, FindUserOutputDto>
{
    private constructor(private readonly userInterface: UserInterface) {}

    public async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const { id } = input;

        const user = await this.userInterface.find(id);
        const output = userMapper.toDto(user);

        return output;
    }
}
