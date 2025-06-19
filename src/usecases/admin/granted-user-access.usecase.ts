import { Role } from "../../domain/enum/role.enum";
import { AdminInterface } from "../../domain/interfaces/admin.interface";
import dateGenerate from "../../package/patterns/date-generate";
import { Usecase } from "../usecase";

export type GrantedUserAccessInputDto = {
    id: string;
    role: Role;
};

export type GrantedUserAccessOutputDto = void;

export class GrantedUserAccessUsecase
    implements Usecase<GrantedUserAccessInputDto, GrantedUserAccessOutputDto>
{
    private constructor(private readonly adminInterface: AdminInterface) {}

    public static build(adminInterface: AdminInterface) {
        return new GrantedUserAccessUsecase(adminInterface);
    }

    public async execute(input: GrantedUserAccessInputDto): Promise<void> {
        const { id, role } = input;
        const updatedAt = dateGenerate.now();

        await this.adminInterface.grantedUserAccess(id, role, updatedAt);
        return;
    }
}
