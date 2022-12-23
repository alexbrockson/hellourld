import { Dayjs } from 'dayjs';
import { createClient, PostgrestError } from '@supabase/supabase-js'
import LinkObject from './link';

const supabase = createClient (
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const GetLinks = async() =>  {    
    let { data, error } = await supabase
        .from('Links')
        .select()
        .order('created', { ascending: false })
    return { data, error }
}

const GetLink = async( short_url: string ) => {    
    let { data, error } = await supabase
        .from("Links")
        .select()
        .eq('short_url', short_url)
        .single();
    return { data, error }
}

async function InsertLink( payload:LinkObject )  {
    const { data, error } = await supabase
        .from('Links')
        .insert({url:payload.url, short_url:payload.short_url, expiration:payload.expiration}) // link deletion on expiration is being handled in supabase db by minutely CRON job                 
        .select()
        .single()
    return { data, error }
}

async function UpdateLink( payload:LinkObject )  {
    const { data, error } = await supabase
        .from('Links')
        .update({ "short_url": payload.short_url })                 
        .eq('id', payload.id)
        .select()
        .single()
    return { data, error }
}

async function DeleteLink( id:string ) {
    const { data, error } = await supabase
        .from("Links")
        .delete()
        .eq("id", id)
        .select()
    return { data, error }
}

async function DeleteLinkByShortURL( short_url:string ) {
    const {data, error} = await GetLink(short_url);
    if (data !== null) {
        return await DeleteLink(data.id);
    }
    return { data, error }
}

const LogVisit = async( short_url: string ) => {   
    const {data, error} = await GetLink(short_url);
    if (data != null) {
        await InsertLog(data);
    }
    return { data, error }
}

async function InsertLog( payload:LinkObject )  {
    let { data, error } = await supabase
            .from('Logs')
            .insert({ link_id:payload.id })
            .select()
            .single()
    return { data, error }
}

const CreateNewLink = async ( payload:LinkObject ) => {    
    let short_url = payload.short_url?.trim();    
    if (short_url?.length === 0) {
        // if short_url is empty, submit new url and then return id to use for short_url
        const {data, error} = await InsertLink(payload)
        // use id to create short_url
        if (data != null){
            let id = data.id.toString();
            var newID = data.id.toString();
            var n = newID.toString().lastIndexOf('-');
            payload.short_url = newID.toString().substring(n + 1);
            payload.id = data.id;
                
            // now update link with newly created short_url
            return await UpdateLink(payload)
        }
    }
    // need to validate to ensure short_url doesn't already exist
    const {data, error} = await GetLink(short_url!);
    if (data === null){
        // short_url is not taken, create new record
        const {data, error} = await InsertLink(payload)
        return { data, error }
    }
    return { data, error }
}

const GetLogs = async( short_url: string ) => {   
    console.log('short_url', short_url);
    const {data, error} = await GetLink(short_url);
    console.log(data);
    if (data !== null) {
        return await GetLogsForID(data.id, true);
    }
    return { data, error }
}

const GetLogsForID = async( link_id: string, includeLinks:boolean=false ) => {    
    return await supabase
        .from("Logs")
        .select(includeLinks ? '*,Links(*)' : '*')
        .eq('link_id', link_id)
        .order('access_date', { ascending: false });
}

const GetAllLogs = async() =>  {    
    let { data, error } = await supabase
        .from('Logs')
        .select('*,Links(*)')
        .order('access_date', { ascending: false })
    return { data, error }
}


export { GetLink, CreateNewLink, GetLinks, DeleteLink, DeleteLinkByShortURL, LogVisit, GetLogs, GetAllLogs, GetLogsForID }