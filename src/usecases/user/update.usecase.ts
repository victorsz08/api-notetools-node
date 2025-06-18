import { UserInterface } from "../../domain/interfaces/user.interface";
import GenerateDate from "../../package/patterns/date-generate";
import { Usecase } from "../usecase";

export type UpdateUserInputDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
};

export type UpdateUserOutputDto = void;

export class UpdateUserUsecase
    implements Usecase<UpdateUserInputDto, UpdateUserOutputDto>
{
    public constructor(private readonly userInterface: UserInterface) {}

    public static build(userInterface: UserInterface) {
        return new UpdateUserUsecase(userInterface);
    }

    public async execute(input: UpdateUserInputDto): Promise<void> {
        const { id, username, firstName, lastName } = input;
        const updatedAt = GenerateDate.now();

        await this.userInterface.update(
            id,
            username,
            firstName,
            lastName,
            updatedAt
        );

        return;
    }
}
