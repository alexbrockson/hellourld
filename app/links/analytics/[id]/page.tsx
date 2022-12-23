"use client";

import { useState, useEffect } from "react";
import { GetLogs } from "../../../utils/supabase";
import LogObject from "../../../utils/log";
import DatetimeToString from "../../../utils/helper";
import LogCard from "../../../components/LogCard";

export default function GetLink( { params }: { params: any} ) {
    const [data, setData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<any>(null);

    useEffect(() => { 
        const getLogs = async() => {
            const {data, error} = await GetLogs(params.id)
            if (error) {
                setFetchError('Could not fetch logs')
                setData(null);
                console.log(error);
            }
            if (data) {
                setData(data);
                setFetchError(null);
            }
        };

        getLogs();
    }, []);

    return (            
        <div className="center">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Usage</h5>
                {fetchError && (<p>{fetchError}</p>)}
                {data && (
                    <div>
                        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-gray-900">This link has been visited {data.length} times.</h5>
                        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-gray-900">{data.length ? `Most recent access: ${DatetimeToString(data[0].access_date)}` : ""}</h5>              
                        <br/>
                        <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-gray-900">{data.length ? 'Visits:' : ""}</h6>
                        <ul className="bg-white rounded-lg w-96 text-gray-900">
                        {data.map((log: LogObject) => (                            
                            <LogCard key={log.id} log={log} />
                        ))}
                        </ul>
                    </div>
                )}
        </div>
    );  
}