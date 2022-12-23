import { Dayjs } from 'dayjs';
export default interface LinkObject {
    id?: string | null
    url?: string | null
    short_url?: string | null
    expiration?: Dayjs | null
    created?: Date
}