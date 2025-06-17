import { z } from "zod";

export const createUserSchema = z.object({
    username: z
        .string()
        .min(4, "O nome de usuário deve ter no mínimo 4 caracteres")
        .max(20, "O nome de usuário deve ter no máximo 20 caracteres"),
    firstName: z
        .string()
        .min(4, "O nome deve ter no mínimo 4 caracteres")
        .max(20, "O nome deve ter no máximo 20 caracteres"),
    lastName: z
        .string()
        .min(4, "O sobrenome deve ter no mínimo 4 caracteres")
        .max(20, "O sobrenome deve ter no máximo 20 caracteres"),
    password: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .max(20, "A senha deve ter no máximo 20 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
        ),
});

export const findUserSchema = z.object({
    id: z.string().nonempty("O id é obrigatório"),
});

export const listUserSchema = z.object({
    page: z.coerce.number().min(1, "A página deve ser maior que 0").default(1),
    limit: z.coerce
        .number()
        .min(1, "O limite deve ser maior que 0")
        .default(10),
    search: z.string().optional(),
});

export const updateUserSchema = z.object({
    id: z.string().nonempty("O id é obrigatório"),
    username: z
        .string()
        .min(4, "O nome de usuário deve ter no mínimo 4 caracteres")
        .max(20, "O nome de usuário deve ter no máximo 20 caracteres"),
    firstName: z
        .string()
        .min(4, "O nome deve ter no mínimo 4 caracteres")
        .max(20, "O nome deve ter no máximo 20 caracteres"),
    lastName: z
        .string()
        .min(4, "O sobrenome deve ter no mínimo 4 caracteres")
        .max(20, "O sobrenome deve ter no máximo 20 caracteres"),
});

export const updatePasswordSchema = z.object({
    id: z.string().nonempty("O id é obrigatório"),
    currentPassword: z.string().nonempty("A senha atual é obrigatória"),
    newPassword: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .max(20, "A senha deve ter no máximo 20 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
        ),
});
