import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route.express";
import CookieParser from "cookie-parser";
import { HttpHandlerError } from "../../../middleware/http-handler-error";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../../../swagger.json";
import helmet from "helmet";

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(
            cors({
                origin: process.env.ORIGIN,
                allowedHeaders: ["Content-Type", "application/json"],
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            })
        );

        this.app.use(helmet());
        this.app.use(
            rateLimit({
                windowMs: 5 * 60 * 1000, // 5min,
                limit: 100,
                standardHeaders: "draft-8",
                legacyHeaders: false,
            })
        );

        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocs)
        );

        this.app.use(express.json());
        this.app.use(CookieParser());

        this.addRoutes(routes);
        this.app.use(HttpHandlerError);

        this.routeLogs(routes);
    }

    public static build(routes: Route[]) {
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const method = route.getMethod();
            const handler = route.getHandler();
            const path = route.getPath();
            const middlewares = route.getMiddlewares();

            this.app[method](path, ...middlewares, handler);
        });
    }

    private routeLogs(routes: Route[]) {
        routes.forEach((route) => {
            const method = route.getMethod().toUpperCase();
            const path = route.getPath();
            const middlewares = route
                .getMiddlewares()
                .map((mw) => mw.name || "anonymous");

            console.log(`"\x1b[32m[ [${method}] ${path}  ]\x1b[0m"`);
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log("http server is running in port: ", port);
        });
    }
}
