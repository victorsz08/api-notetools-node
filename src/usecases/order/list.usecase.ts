import { Status } from "../../domain/enum/status.enum";
import { OrderInterface } from "../../domain/interfaces/order.interface";
import orderMapper, { OrderDto } from "../../package/mapper/order-mapper";
import { Usecase } from "../usecase";

export type ListOrderInputDto = {
    page: number;
    limit: number;
    userId: string;
    schedulingDateIn?: Date;
    schedulingDateOut?: Date;
    createdDateIn?: Date;
    createdDateOut?: Date;
    status?: Status;
};

export type ListOrderOutputDto = {
    orders: OrderDto[];
    totalPages: number;
    totalItems: number;
    page: number;
    limit: number;
};

export class ListOrderUsecase
    implements Usecase<ListOrderInputDto, ListOrderOutputDto>
{
    private constructor(private readonly orderInterface: OrderInterface) {}

    public static build(orderInterface: OrderInterface) {
        return new ListOrderUsecase(orderInterface);
    }

    public async execute(
        input: ListOrderInputDto,
    ): Promise<ListOrderOutputDto> {
        const {
            page,
            limit,
            userId,
            createdDateIn,
            createdDateOut,
            schedulingDateIn,
            schedulingDateOut,
            status,
        } = input;

        const data = await this.orderInterface.list(
            page,
            limit,
            userId,
            schedulingDateIn,
            schedulingDateOut,
            createdDateIn,
            createdDateOut,
            status,
        );

        const output: ListOrderOutputDto = {
            orders: data.orders.map((order) => {
                return orderMapper.toDto(order);
            }),
            page: data.page,
            limit: data.limit,
            totalItems: data.totalItems,
            totalPages: data.totalPages,
        };

        return output;
    }
}
