import { NextApiRequest, NextApiResponse } from 'next'
import { DeleteLinkByShortURL } from '../../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        res.status(405).send({ message: 'Only DELETE requests allowed' })
        return
      }
    if (req.query.short_url !== undefined && req.query.short_url !== ""){
        const short_url = req.query.short_url!.toString()
        try {
            const {data}  = await DeleteLinkByShortURL(short_url);
            if (data !== null){
              res.status(200).json({ message:`${short_url} has been deleted`})
            }
            else{
              res.status(200).json({ message:`${short_url} does not exist`})
            }
          } catch (error) {
            res.status(500).json({ error: 'failed to delete link' })
          }
    }
    else {
        res.status(501).send({ message: 'short_url cannot be null or empty'})
    }
}