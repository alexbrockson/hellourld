import LinkObject from "./link";

export default interface LogObject {
    id: string
    link_id: string    
    access_date: Date
    link: LinkObject    
}

export function DatetimeToString(s: any) {
    let b = s.split(/\D/);
    return 'Date: ' + b[0] + '-' + b[1] + '-' + b[2] + ' Time: ' +
           b[3] + ':' + b[4];
}