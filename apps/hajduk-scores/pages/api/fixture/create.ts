import prisma from '../../../common/db/prisma';

export default async function handle(req, res) {
  const data = req.body;
  const fixture = await prisma.fixture.create({
    data: data,
  });
  res.json(fixture);
}
