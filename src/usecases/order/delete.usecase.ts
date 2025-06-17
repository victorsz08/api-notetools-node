import { OrderInterface } from "../../domain/interfaces/order.interface";
import { Usecase } from "../usecase";

export type DeleteOrderInputDto = {
    id: string;
};

export type DeleteOrderOutputDto = void;

export class DeleteOrderUsecase
    implements Usecase<DeleteOrderInputDto, DeleteOrderOutputDto>
{
    private constructor(private readonly orderInterface: OrderInterface) {}

    public static build(orderInterface: OrderInterface) {
        return new DeleteOrderUsecase(orderInterface);
    }

    public async execute(input: DeleteOrderInputDto): Promise<void> {
        const { id } = input;

        await this.orderInterface.delete(id);

        return;
    }
}
