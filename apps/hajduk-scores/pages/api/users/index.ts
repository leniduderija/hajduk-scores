import prisma from '../../../common/db/prisma';

export default async function handle(req, res) {
  // const users = await prisma.user.findMany({
  //   orderBy: {
  //     name: 'desc',
  //   },
  // });
  res.json([]);
}
