import { z } from "zod";

export const createNoteSchema = z.object({
    title: z
        .string()
        .nonempty("o campo titulo é obrigatório")
        .max(32, "o campo titulo não pode conter mais que 32 caracteres"),
    content: z.string().nonempty("digite algo no campo conteúdo"),
});

export const findNoeSchema = z.object({
    id: z.string().nonempty("o parametro id é obrigatório"),
});

export const listNoteSchema = z.object({
    page: z.coerce
        .number()
        .min(1, "o parametro pagina deve ser maior que 0")
        .default(1),
    limit: z.coerce
        .number()
        .min(1, "o parametro limite deve ser maior que 0")
        .default(10),
});

export const updateNoteSchema = z.object({
    title: z
        .string()
        .nonempty("o campo titulo é obrigatório")
        .max(32, "o campo titulo não pode conter mais que 32 caracteres"),
    content: z.string().nonempty("digite algo no campo conteúdo"),
});
