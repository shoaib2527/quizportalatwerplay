// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore, auth } from '../../lib/firebase'
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await firestore.collection('Users').get();
    let arr = []
    data.forEach(snap => {
      arr.push(snap.data(),)
    })
    res.status(200).json({ ok: true, count: arr.length, users: arr })
  }
  /**
   * @description Body:{...<dataToUpdate>, id: <cat id>}
   */
  if (req.method === 'PUT') {
    await firestore.collection('Users').doc(req.body.id).set(req.body, { merge: true })
    res.status(200).json({ ok: true })
  }
  /**
   * @description Body:{ id: <cat id>}
   */
  if (req.method === 'DELETE') {
    await auth.deleteUser(req.query.id)
    await firestore.collection('Users').doc(req.query.id).delete()
    res.status(200).json({ ok: true })
  }
}
