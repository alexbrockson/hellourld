'use client';

import {useState} from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


export default function CreateLink() {
    const [shorturl, setShortURL] = useState('');
    const [url, setURL] = useState('');

    const create = async() => {
        const newLink = {
            "url": url,
            "shorturl": shorturl        
        };

        const record = await pb.collection('links').create(newLink);
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