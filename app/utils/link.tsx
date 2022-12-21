export default interface LinkObject {
    id: string
    url: string
    short_url: string
    expiration: Date
    created: Date
}

export function DatetimeToString(s: any) {
    let b = s.split(/\D/);
    return 'Date: ' + b[0] + '-' + b[1] + '-' + b[2] + ' Time: ' +
           b[3] + ':' + b[4];
}