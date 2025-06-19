import { PrismaClient } from "@prisma/client";
import { Role } from "../../domain/enum/role.enum";
import { AdminInterface } from "../../domain/interfaces/admin.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";

export class AdminRepositoryPrisma implements AdminInterface {
    private constructor(private readonly repository: PrismaClient) {}

    public static build(repository: PrismaClient) {
        return new AdminRepositoryPrisma(repository);
    }

    public async recoveryPassword(
        id: string,
        password: string,
        updatedAt: Date
    ): Promise<void> {
        const user = await this.repository.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new HttpException(
                "usuário não encontrado",
                StatusCode.NOT_FOUND
            );
        }

        await this.repository.user.update({
            where: {
                id,
            },
            data: {
                password,
                updatedAt,
            },
        });

        return;
    }

    public async grantedUserAccess(
        id: string,
        role: Role,
        updatedAt: Date
    ): Promise<void> {
        const user = await this.repository.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new HttpException(
                "usuário não encontrado",
                StatusCode.NOT_FOUND
            );
        }

        await this.repository.user.update({
            where: {
                id,
            },
            data: {
                role,
                updatedAt,
            },
        });

        return;
    }
}
