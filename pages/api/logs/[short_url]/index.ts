import { NextApiRequest, NextApiResponse } from 'next'
import { GetLogs } from '../../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const short_url = req.query.short_url!.toString()
    try {
        const {data}  = await GetLogs(short_url);
        res.status(200).json({data})
      } catch (error) {
        res.status(500).json({ error: 'failed to load data' })
      }
}