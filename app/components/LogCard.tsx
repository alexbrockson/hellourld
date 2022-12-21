import Log, { DatetimeToString } from '../utils/log'

type Props={ log:Log }

export default function LogCard({log }:Props ) {
    return (
        <div>
            <p>{log.access_date == null ? "" : DatetimeToString(log.access_date)}</p>            
        </div>
    )
}