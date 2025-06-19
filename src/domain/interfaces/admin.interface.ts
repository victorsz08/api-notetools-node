import { Role } from "../enum/role.enum";

export interface AdminInterface {
    recoveryPassword(
        id: string,
        password: string,
        updatedAt: Date
    ): Promise<void>;
    grantedUserAccess(id: string, role: Role, updatedAt: Date): Promise<void>;
}
