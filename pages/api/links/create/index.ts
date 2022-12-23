import { NextApiRequest, NextApiResponse } from 'next'
import { CreateNewLink } from '../../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log('request',req.query);
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }
    if (req.query.url !== undefined){
        if (req.query.url === null || req.query.url === ""){
            res.status(501).send({ message: 'url cannot be null or empty'})
        }
        if (req.query.short_url === undefined){
            // if short_url is null, give it an empty string value
            req.query.short_url = "";
        }
        const {data, error}  = await CreateNewLink(req.query);
        if (error) {
            res.status(500).json({ error: 'failed to create link' })
        }
        else {
            if (data.url !== req.query.url) {
                res.status(500).send({ message: 'This short_url is already being used'})
            }
            else {
                res.status(200).json({data})
            }
        }
    }
    else {
        res.status(501).send({ message: 'url cannot be null or empty'})
    }
}