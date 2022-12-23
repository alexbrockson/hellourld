import { NextApiRequest, NextApiResponse } from 'next'
import { GetLogs } from '../../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.toString()
    try {
        const {data}  = await GetLogs(id);
        res.status(200).json({data})
      } catch (error) {
        res.status(500).json({ error: 'failed to load data' })
      }
}