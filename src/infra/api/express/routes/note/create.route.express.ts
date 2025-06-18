import { NextFunction, Request, Response } from "express";
import { CreateNoteUsecase } from "../../../../../usecases/note/create.usecase";
import { HttpMethod, Route } from "../route.express";
import { createNoteSchema } from "../../../../../validators/note.validator";
import { Logger } from "../../../../../middleware/logger";
import { ValidateSchema } from "../../../../../middleware/validate-schemas";

export class CreateNoteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createNoteUsecase: CreateNoteUsecase,
    ) {}

    public static build(createNoteUsecase: CreateNoteUsecase) {
        return new CreateNoteRoute(
            "/notes/:userId",
            HttpMethod.POST,
            createNoteUsecase,
        );
    }

    public getHandler(): (req: Request, res: Response) => Promise<any> {
        return async (req: Request, res: Response) => {
            const { userId } = req.params;
            const body = req.body;

            const input = createNoteSchema.parse({ userId, ...body });
            const note = await this.createNoteUsecase.execute(input);

            return res.status(201).json(note);
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
        return [Logger(), ValidateSchema(createNoteSchema)];
    }
}
