import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import FixtureTable, { FixtureToSubmit } from '../fixture-table/FixtureTable';
import { findClosestRoundByDate } from '../../common/utils';
import { UserFixtureMapped } from '../round-view-layout/RoundViewLayout';

export function Rounds({
  rounds,
  onSubmit,
}: {
  rounds: UserFixtureMapped[];
  onSubmit: (values: FixtureToSubmit) => void;
}) {
  const currentRound = findClosestRoundByDate(rounds);

  return (
    <Accordion defaultIndex={currentRound} borderRadius={4} overflow="hidden">
      {rounds?.map((round, index) => (
        <AccordionItem key={`${round.userId}_${index}`}>
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
                Kolo {index + 1}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FixtureTable round={round} onSubmit={onSubmit} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Rounds;
