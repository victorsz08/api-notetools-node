import { UserEntity } from "../../domain/entities/user.entity";
import { Role } from "../../domain/enum/role.enum";
import dateGenerate from "../patterns/date-generate";

export type UserDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export const UserRole = {
    [Role.ADMIN]: "Admin",
    [Role.USER]: "User",
} as const;

class UserMapper {
    public toDto(user: UserEntity): UserDto {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: UserRole[user.role],
            createdAt: dateGenerate.format(user.createdAt),
            updatedAt: dateGenerate.format(user.updatedAt),
        };
    }
}

export default new UserMapper();
