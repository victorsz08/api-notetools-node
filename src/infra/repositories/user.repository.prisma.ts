import { Prisma, PrismaClient } from "@prisma/client";
import {
    ListUserOutput,
    UserInterface,
} from "../../domain/interfaces/user.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";
import { Role } from "../../domain/enum/role.enum";

export class UserRepository implements UserInterface {
    private constructor(private readonly repository: PrismaClient) {}

    public static build(repository: PrismaClient) {
        return new UserRepository(repository);
    }

    public async create(user: UserEntity): Promise<void> {
        const usernameAlreadyExists = await this.repository.user.findUnique({
            where: { username: user.username },
        });

        if (usernameAlreadyExists) {
            throw new HttpException(
                "username indisponível",
                StatusCode.CONFLICT,
            );
        }

        const data: Prisma.UserCreateInput = {
            id: user.id,
            username: user.username,
            name: user.firstName,
            lastname: user.lastName,
            role: user.role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        await this.repository.user.create({
            data,
        });

        return;
    }

    public async find(id: string): Promise<UserEntity> {
        const user = await this.repository.user.findUnique({ where: { id } });

        if (!user) {
            throw new HttpException(
                "usuário não localizado",
                StatusCode.NOT_FOUND,
            );
        }

        const output = UserEntity.with({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role as Role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        return output;
    }

    public async list(
        page: number,
        limit: number,
        search?: string,
    ): Promise<ListUserOutput> {
        const userArgs: Prisma.UserFindManyArgs = {
            where: {},
            take: limit,
            skip: (page - 1) * limit,
        };

        const countArgs: Prisma.UserCountArgs = {
            where: {},
        };

        if (search) {
            userArgs.where = {
                OR: [
                    {
                        username: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        lastname: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            };

            countArgs.where = {
                OR: [
                    {
                        username: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        lastname: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            };
        }

        const [users, count] = await this.repository.$transaction([
            this.repository.user.findMany(userArgs),
            this.repository.user.count(countArgs),
        ]);

        const userList = users.map((user) => {
            return UserEntity.with({
                id: user.id,
                username: user.username,
                firstName: user.name,
                lastName: user.lastname,
                role: user.role as Role,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        });

        const totalPages = Math.ceil(count / limit);

        return {
            users: userList,
            totalItems: count,
            totalPages,
            page,
            limit,
        };
    }

    public async update(
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        updatedAt: Date,
    ): Promise<void> {
        const user = await this.find(id);
        if (user.username !== username) {
            const usernameAlreadyExists = await this.repository.user.findUnique(
                { where: { username } },
            );

            if (usernameAlreadyExists) {
                throw new HttpException(
                    "username indisponível",
                    StatusCode.CONFLICT,
                );
            }
        }
        await this.repository.user.update({
            where: { id },
            data: {
                username,
                name: firstName,
                lastname: lastName,
                updatedAt,
            },
        });

        return;
    }

    public async updatePassword(
        id: string,
        password: string,
        updatedAt: Date,
    ): Promise<void> {
        await this.find(id);

        await this.repository.user.update({
            where: { id },
            data: {
                password,
                updatedAt,
            },
        });

        return;
    }

    public async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.user.delete({ where: { id } });

        return;
    }
}
