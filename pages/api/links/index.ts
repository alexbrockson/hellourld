import { NextApiRequest, NextApiResponse } from 'next'
import { GetLinks, GetLink } from '../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.query.short_url === undefined){
        try {
            const {data}  = await GetLinks();
            res.status(200).json({data})
          } catch (error) {
            res.status(500).json({ error: 'failed to load data' })
          }
      }
      else{
        try {
          if (req.query.short_url !== ""){
            // I wasn't sure if GetLink should also be logging a visit since it is an API request 
            // for now it is not doing that, but if I wanted to I would reuse LogVisit in app/utils/supabase
            const {data}  = await GetLink(req.query.short_url!.toString());
            res.status(200).json({data})
          } 
          else{
            res.status(501).send({ message: 'short_url cannot be empty if it is passed as a parameter'})
          }
        }
        catch (error) {
          res.status(500).json({ error: 'failed to load data' })
        }
      }
}