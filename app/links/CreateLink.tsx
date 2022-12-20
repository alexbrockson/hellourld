'use client';

import React, {useState} from 'react';
import PocketBase from 'pocketbase';
import { resolve } from 'node:path/win32';

const pb = new PocketBase('http://127.0.0.1:8090');


export default function CreateLink() {
    const [shorturl, setShortURL] = useState('');
    const [url, setURL] = useState('');

    const create = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('creating new link');
        const newLink = {
            "url": url,
            "shorturl": shorturl        
        };

        try {
            const record = await pb.collection('links').create(newLink);
            console.log(record);
        }
        catch (err) {
            // if (err == "Failed to create record"){
            //     alert("This short link is already taken");
            // }
            alert(err);
        }
        finally {
            return false;
        }
    }

    const createValidated = async() => {
        console.log('in createValidated');



        var isValid = await CheckShortURL(shorturl);
        if (isValid){
            create;
        }
        else {
            alert("this short url already exists!");
        }

        // const newLink = {
        //     "url": url,
        //     "shorturl": shorturl        
        // };

        // const record = await pb.collection('links').create(newLink);
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

            <button type='submit'>Shorten</button>
        </form>
    );
}

async function CheckShortURL(shorty: string): Promise<boolean> {
    console.log('Checking Short URL');
    try 
    {
        const shortURL = {
            "shorturl": shorty        
        };

        // throw("this is an error!");
        const record = await pb.collection('links').getFirstListItem(`shorturl="${shorty}"`);
        if (record) {
            console.log(record);
            return false;
        }
        else {
            console.log('looks good');
            return true;
        }
    }
    catch (err){
        alert(err);
        return false;
    }    
}
    
    
