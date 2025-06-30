import { ApiExpress } from "./infra/api/express/api.express";
import { routes } from "./module/main.module";

function main() {
    const api = ApiExpress.build(routes);

    api.start(Number(process.env.PORT) || 8000);
}

main();
