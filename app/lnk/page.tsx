"use client";

import supabase from '../utils/supabase'
import LinkObject from '../utils/link'
import { useEffect, useState } from 'react';

import LinkCard from '../components/LinkCard';

export default function Links() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<any>(null);

    const deleteLink = (id: string) => {
        setData((prevLinks: LinkObject[]) => {
            return prevLinks.filter(l => l.id !== id)
        })
    }

    useEffect(() => { 
        setLoading(true);
        const getLinks = async() => {
            const {data, error} = await supabase
                .from("Links")
                .select();

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

        getLinks();
    }, []);

    return (            
        <div>
            <h1>Links</h1>
            <div>
                {fetchError && (<p>{fetchError}</p>)}
                {data && (
                    <div>
                        {data.map((link: LinkObject) => (                            
                            <LinkCard key={link.id} link={link} onDelete={deleteLink}/>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );    
}