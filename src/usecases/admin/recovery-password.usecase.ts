import { AdminInterface } from "../../domain/interfaces/admin.interface";
import dateGenerate from "../../package/patterns/date-generate";
import hashPattern from "../../package/patterns/hash-pattern";
import { Usecase } from "../usecase";

export type RecoveryPasswordInputDto = {
    id: string;
};

export type RecoveryPasswordOutputDto = {
    newPassword: string;
};

export class RecoveryPasswordUsecase
    implements Usecase<RecoveryPasswordInputDto, RecoveryPasswordOutputDto>
{
    private constructor(private readonly adminInterface: AdminInterface) {}

    public static build(adminInterface: AdminInterface) {
        return new RecoveryPasswordUsecase(adminInterface);
    }

    public async execute(
        input: RecoveryPasswordInputDto
    ): Promise<RecoveryPasswordOutputDto> {
        const { id } = input;
        const randomPassword = hashPattern.randomPassword();
        const updatedAt = dateGenerate.now();

        const newPassword = await hashPattern.hash(randomPassword);
        await this.adminInterface.recoveryPassword(id, newPassword, updatedAt);

        return {
            newPassword: randomPassword,
        };
    }
}
