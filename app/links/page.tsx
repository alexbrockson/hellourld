"use client";

import { GetLinks } from '../utils/supabase'
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

        const getLinks = async() => {
            const { data, error } = await GetLinks()
            if (error) {
                setFetchError(`Could not fetch links: ${error.message}`)
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
        <div className="center">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Links</h5>
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