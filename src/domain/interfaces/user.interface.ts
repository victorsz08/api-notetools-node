import { UserEntity } from "../entities/user.entity";

export type ListUserOutput = {
    users: UserEntity[];
    totalItems: number;
    totalPages: number;
    limit: number;
    page: number;
};

export interface UserInterface {
    create(user: UserEntity): Promise<void>;
    find(id: string): Promise<UserEntity>;
    list(page: number, limit: number, search?: string): Promise<ListUserOutput>;
    update(
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        updatedAt: Date
    ): Promise<void>;
    updatePassword(
        id: string,
        password: string,
        updatedAt: Date
    ): Promise<void>;
    updateAvatar(id: string, avatarUrl: string): Promise<void>;
    delete(id: string): Promise<void>;
}
