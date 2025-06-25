import { object, z } from "zod";
import dateGenerate from "../package/patterns/date-generate";
import { Status } from "../domain/enum/status.enum";

export const createOrderValidator = z.object({
    number: z.coerce
        .number()
        .min(1, { message: "O número do contrato deve ser maior que 0" }),
    local: z
        .string()
        .min(1, { message: "O local deve ser informado" })
        .nonempty({ message: "O local deve ser informado" }),
    schedulingDate: z.coerce.date().min(dateGenerate.now(), {
        message: "A data de agendamento deve ser maior que a data atual",
    }),
    schedulingTime: z
        .string()
        .min(1, { message: "O horário de agendamento deve ser informado" })
        .nonempty({ message: "O horário de agendamento deve ser informado" }),
    contact: z
        .string()
        .min(1, { message: "O contato deve ser informado" })
        .nonempty({ message: "O contato deve ser informado" }),
    price: z.coerce
        .number()
        .min(0.01, { message: "O preço deve ser maior que 0" }),
});

export const findOrderSchema = z.object({
    id: z
        .string()
        .min(1, { message: "O id deve ser informado" })
        .nonempty({ message: "O id deve ser informado" }),
});

export const updateOrderSchema = z.object({
    number: z.coerce
        .number()
        .min(1, { message: "O número do contrato deve ser maior que 0" }),
    local: z
        .string()
        .min(1, { message: "O local deve ser informado" })
        .nonempty({ message: "O local deve ser informado" }),
    price: z.coerce
        .number()
        .min(0.01, { message: "O preço deve ser maior que 0" }),
    contact: z
        .string()
        .min(1, { message: "O contato deve ser informado" })
        .nonempty({ message: "O contato deve ser informado" }),
});

export const updateStatusSchema = z.object({
    status: z.enum(["PENDENTE", "CONECTADO", "PENDENTE"]),
});

export const updateSchedulingSchema = z.object({
    schedulingDate: z.coerce.date().min(dateGenerate.now(), {
        message: "A data de agendamento deve ser maior que a data atual",
    }),
    schedulingTime: z
        .string()
        .min(1, { message: "O horário de agendamento deve ser informado" })
        .max(32, {
            message:
                "O horário de agendamento deve ter no máximo 32 caracteres",
        })
        .nonempty({ message: "O horário de agendamento deve ser informado" }),
});

export const listOrderSchema = z.object({
    page: z.coerce
        .number()
        .min(1, { message: "A página deve ser maior que 0" }),
    limit: z.coerce
        .number()
        .min(1, { message: "O limite deve ser maior que 0" }),
    status: z.enum(["PENDENTE", "CONECTADO", "PENDENTE"]).optional(),
    schedulingDateIn: z.coerce.date().optional(),
    schedulingDateOut: z.coerce.date().optional(),
    createdDateIn: z.coerce.date().optional(),
    createdDateOut: z.coerce.date().optional(),
});
