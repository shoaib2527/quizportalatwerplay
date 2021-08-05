// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from '../../lib/firebase'
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await firestore.collection('Questions')
      .where('category', '==', req.query.category).get();
    let arr = []
    data.forEach(snap => {
      arr.push({ ...snap.data(), id: snap.id, options: [...snap.data().incorrect_answers, snap.data().correct_answer] })
    })
    res.status(200).json({ ok: true, count: arr.length, questions: arr })
  }
  /**
   * @description Body:{category: <cat name>}
   */
  if (req.method === 'POST') {
    let r = await firestore.collection('Questions').add(req.body)
    res.status(200).json({ ok: true, data: { ...req.body, id: r.id, options: [...req.body.incorrect_answers, req.body.correct_answer] } })
  }
  /**
   * @description Body:{...<Data update>, id: <cat id>}
   */
  if (req.method === 'PUT') {
    await firestore.collection('Questions').doc(req.body.id).set(req.body, { merge: true })
    res.status(200).json({ ok: true, data: { ...req.body, options: [...req.body.incorrect_answers, req.body.correct_answer] } })
  }
  /**
   * @description Body:{ id: <cat id>}
   */
  if (req.method === 'DELETE') {
    await firestore.collection('Questions').doc(req.query.id).delete()
    res.status(200).json({ ok: true })
  }
}
