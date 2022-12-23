"use client";

import { useState, useEffect } from "react";
import { LogVisit } from '../utils/supabase'

export default function GetLink( { params }: { params: any} ) {

    const [data, setData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<any>(null);

    useEffect(() => { 

        const getLink = async() => {
            const { data, error } = await LogVisit(params.short_url)
            if (error) {
                // setFetchError(`Could not fetch link: ${error.message}`)
                setFetchError("Link provided does not exist.")
                setData(null);
                console.log(error);
            }
            if (data) {
                setData(data);
                setFetchError(null);
                window.location.replace(`${data.url}`);
            }
        };        
        getLink();
    }, []);

    return (            
        <div className="center">
            {fetchError && (<p>{fetchError}</p>)}                
        </div>
    );    
}