import { UserInterface } from "../../domain/interfaces/user.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";
import HashPattern from "../../package/patterns/hash-pattern";
import { Usecase } from "../usecase";
import GenerateDate from "../../package/patterns/date-generate";


export type UpdatePasswordInputDto = {
    id: string;
    currentPassword: string;
    newPassword: string;
};

export type UpdatePasswordOutputDto = void;




export class UpdatePasswordUsecase implements Usecase<UpdatePasswordInputDto, UpdatePasswordOutputDto> {
    public constructor(private readonly userInterface: UserInterface) {};

    public static build(userInterface: UserInterface) {
        return new UpdatePasswordUsecase(userInterface);
    };

    public async execute(input: UpdatePasswordInputDto): Promise<void> {
        const { id, currentPassword, newPassword } = input;
        const updatedAt = GenerateDate.now();

        const user = await this.userInterface.find(id);

        const isPasswordValid = await HashPattern.compare(currentPassword, user.password);
        if(!isPasswordValid) {
            throw new HttpException("Senha atual inválida", StatusCode.BAD_REQUEST);
        };

        const newPasswordHash = await HashPattern.hash(newPassword);
        await this.userInterface.updatePassword(id, newPasswordHash, updatedAt);
        
        return;
    };
};