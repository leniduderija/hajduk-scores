import prisma from '../../../common/db/prisma';

export default async function handle(req, res) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc',
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
