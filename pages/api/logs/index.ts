import { NextApiRequest, NextApiResponse } from 'next'
import { GetAllLogs, GetLogs } from '../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.short_url === undefined){
    try {
        const {data}  = await GetAllLogs();
        res.status(200).json({data})
      } catch (error) {
        res.status(500).json({ error: 'failed to load data' })
      }
  }
  else{
    try {
      if (req.query.short_url !== ""){
        const {data}  = await GetLogs(req.query.short_url!.toString());
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