import dayjs from "dayjs";

export default function DatetimeToString(s: any) {
    return dayjs(s).format('MMMM D YYYY - hh:mm A') 
}