import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { RoundsInterface } from '@hajduk-scores/api-interfaces';
import FixtureTable from '../fixture-table/FixtureTable';

export function Rounds({ rounds }: { rounds: RoundsInterface }) {
  return (
    <Accordion
      defaultIndex={parseInt(JSON.stringify(rounds.currentRound.round)) - 1}
    >
      {rounds?.rounds?.map((round, index) => (
        <AccordionItem key={round.round}>
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
                Round {round.round}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FixtureTable round={round.round} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Rounds;
