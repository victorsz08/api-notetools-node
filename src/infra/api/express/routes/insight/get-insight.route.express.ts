import { NextFunction, Request, Response } from "express";
import { GetInsightUsecase } from "../../../../../usecases/insight/get-insight.usecase";
import { HttpMethod, Route } from "../route.express";
import { getInsightSchema } from "../../../../../validators/insight.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";
import { verify } from "jsonwebtoken";
import { config } from "../../../../../../prisma/config/config";
import { UserDto } from "../../../../../package/mapper/user-mapper";

export class GetInsightRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getInsightUsecase: GetInsightUsecase
    ) {}

    public static build(getInsightUsecase: GetInsightUsecase) {
        return new GetInsightRoute(
            "/insights/:userId",
            HttpMethod.GET,
            getInsightUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const query = req.query;
            const token = req.cookies["nt.authtoken"];
            const decodedToken = verify(config.secret, token) as UserDto;
            const userId = decodedToken.id;

            const input = getInsightSchema.parse(query);
            const data = await this.getInsightUsecase.execute({
                ...input,
                userId,
            });

            return res.status(200).json(data);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getMiddlewares(): ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>)[] {
        return [Logger(), ValidateSchema(getInsightSchema, "query")];
    }
}
