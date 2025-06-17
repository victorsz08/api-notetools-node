
export type Status = "PENDENTE" | "CONECTADO" | "CANCELADO"

export const Status = {
    PENDING: "PENDENTE" as Status,
    CONECTED: "CONECTADO" as Status,
    CANCELLED: "CANCELADO" as Status
} as const;