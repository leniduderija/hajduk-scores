import prisma from '../../../../common/db/prisma';
import { ApiFixture } from '@hajduk-scores/api-interfaces';

export default async function handle(req, res) {
  const { fid } = req.query;

  const fixtures: Omit<ApiFixture, 'user'>[] = await prisma.fixture.findMany({
    where: {
      userId: fid,
    },
  });
  res.json(fixtures);
}
