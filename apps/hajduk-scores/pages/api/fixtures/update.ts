import prisma from '../../../common/db/prisma';
import { ApiFixture } from '@hajduk-scores/api-interfaces';

export default async function handle(req, res) {
  const data = req.body;
  for (const fixture of data) {
    const response = await prisma.fixture.update({
      where: {
        fixtureId: fixture.fixtureId,
      },
      data: {
        homeScore: fixture.homeScore,
        awayScore: fixture.awayScore,
        tip: fixture.tip,
      },
    });
  }

  res.json('Resolved');
}
