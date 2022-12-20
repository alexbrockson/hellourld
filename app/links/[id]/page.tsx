"use client";

import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import LinkObject, { DatetimeToString } from '../../utils/link'

export default function GetLink( { params }: { params: any} ) {

    const [data, setData] = useState<any>(null);

    useEffect(() => { 
        const getData = async() => {
            const {data: supabaseData, error} = await supabase
                .from("Links")
                .select()
                .eq('id', params.id);
            console.log({data, error});            
            setData(supabaseData);
        };

        getData();       

    }, []);

    return (            
        <div>            
            <div>
                {data?.map((link: LinkObject) => (
                    <Lnk key={link.id} link={link} />
                ))}
            </div>
        </div>
    );  

}

function Lnk({ link }: { link: LinkObject}) {
    return (
        <div>
            <h1>/links/{link.id}</h1>
            <div>
                <h2>{link.short_url}</h2>
                <h4>{link.url}</h4>
                <p>{link.created == null ? "" : DatetimeToString(link.created)}</p>
                <p>{link.expiration == null ? "" : DatetimeToString(link.expiration)}</p>
            </div>
        </div>
    );
}