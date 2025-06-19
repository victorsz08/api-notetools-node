import { z } from "zod";
import dateGenerate from "../package/patterns/date-generate";

export const getInsightSchema = z.object({
    dateIn: z.coerce.date().transform((date) => {
        return dateGenerate.transform(date);
    }),
    dateOut: z.coerce.date().transform((date) => {
        return dateGenerate.addDays(date, 1);
    }),
});
