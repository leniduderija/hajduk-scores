import prisma from '../../../common/db/prisma';

export default async function handle(req, res) {
  const data = req.body;
  for (const fixture of data) {
    await prisma.fixture.update({
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
