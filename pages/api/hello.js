// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PocketBase from 'pocketbase';



export default async function handler(req, res) {
const pb = new PocketBase('http://127.0.0.1:8090');

  const authData = await pb.admins.authWithPassword(process.env.DB_USERNAME, process.env.DB_PASSWORD);

  const data = {
    "likes": 123,
  };

  const record = await pb.collection('likes').update(process.env.DB_TABLE_ID, data);
  res.status(200).json(record.likes)
}
