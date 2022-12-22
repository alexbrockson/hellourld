"use client";

import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import LinkObject from '../../utils/link'
import LinkCard from "../../components/LinkCard";

export default function GetLink( { params }: { params: any} ) {
    const [data, setData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<any>(null);

    const deleteLink = () => {
        window.location.assign('./');
    }

    useEffect(() => { 
        const getLink = async() => {
            const {data, error} = await supabase
                .from("Links")
                .select()
                .eq('id', params.id);

            if (error) {
                setFetchError('Could not fetch links')
                setData(null);
                console.log(error);
            }
            if (data) {
                setData(data);
                setFetchError(null);
            }

        };

        getLink();
    }, []);

    return (            
        <>            
            <div className="center">
                {fetchError && (<p>{fetchError}</p>)}
                {data && (
                    <div>
                        {data.map((link: LinkObject) => (     
                            <>
                                <LinkCard key={link.id} link={link} onDelete={deleteLink}/>
                            </>                       
                        ))}
                    </div>
                )}
            </div>
        </>
    );  
}