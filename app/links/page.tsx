"use client"

import Link from 'next/link'
// import { createClient } from '@supabase/supabase-js'
import supabase from '../utils/supabase'
import { useEffect, useState } from 'react';
// import { SupabaseClient } from '@supabase/supabase-js'

// export const supabaseUrl = process.env.SUPABASE_URL
// export const supabaseKey = process.env.SUPABASE_KEY
// // const supabaseUrl = "https://zaeftioepwoangxkukvc.supabase.co"
// // const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZWZ0aW9lcHdvYW5neGt1a3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0NDc5NTIsImV4cCI6MTk4NzAyMzk1Mn0.0E6hFfeilDx6eXxPuPSHClvkv6M9rzXT69-5_YGwLxA"
// // const supabase = createClient(supabaseUrl, supabaseKey)
// export const supabase = createClient(supabaseUrl, supabaseKey)

// type Link = {
//     id: string
//     url: string
//     short_url: string
//     expiration: Date
//     created: Date
// }
export default function Links() {
    const [data, setData] = useState<any>(null);

    useEffect(() => { 
        const getData = async() => {
            const {data: supabaseData, error} = await supabase.from("Links").select();
            console.log({data, error});
            setData(supabaseData);
        };

        getData();
    }, []);

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// export async function getLinks() {
//     // const res = await fetch(
//     //     'http://127.0.0.1:8090/api/collections/links/records?page=1&perPage=30',
//     //     { cache: 'no-store'}
//     // );
//     // const data = await res.json();
//     const { data } = await supabase
//         .from('Links')
//         .select('*');
//         // console.log(data);
//     return {
//         props: {
//             links: data
//         }
        
//     }
// }

// export default function LinksPage({ links }: {links: Link[] }) {
//     // const links = await getLinks();
//     // const links = LINKS;

//     return(
//         <div>
//             <h1>Links</h1>
//             <div>
//                 {links?.map((link) => (
//                     <Lnk key={link.id} link={link} />
//                 ))}
//             </div>
//         </div>
//     )
// }



// function Lnk({ link }: { link: Link}) {
//     // const { id, url, short_url, created, expiration } = link || {};

//     return (
//         <Link href={`/links/${link.id}`}>
//             <div>
//                 <h2>{link.short_url}</h2>
//                 <h4>{link.url}</h4>
//                 <p>{link.created.toDateString()}</p>
//                 <p>{link.expiration.toDateString()}</p>
//             </div>
//         </Link>
//     );
// }