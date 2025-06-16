import { UserInterface } from "../../domain/interfaces/user.interface";
import userMapper, { UserDto } from "../../package/mapper/user-mapper";
import { Usecase } from "../usecase";

export type ListUserInputDto = {
    page: number;
    limit: number;
    search?: string;
};

export type ListUserOutputDto = {
    users: UserDto[];
    page: number;
    totalItems: number;
    totalPages: number;
    limit: number;
};

export class ListUserUsecase
    implements Usecase<ListUserInputDto, ListUserOutputDto>
{
    private constructor(private readonly userInterface: UserInterface) {}

    public static build(userInterface: UserInterface) {
        return new ListUserUsecase(userInterface);
    }

    public async execute(input: ListUserInputDto): Promise<ListUserOutputDto> {
        const { page, limit, search } = input;

        const data = await this.userInterface.list(page, limit, search);
        const output: ListUserOutputDto = {
            users: data.users.map((user) => userMapper.toDto(user)),
            page: data.page,
            limit: data.limit,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
        };

        return output;
    }
}
