// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from '../../lib/firebase'
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cats = await firestore.collection('Categories').get();
    let arr = []
    cats.forEach(snap => {
      arr.push({ ...snap.data(), id: snap.id })
    })
    res.status(200).json({ ok: true, count: arr.length, cats: arr })
  }
  /**
   * @description Body:{category: <cat name>}
   */
  if (req.method === 'POST') {
    let r = await firestore.collection('Categories').add(req.body);
    res.status(200).json({ ok: true, data: { id: r.id, ...req.body } })
  }
  /**
   * @description Body:{category: <cat name>, id: <cat id>}
   */
  if (req.method === 'PUT') {
    await firestore.collection('Categories').doc(req.body.id).set(req.body, { merge: true })
    res.status(200).json({ ok: true })
  }
  /**
   * @description Body:{ id: <cat id>}
   */
  if (req.method === 'DELETE') {
    await firestore.collection('Categories').doc(req.query.id).delete()
    const usersQuerySnapshot = await firestore.collection('Questions')
      .where('category', '==', req.query.id).get();

    // Create a new batch instance
    const batch = firestore.batch();

    usersQuerySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });

    await batch.commit();
    res.status(200).json({ ok: true })
  }
}
