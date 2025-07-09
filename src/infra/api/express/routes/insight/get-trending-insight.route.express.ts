import { NextFunction, Request, Response } from "express";
import { GetTrendingInsightUsecase } from "../../../../../usecases/insight/get-insight.usecase";
import { HttpMethod, Route } from "../route.express";
import { Logger } from "../../../../../middleware/logger";
import { verify } from "jsonwebtoken";
import { config } from "../../../../../../prisma/config/config";
import { UserDto } from "../../../../../package/mapper/user-mapper";

export class GetTrendingInsightRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getTrendingInsightUsecase: GetTrendingInsightUsecase
    ) {}

    public static build(getTrendingInsightUsecase: GetTrendingInsightUsecase) {
        return new GetTrendingInsightRoute(
            "/insights/trending",
            HttpMethod.GET,
            getTrendingInsightUsecase
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const token = req.cookies["nt.authtoken"];
            const decodedToken = verify(token, config.secret) as UserDto;
            const userId = decodedToken.id;

            const data = await this.getTrendingInsightUsecase.execute({ userId });
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
        return [Logger()];
    }
} 