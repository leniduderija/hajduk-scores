import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { FixtureData, Short } from '@hajduk-scores/api-interfaces';
import FixtureTable from '../fixture-table/FixtureTable';

export function Rounds({ rounds }: { rounds: FixtureData[] }) {
  const currentRound = rounds.findIndex(
    (round) => round.fixture.status.short === Short.NS
  );
  return (
    <Accordion defaultIndex={currentRound}>
      {rounds?.map((round, index) => (
        <AccordionItem key={round.fixture.id}>
          <h2>
            <AccordionButton
              backgroundColor={
                index % 2 === 0
                  ? 'rgba(210,35,41, 0.65)'
                  : 'rgba(3,78,162, 0.65)'
              }
              color="#fff"
              _expanded={{
                backgroundColor: index % 2 === 0 ? '#D22329' : '#034EA2',
              }}
              _hover={{
                backgroundColor: index % 2 === 0 ? '#D22329' : '#034EA2',
              }}
            >
              <Box flex="1" textAlign="left">
                Round {index + 1}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FixtureTable round={round} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Rounds;
