import {
  Box,
  Flex,
  Image,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/react';

export const Leaderboard = ({ leaderboard, hideTitle = false }) => (
  <Box>
    {!hideTitle && <Text fontSize="lg">LEADERBOARD:</Text>}
    <OrderedList mt={2}>
      {leaderboard?.map((leader, index) => (
        <ListItem key={leader.user.name}>
          <Flex flexDirection="row" alignItems="center">
            {leader.user.name} - {leader.totalUserPoints}
            {index === 0 && (
              <Image
                borderRadius="full"
                boxSize="15px"
                ml={2}
                src="https://hajduk.hr/img/icons-svg/logo.svg"
                alt="Leader"
              />
            )}
          </Flex>
        </ListItem>
      ))}
    </OrderedList>
  </Box>
);
