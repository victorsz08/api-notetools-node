import { z } from "zod";

export const authLoginSchema = z.object({
    username: z.string().nonempty("preencha o campo username"),
    password: z.string().nonempty("preencha o campo password"),
});
