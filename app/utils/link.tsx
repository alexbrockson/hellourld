export default interface Link {
    id: string
    url: string
    short_url: string
    expiration: Date
    created: Date
}

export function DatetimeToString(s: any) {
    let b = s.split(/\D/);
    return b[0] + '-' + b[1] + '-' + b[2] + 'T' +
           b[3] + ':' + b[4] + ':' + b[5] + '.' +
           b[6].substr(0,3) + '+00:00';
}