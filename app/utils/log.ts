import LinkObject from "./link";

export default interface LogObject {
    id: string
    link_id: string    
    access_date: Date
    link: LinkObject    
}