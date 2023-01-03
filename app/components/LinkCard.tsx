import Link from 'next/link'
import LinkObject from '../utils/link'
import { DeleteLink } from '../utils/supabase'
import DatetimeToString from '../utils/helper'

type Props={ link:LinkObject, onDelete:any }

export default function LinkCard({link, onDelete}:Props ) {
    const deleteLink = async() => {
        const { data, error } = await DeleteLink( link.id! );
        if (error){
            alert("error deleting" + link.short_url);
        }
        if (data){
            onDelete(link.id);
        }
    }
    
    return (
        <div className="flex justify-center card-margin">

            <div className="block p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-sm">
                <Link href={`/${link.short_url}`} style={{color:'#009dff'}}>
                    <span className="text-xl leading-tight font-medium mb-2">{link.short_url}</span>
                </Link>
                {link.url!.length > 50 &&
                    <p className="text-xs mb-2 dark:text-white">{(link.url!.substring(45, 0)) + "..."}</p>
                }
                {link.url!.length <= 50 &&
                    <p className="text-xs mb-2 dark:text-white">{link.url}</p>
                }
                

                <div className="text-gray-700 dark:text-white text-base mb-4">
                    <p>{link.created == null ? "" : "Created: " + DatetimeToString(link.created)}</p>
                    <p>{link.expiration == null ? "" : "Expiration: " + DatetimeToString(link.expiration)}</p>
                    <button onClick={() => window.location.replace(`/links/analytics/${link.id}`)} className="
                        px-6
                        py-2.5
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                        button-margin">View Usage</button>
                    <button onClick={deleteLink} className="
                        px-6
                        py-2.5
                        bg-red-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-red-700 hover:shadow-lg
                        focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-red-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                        button-margin">Delete</button>
                    </div>
            </div>      
        </div>
    )
}

// export default LinkCard