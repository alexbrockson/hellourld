"use client";

import Link from 'next/link'
import supabase from '../utils/supabase'
import LinkObject, { DatetimeToString } from '../utils/link'
import { useEffect, useState } from 'react';

export default function Links() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { 
        setLoading(true);
        const getData = async() => {
            const {data: supabaseData, error} = await supabase.from("Links").select();
            setData(supabaseData);
            setLoading(false);
        };

        getData();
    }, []);

    return (            
        <div>
            <h1>Links</h1>
            <div>
                {(data != null && data.length > 0) ? data?.map((link: LinkObject) => (
                    <Lnk key={link.id} link={link} />
                )) : ((loading) ? <p>loading...</p> : <p>no links yet!</p>)}
            </div>
        </div>
    );    
}

function Lnk({ link }: { link: LinkObject}) {
    return (
        <Link href={`/links/${link.id}`}>
            <div>
                <h2>{link.short_url}</h2>
                <h4>{link.url}</h4>
                <p>{link.created == null ? "" : DatetimeToString(link.created)}</p>
                <p>{link.expiration == null ? "" : DatetimeToString(link.expiration)}</p>
            </div>
        </Link>
    );
}