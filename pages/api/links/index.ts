import { NextApiRequest, NextApiResponse } from 'next'
import { GetLinks } from '../../../app/utils/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {data}  = await GetLinks();
        res.status(200).json({data})
      } catch (error) {
        res.status(500).json({ error: 'failed to load data' })
      }
}