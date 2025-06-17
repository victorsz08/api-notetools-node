import { OrderEntity } from "../entities/order.entity";
import { Status } from "../enum/status.enum";

export type ListOrderOutput = {
    orders: OrderEntity;
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
};

export interface OrderInterface {
    create(order: OrderEntity): Promise<void>;
    find(id: string): Promise<OrderEntity>;
    list(
        page: number,
        limit: number,
        userId: string,
        schedulingDateIn?: Date,
        schedulingDateOut?: Date,
        createdDateIn?: Date,
        createdDateOut?: Date,
        status?: Status,
    ): Promise<ListOrderOutput>;
    update(
        id: string,
        number: number,
        local: string,
        price: number,
        contact: string,
        updatedAt: Date,
    ): Promise<void>;
    updateStatus(id: string, status: Status, updatedAt: Date): Promise<void>;
    updateScheduling(
        id: string,
        schedulingDate: Date,
        schedulingTime: string,
        updatedAt: Date,
    ): Promise<void>;
    delete(id: string): Promise<void>;
}
