import { query as q } from 'faunadb';
import { faunaClient } from '../../../common/db/fauna';

export default async (req, res) => {
  if (req.method == 'GET') {
    const query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('fixtureResults'))),
        q.Lambda((show) => q.Get(show))
      )
    );
    console.log('QUERY ', query);
    res.status(200).json({ data: query.data });
  }
};

// export default async (req, res) => {
//   if (req.method == 'GET') {
//     let query = await faunaClient.query(
//       q.Map(
//         q.Paginate(q.Documents(q.Collection('fixtureResults'))),
//         q.Lambda((show) => q.Get(show))
//       )
//     );
//     res.status(200).json({ data: query.data });
//   }
// };
