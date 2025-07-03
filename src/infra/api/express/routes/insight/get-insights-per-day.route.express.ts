import { NextFunction, Request, Response } from "express";
import { GetInsightPerDayUsecase } from "../../../../../usecases/insight/get-insight-per-day.usecase";
import { HttpMethod, Route } from "../route.express";
import { getInsightSchema } from "../../../../../validators/insight.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";
import { verify } from "jsonwebtoken";
import { config } from "../../../../../../prisma/config/config";
import { UserDto } from "../../../../../package/mapper/user-mapper";

export class GetInsightPerDayRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getInsightPerDayUsecase: GetInsightPerDayUsecase
    ) {}

    public static build(getInsightPerDayUsecase: GetInsightPerDayUsecase) {
        return new GetInsightPerDayRoute(
            "/insights/per-day",
            HttpMethod.GET,
            getInsightPerDayUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const query = req.query;
            const token = req.cookies["nt.authtoken"];
            const decodedToken = verify(token, config.secret) as UserDto;
            const userId = decodedToken.id;

            const input = getInsightSchema.parse(query);
            const data = await this.getInsightPerDayUsecase.execute({
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
