import prisma from '../../../common/db/prisma';

export default async function handle(req, res) {
  const data = req.body;
  const fixture = await prisma.fixture.update({
    where: {
      fixtureId: data.fixtureId,
    },
    data: {
      homeScore: data.homeScore,
      awayScore: data.awayScore,
      tip: data.tip,
    },
  });
  res.json(fixture);
}
