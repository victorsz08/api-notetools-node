import moment from "moment-timezone";

class DatePattern {
    public now(): Date {
        return moment.tz("America/Sao_Paulo").toDate();
    }

    public format(date: Date): string {
        return moment(date).format("YYYY-MM-DD hh:mm:ss");
    };


}

export default new DatePattern();
