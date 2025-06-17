import { OrderEntity } from "../../domain/entities/order.entity";
import dateGenerate from "../patterns/date-generate";

export type OrderDto = {
    id: string;
    number: number;
    local: string;
    schedulingDate: string;
    schedulingTime: string;
    price: number;
    contact: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

class OrderMapper {
    public toDto(order: OrderEntity): OrderDto {
        return {
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: dateGenerate.format(order.schedulingDate),
            schedulingTime: order.schedulingTime,
            price: order.price,
            contact: order.contact,
            status: order.status,
            createdAt: dateGenerate.format(order.createdAt),
            updatedAt: dateGenerate.format(order.updatedAt),
        };
    }
}

export default new OrderMapper();
