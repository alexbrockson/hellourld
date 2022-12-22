'use client';

import supabase from '../utils/supabase'
import { useEffect, useState } from 'react';


import { Dayjs } from 'dayjs';
import TextField  from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function CreateLink() {
    const [errorText, setError] = useState('')
    const [shorturl, setShortURL] = useState('');
    const [url, setURL] = useState('');
    const [expiration, setValue] = useState<Dayjs | null>(null);


    const create = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log(expiration);
            // first confirm that URL isn't empty
            if (url.length) {
                if (shorturl.length == 0) {
                    // if shorturl is empty, submit new url and then return id to use for shorturl                
                    const { data, error } = await supabase
                        .from('Links')
                        .insert({ url: url, expiration: expiration })                 
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
                        else {
                            alert('Your short URL: ' + window.location.href + "/lnk/" + newShortUrl);
                        }
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
                                .insert({ url: url, short_url: shorturl, expiration: expiration })                 
                                .select('short_url')
                                .single()                                
                            if (error) {
                                setError(error.message) 
                                return true;
                            }
                            else {
                                alert('Your short URL: ' + window.location.href + "/lnk/" + shorturl);
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
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm center">
            <form onSubmit={create}>
                <div className="form-group mb-6">
                    <label className="form-label inline-block mb-2 text-gray-700">URL</label>
                    <input type="text" className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Paste your long URL" onChange={(e) => setURL(e.target.value)} value={url}/>
                </div>
                <div className="form-group mb-6">
                    <label className="form-label inline-block mb-2 text-gray-700">Short URL</label>
                    <input type="text" className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Custom short URL" onChange={(e) => setShortURL(e.target.value)} value={shorturl}/>
                    <small className="block mt-1 text-xs text-gray-600">Optional</small>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <label className="form-label inline-block mb-2 text-gray-700">Expiration</label>
                    <DatePicker
                        // label="Expiration Date"
                        className="form-control block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        value={expiration}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <small className="block mt-1 text-xs text-gray-600">Optional</small>
                </LocalizationProvider>
                <br/><br/>
                <button type="submit" className="
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
                    ease-in-out">Submit</button>
            </form>
        </div>

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