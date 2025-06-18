export type GetInsightDto = {
    revenue: number;
    sales: number;
    completionRate: number;
};

export type GetStatusInsightDto = {
    connected: number;
    cancelled: number;
    pending: number;
};

export type GetInsightPerDayDto = {
    sales: {
        day: Date;
        quantity: number;
    }[];
};

export interface InsightInterface {
    getInsight(
        userId: string,
        dateIn: Date,
        dateOut: Date,
    ): Promise<GetInsightDto>;
    getStatusInsight(
        userId: string,
        dateIn: Date,
        dateOut: Date,
    ): Promise<GetStatusInsightDto>;
    getInsightPerDay(
        userId: string,
        dateIn: Date,
        dateOut: Date,
    ): Promise<GetInsightPerDayDto>;
}
