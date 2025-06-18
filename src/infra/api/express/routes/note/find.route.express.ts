import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";
import { FindNoteUsecase } from "../../../../../usecases/note/find.usecase";
import { findNoeSchema } from "../../../../../validators/note.validator";
import { HttpMethod, Route } from "../route.express";
import { Request, Response, NextFunction } from "express";

export class FindNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findNoteUsecase: FindNoteUsecase,
    ) {}

    public static build(findNoteUsecase: FindNoteUsecase) {
        return new FindNoteRoute("/notes/:id", HttpMethod.GET, findNoteUsecase);
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { id } = req.params;
            const input = findNoeSchema.parse({ id });

            const note = await this.findNoteUsecase.execute(input);
            return res.status(200).json(note);
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
        next: NextFunction,
    ) => Promise<any>)[] {
        return [Logger(), ValidateSchema(findNoeSchema)];
    }
}
