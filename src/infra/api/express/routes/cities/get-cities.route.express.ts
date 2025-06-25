import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../route.express";
import { Logger } from "../../../../../middleware/logger";

export class GetCitiesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod
    ) {}

    public static build() {
        return new GetCitiesRoute("/cities", HttpMethod.GET);
    }
    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const data = await fetch(
                "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome"
            );
            const json = await data.json();

            const output: string[] = json.map((city: any) => {
                return `${city?.nome} / ${city?.microrregiao?.mesorregiao?.UF?.sigla}`;
            });

            return res.status(200).json(output);
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
