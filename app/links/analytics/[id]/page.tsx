"use client";

import { useState, useEffect } from "react";
import supabase from "../../../utils/supabase";
import LogObject, { DatetimeToString } from "../../../utils/log";
import LogCard from "../../../components/LogCard";

export default function GetLink( { params }: { params: any} ) {
    const [data, setData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<any>(null);

    useEffect(() => { 
        const getLogs = async() => {
            const {data, error} = await supabase
                .from("Logs")
                .select()
                .eq('link_id', params.id)
                .order('access_date', { ascending: false });

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
        <div>
        <h1>Usage</h1>
        <div>
            {fetchError && (<p>{fetchError}</p>)}
            {data && (
                <div>
                    <h4>This link has been visited {data.length} times.</h4>
                    <h4>{data.length ? `Most recent access: ${DatetimeToString(data[0].access_date)}` : ""}</h4>              
                    <h4>{data.length ? 'Visits:' : ""}</h4>                    
                    {data.map((log: LogObject) => (                            
                        <LogCard key={log.id} log={log} />
                    ))}
                </div>
            )}
        </div>
    </div>
    );  
}