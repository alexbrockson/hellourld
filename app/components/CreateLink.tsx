'use client';

import { CreateNewLink } from '../utils/supabase'
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField  from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CreateLink() {
    const [shorturl, setShortURL] = useState('');
    const [url, setURL] = useState('');
    const [link, setLink] = useState('');
    const [expiration, setValue] = useState<Dayjs | null>(null);


    const create = async(e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        // first confirm that URL isn't empty
        if (url.length) {  
            let payload = { 
                url: url,
                short_url: shorturl,
                expiration: expiration // link deletion on expiration is being handled in supabase db by minutely CRON job
             }
            const {data, error} = await CreateNewLink( payload );
            if (error) {
                console.log(error);
            }
            else {
                if (data.url !== url){
                    setLink("");
                    alert("Short URL is already taken!");
                }
                else {
                    setLink(window.location.href + data.short_url);
                    navigator.clipboard.writeText(window.location.href + data.short_url);                        
                }    
            }            
        }
        else {
            alert("URL is required!");
        }
    }

    return (
        <>
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
                            minDate={dayjs().add(1, 'day')}
                            value={expiration}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <small className="block mt-1 text-xs text-gray-600">Optional (links will expire at 12:00AM of the day selected)</small>
                    </LocalizationProvider>
                    <br/>
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
            <br/><br/>
            {(link && link.length) && (
                <div className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full" role="alert">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                    </svg>
                    <u><a href={link}>{link}</a></u>&nbsp;copied to your clipboard!
                </div>
            )}
        </>

    );
}