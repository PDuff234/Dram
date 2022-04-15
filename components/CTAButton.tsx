import React, {FC} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type CTAButtonProps = {title: string; onPress: () => void};

const CTAButton: FC<CTAButtonProps> = props => {
  return (
    <TouchableOpacity style={styles.ctaButtonContiner} onPress={props.onPress}>
      <Text style={styles.ctaButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ctaButtonContiner: {
    height: 55,
    marginHorizontal: 25,
    backgroundColor: '#7735C2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CTAButton;
