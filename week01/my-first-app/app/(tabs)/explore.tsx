import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';

export default function TabTwoScreen() {
  return (
    <Box>
      <Heading size="4xl" className="self-center">Favorites</Heading>
    </Box>
  );
}