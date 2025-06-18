import { InsightInterface } from "../../domain/interfaces/insight.interface";
import { Usecase } from "../usecase";

export type GetStatusInsightInputDto = {
    userId: string;
    dateIn: Date;
    dateOut: Date;
};

export type GetStatusInsightOutputDto = {
    connected: number;
    cancelled: number;
    pending: number;
};

export class GetStatusInsightUsecase
    implements Usecase<GetStatusInsightInputDto, GetStatusInsightOutputDto>
{
    private constructor(private readonly insightInterface: InsightInterface) {}

    public static build(insightInterface: InsightInterface) {
        return new GetStatusInsightUsecase(insightInterface);
    }

    public async execute(
        input: GetStatusInsightInputDto,
    ): Promise<GetStatusInsightOutputDto> {
        const { userId, dateIn, dateOut } = input;

        const insight = await this.insightInterface.getStatusInsight(
            userId,
            dateIn,
            dateOut,
        );

        return insight;
    }
}
