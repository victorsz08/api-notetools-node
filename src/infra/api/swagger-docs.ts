import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API NoteTools Documentação",
            version: "2.0.0",
            description: "Documentação de rotas da API Notetools",
        },
        servers: [
            {
                url: "http://localhost:8001",
                description: "Servidor de desenvolvimento",
            },
        ],
    },
    apis: ["./src/infra/api/express/routes/**/*.ts"],
};

export const specs = swaggerJsdoc(options);
