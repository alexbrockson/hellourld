'use client';

import supabase from '../utils/supabase'
import { useEffect, useState } from 'react';
// import "react-datepicker/dist/react-datepicker.css";

export default function CreateLink() {
    const [errorText, setError] = useState('')
    const [shorturl, setShortURL] = useState('');
    const [url, setURL] = useState('');

    const create = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // first confirm that URL isn't empty
            if (url.length) {
                if (shorturl.length == 0) {
                    // if shorturl is empty, submit new url and then return id to use for shorturl                
                    const { data, error } = await supabase
                        .from('Links')
                        .insert({ url: url })                 
                        .select('id')
                        .single()                                
                    if (error) {
                        setError(error.message) 
                        return true;
                    }
                    else {
                        // use id to create shorturl
                        var newID = data.id.toString();
                        var n = newID.toString().lastIndexOf('-');
                        var newShortUrl = newID.toString().substring(n + 1);

                        // update the record we just inserted
                        const { data: short, error: error2 } = await supabase
                            .from('Links')
                            .update({ "short_url": newShortUrl })                 
                            .eq('id', newID)
                            .select('short_url')
                        if (error2) {
                            setError(error2.message) 
                            return true;
                        }
                        else console.log(short);
                    }
                }
                else {
                    // need to validate to ensure shorturl doesn't already exist
                    const { data: record, error } = await supabase
                        .from('Links')
                        .select()
                        .eq('short_url', shorturl)
                    if (error) {
                        setError(error.message) 
                        return true;
                    }
                    else {
                        if (!record[0]){
                            // shorturl is not taken, create new record
                            const { data: record, error } = await supabase
                                .from('Links')
                                .insert({ url: url, short_url: shorturl })                 
                                .select('short_url')
                                .single()                                
                            if (error) {
                                setError(error.message) 
                                return true;
                            }
                        }
                        else {
                            alert("This short URL is already taken!");
                        }
                    }
                }
            }
            else {
                alert("URL is required!");
            }
        }
        catch (err) {
            alert(err);
        }
        finally {
            return false;
        }
    }

    return (
        <form onSubmit={create}>
            <h3>Create a new short link</h3>
            <input
                type='text'
                placeholder='long ugly url'
                value={url}
                onChange={(e) => setURL(e.target.value)}
            />

            <input
                type='text'
                placeholder='custom short url (optional)'
                value={shorturl}
                onChange={(e) => setShortURL(e.target.value)}
            />

            {/* <Datee></Datee> */}

            <button type='submit'>Shorten</button>            
        </form>
    );
}


// const Datee = () => {
//     const [startDate, setStartDate] = useState();
//     return (
//       <DatePicker 
//         selected={startDate} 
//         onChange={date => setStartDate(date)} 
//         isClearable

//       />
//     );
// };