import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function Favorites() {
  return (
    <Box>
      <Heading size="4xl" className="self-center">Favorites</Heading>
      <Text size="xl" className="self-center">Your list of favorite paintings below...</Text>
    </Box>
  );
}