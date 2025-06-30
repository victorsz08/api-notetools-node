import { PrismaClient } from "@prisma/client";
import { AuthInterface } from "../../domain/interfaces/auth.interface";
import { HttpException } from "../../package/http-exceptions/http-exception";
import { StatusCode } from "../../package/http-exceptions/http-status-code";
import hashPattern from "../../package/patterns/hash-pattern";
import { JwtPayload, sign } from "jsonwebtoken";
import { config } from "../../../prisma/config/config";

export class AuthRepository implements AuthInterface {
    private constructor(private readonly repository: PrismaClient) {}

    public static build(repository: PrismaClient) {
        return new AuthRepository(repository);
    }

    public async login(username: string, password: string): Promise<string> {
        const user = await this.repository.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new HttpException(
                "username ou senha incorretos",
                StatusCode.BAD_REQUEST
            );
        }

        const isPasswordValid = await hashPattern.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new HttpException(
                "username ou senha incorretos",
                StatusCode.BAD_REQUEST
            );
        }

        const payload = sign(
            {
                id: user.id,
                username: user.username,
                firstName: user.name,
                lastName: user.lastname,
                role: user.role,
                avatarUrl: user.avatarImageUrl,
            },
            config.secret,
            { expiresIn: "1d" }
        );

        return payload;
    }
}
