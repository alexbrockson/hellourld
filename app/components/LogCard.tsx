import Log from '../utils/log'
import DatetimeToString from '../utils/helper'

type Props={ log:Log }

export default function LogCard({log }:Props ) {
    return (
        <li className="px-6 py-2 border-b border-gray-200 w-full">{log.access_date == null ? "" : DatetimeToString(log.access_date)}</li>            
    )
}