import { z } from "zod";
import { Role } from "../domain/enum/role.enum";

export const recoveryPasswordSchema = z.object({
    id: z.string().nonempty("id do usuário é obrigatório"),
});

export const grantedUserAccessSchema = z.object({
    role: z.nativeEnum(Role, {
        required_error: "role do usuário é obrigatório",
    }),
});
