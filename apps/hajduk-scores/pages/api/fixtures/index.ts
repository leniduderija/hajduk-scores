import prisma from '../../../common/db/prisma';

export default async function handle(req, res) {
  const fixtures = await prisma.fixture.findMany();
  res.json(fixtures);
}
