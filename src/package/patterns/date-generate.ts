import moment from "moment-timezone";

class DatePattern {
    public generate(): Date {
        return moment.tz("America/Sao_Paulo").toDate();
    }

    public toString(date: Date): string {
        return moment(date).format("YYYY-MM-DD");
    }
}

export default new DatePattern();
