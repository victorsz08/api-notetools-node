import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";
import dateGenerate from "../../package/patterns/date-generate";
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

    public async execute(input: UpdateUserInputDto): Promise<void> {
        const { id, username, firstName, lastName } = input;
        const updatedAt = dateGenerate.generate();

        await this.userInterface.update(
            id,
            username,
            firstName,
            lastName,
            updatedAt,
        );

        return;
    }
}
