import Link from 'next/link'
import LinkObject, { DatetimeToString } from '../utils/link'
import supabase from '../utils/supabase'

type Props={ link:LinkObject, onDelete:any }

export default function LinkCard({link, onDelete}:Props ) {
    
    const deleteLink = async() => {
        const { data, error } = await supabase
            .from("Links")
            .delete()
            .eq("id", link.id)
            .select()
        if (error){
            alert("error deleting" + link.short_url);
        }
        if (data){
            alert("deleted " + link.short_url);
            onDelete(link.id);
        }
    }
    
    return (
        <div>
            <Link href={`/links/${link.id}`}>
                <h2>{link.short_url}</h2>
                <h4>{link.url}</h4>
                <p>{link.created == null ? "" : DatetimeToString(link.created)}</p>
                <p>{link.expiration == null ? "" : DatetimeToString(link.expiration)}</p>
            </Link>
            <Link href={`/links/analytics/${link.id}`} style={{color:'#009dff'}}>
                View Usage
            </Link>
            <br/><br/>
            <button onClick={deleteLink}>Delete</button>
        </div>
    )
}

// export default LinkCard