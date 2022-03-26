import { IconButton } from '@chakra-ui/button';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/layout';
import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  useColorModeValue,
  Tooltip,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import { Launch } from 'src/api/launches';
import { format, parseISO } from 'date-fns';
import { MouseEventHandler, useState } from 'react';
import NextLink from 'next/link';
import routes from 'src/constants/routes';

const FALLBACK_IMAGE =
  'https://img.freepik.com/free-vector/rocket-sketch-drawing-with-free-hand-vector-eps10_255544-1983.jpg';

interface Props {
  launchData: Launch;
}

export function LaunchCard({ launchData }: Props) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isFavorite, setIsFavorite] = useState(false); // TODO: use localStorage

  const handleFavoriteClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <NextLink href={routes.launches.show(launchData.id)} passHref>
      <Box
        cursor="pointer"
        mt="3"
        border="1px"
        borderRadius={12}
        borderColor={useColorModeValue('gray.300', 'gray.600')}
        width="full"
        height="150px"
      >
        <Flex>
          <Box width="150px" height="148px">
            <Image
              src={launchData.image || FALLBACK_IMAGE}
              borderStartRadius={11}
              boxSize="100%"
              objectFit="cover"
              alt="Launch image"
            />
          </Box>

          <Flex direction="column" width="full" p="4" justifyContent="space-between">
            <Flex alignItems="center">
              <Box>
                <Heading size="sm" textTransform="capitalize" textAlign="left">
                  {launchData.name}
                </Heading>
                <Text textAlign="left">{launchData.launch_service_provider.name}</Text>
              </Box>

              <Spacer />

              <IconButton
                size="sm"
                colorScheme="yellow"
                aria-label="fav"
                icon={<StarIcon />}
                variant={isFavorite ? 'solid' : 'outline'}
                onClick={handleFavoriteClick}
              />
            </Flex>

            <StatGroup>
              <Stat>
                <StatLabel>Launch date</StatLabel>
                <StatNumber>
                  <Badge fontSize="0.6em">{format(parseISO(launchData.net), 'Pp')}</Badge>
                </StatNumber>
              </Stat>

              {!isMobile && (
                <Stat>
                  <StatLabel>Type</StatLabel>
                  <StatNumber>
                    {launchData.mission ? (
                      <Tooltip hasArrow label={launchData.mission.name}>
                        <Badge fontSize="0.6em">{launchData.mission.type || 'Unknown'}</Badge>
                      </Tooltip>
                    ) : (
                      <Badge fontSize="0.6em">Unknown</Badge>
                    )}
                  </StatNumber>
                </Stat>
              )}

              <Stat>
                <StatLabel>Status</StatLabel>
                <StatNumber>
                  <Tooltip hasArrow label={launchData.status.description}>
                    <Badge fontSize="0.7em" colorScheme={launchData.status.abbrev === 'Success' ? 'green' : 'red'}>
                      {launchData.status.abbrev}
                    </Badge>
                  </Tooltip>
                </StatNumber>
              </Stat>
            </StatGroup>
          </Flex>
        </Flex>
      </Box>
    </NextLink>
  );
}
