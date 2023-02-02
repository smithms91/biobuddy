// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PocketBase from 'pocketbase';

// Gets current bio created amount, then updates. Couldnt update ++ in 1 DB Call

export default async function handler(req, res) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const authData = await pb.admins.authWithPassword(process.env.DB_USERNAME, process.env.DB_PASSWORD);
  
  const getBioAmount = await pb.collection('likes').getOne(process.env.DB_TABLE_ID);
  let data = JSON.parse(JSON.stringify(getBioAmount));

  const updateAmount = await pb.collection('likes').update(process.env.DB_TABLE_ID, {
    likes: data.likes + 1,
  });

  res.status(200).send(updateAmount)
}
