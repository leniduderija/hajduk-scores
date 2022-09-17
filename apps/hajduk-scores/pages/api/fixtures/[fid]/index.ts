import prisma from '../../../../common/db/prisma';

export default async function handle(req, res) {
  const { fid } = req.query;

  const fixtures = await prisma.fixture.findMany({
    where: {
      userId: fid,
    },
  });
  res.json(fixtures);
}
