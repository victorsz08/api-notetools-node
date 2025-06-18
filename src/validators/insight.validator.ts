import { z } from "zod";
import dateGenerate from "../package/patterns/date-generate";

export const getInsightSchema = z.object({
    userId: z.string().nonempty("o parametro id do usuario é obirgatorio"),
    dateIn: z.coerce.date(),
    dateOut: z.coerce.date().transform((date) => {
        return dateGenerate.addDays(date, 1);
    }),
});
