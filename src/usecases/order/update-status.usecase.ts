import { Status } from "../../domain/enum/status.enum";
import { OrderInterface } from "../../domain/interfaces/order.interface";
import dateGenerate from "../../package/patterns/date-generate";
import { Usecase } from "../usecase";

export type UpdateStatusInputDto = {
    id: string;
    status: Status;
};

export type UpdateStatusOutputDto = void;

export class UpdateStatusUsecase
    implements Usecase<UpdateStatusInputDto, UpdateStatusOutputDto>
{
    private constructor(private readonly orderInterface: OrderInterface) {}

    public static build(orderInterface: OrderInterface) {
        return new UpdateStatusUsecase(orderInterface);
    }

    public async execute(input: UpdateStatusInputDto): Promise<void> {
        const { id, status } = input;
        const updatedAt = dateGenerate.now();

        await this.orderInterface.updateStatus(id, status, updatedAt);
        return;
    }
}
