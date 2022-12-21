"use client";

import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";

export default function GetLink( { params }: { params: any} ) {

    const [data, setData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<any>(null);

    useEffect(() => { 
        let done = false;
        const getLink = async() => {
            const {data, error} = await supabase
                .from("Links")
                .select()
                .eq('short_url', params.short_url);

            if (error) {
                setFetchError('An error occured')
                setData(null);
                console.log(error);
            }
            if (data) {
                setData(data);
                if (data.length > 0) {
                    // add log and redirect
                    const { } = await supabase
                        .from('Logs')
                        .insert({ link_id: data[0].id })                                          

                    window.location.replace(`${data[0].url}`);
                    setFetchError(null);
                }
                else {
                    setFetchError('Short URL does not exist')
                }
            }

        };

        getLink();
    }, []);

    return (            
        <div>
            {fetchError && (<p>{fetchError}</p>)}                
        </div>
    );    
}