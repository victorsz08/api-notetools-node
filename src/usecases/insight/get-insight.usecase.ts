import { InsightInterface } from "../../domain/interfaces/insight.interface";
import { Usecase } from "../usecase";

export type GetInsightInputDto = {
    userId: string;
    dateIn: Date;
    dateOut: Date;
};

export type GetInsightOuputDto = {
    revenue: number;
    sales: number;
    completionRate: number;
};

export class GetInsightUsecase
    implements Usecase<GetInsightInputDto, GetInsightOuputDto>
{
    private constructor(private readonly insightInterface: InsightInterface) {}

    public static build(insightInterface: InsightInterface) {
        return new GetInsightUsecase(insightInterface);
    }

    public async execute(
        input: GetInsightInputDto,
    ): Promise<GetInsightOuputDto> {
        const { userId, dateIn, dateOut } = input;

        const data = await this.insightInterface.getInsight(
            userId,
            dateIn,
            dateOut,
        );
        return data;
    }
}

export class GetTrendingInsightUsecase
    implements
        Usecase<
            { userId: string },
            {
                sales: { previous: number; last: number; trend: number };
                revenue: { previous: number; last: number; trend: number };
                completionRate: {
                    previous: number;
                    last: number;
                    trend: number;
                };
            }
        >
{
    private constructor(private readonly insightInterface: InsightInterface) {}

    public static build(insightInterface: InsightInterface) {
        return new GetTrendingInsightUsecase(insightInterface);
    }

    public async execute(input: { userId: string }) {
        return this.insightInterface.getTrendingInsight(input.userId);
    }
}
