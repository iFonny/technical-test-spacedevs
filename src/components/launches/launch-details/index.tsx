import { IconButton } from '@chakra-ui/button';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Center, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/layout';
import { StatGroup, Stat, StatLabel, StatNumber, Badge, useColorModeValue, Tooltip, Image } from '@chakra-ui/react';
import { Launch } from 'api/launches';
import { getStatusColor } from 'api/launches/utils';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

interface Props {
  launchData: Launch;
}

export function LaunchDetails({ launchData }: Props) {
  const [isFavorite, setIsFavorite] = useState(false); // TODO: use localStorage

  return (
    <Container maxWidth="2xl" centerContent>
      <Box
        mt="4"
        p="5"
        border="1px"
        borderRadius="12"
        borderColor={useColorModeValue('gray.300', 'gray.600')}
        width="full"
        textAlign="center"
      >
        <Flex mb="4">
          <Heading size="lg" textTransform="capitalize" textAlign="left">
            {launchData.name}
          </Heading>
          <Spacer />
          <IconButton
            colorScheme="yellow"
            aria-label="fav"
            icon={<StarIcon />}
            variant={isFavorite ? 'solid' : 'outline'}
            onClick={() => setIsFavorite(!isFavorite)}
          />
        </Flex>

        {launchData.image && (
          <Center>
            <Image src={launchData.image} alt="Launch image" />
          </Center>
        )}

        {launchData.mission?.description && <Text mt="4">{launchData.mission.description}</Text>}

        {launchData.launch_service_provider?.name && launchData.pad?.name && (
          <Text mt="4">
            {launchData.launch_service_provider.name} - {launchData.pad.name}
          </Text>
        )}

        <StatGroup mt="4">
          <Stat>
            <StatLabel>Launch date</StatLabel>
            <StatNumber>
              <Badge>{format(parseISO(launchData.net), 'Pp')}</Badge>
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Type</StatLabel>
            <StatNumber>
              {launchData.mission ? (
                <Tooltip hasArrow label={launchData.mission.name}>
                  <Badge>{launchData.mission.type || 'Unknown'}</Badge>
                </Tooltip>
              ) : (
                <Badge>Unknown</Badge>
              )}
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Status</StatLabel>
            <StatNumber>
              <Tooltip hasArrow label={launchData.status.description}>
                <Badge fontSize="0.7em" colorScheme={getStatusColor(launchData.status.abbrev)}>
                  {launchData.status.abbrev}
                </Badge>
              </Tooltip>
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Container>
  );
}
