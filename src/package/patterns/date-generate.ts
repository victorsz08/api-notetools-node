import moment from "moment-timezone";

class DatePattern {
    public now(): Date {
        return moment.tz("America/Sao_Paulo").toDate();
    }

    public format(date?: Date): string {
        return moment(date).format("YYYY-MM-DD hh:mm:ss");
    }

    public transform(date?: Date): Date {
        return moment(date).tz("America/Sao_Paulo").startOf("day").toDate();
    }

    public addDays(date?: Date, days?: number): Date {
        return moment(date)
            .tz("America/Sao_Paulo")
            .startOf("day")
            .add(days, "days")
            .toDate();
    }
}

export default new DatePattern();
