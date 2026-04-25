import { Image, StyleSheet } from 'react-native';

interface Props {
  opacity: number;
}

export function GrainOverlay({ opacity }: Props) {
  return (
    <Image
      source={require('../assets/noise.png')}
      style={[styles.overlay, { opacity }]}
      resizeMode="cover"
      pointerEvents="none"
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 1,
  },
});
