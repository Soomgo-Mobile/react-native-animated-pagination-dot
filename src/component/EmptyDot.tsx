/**
 * Created by rouge on 11/09/2019.
 * Converted to Functional component. on 21/09/2021
 */
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export const defaultEmptyDotSize = 3;

const EmptyDot: React.FC<{
  sizeRatio: number;
  inActiveStyle?: ViewStyle;
}> = (props) => {
  return (
    <View
      style={[
        styles.base,
        {
          width: defaultEmptyDotSize * props.sizeRatio,
          height: defaultEmptyDotSize * props.sizeRatio,
          margin: defaultEmptyDotSize * props.sizeRatio,
        },
        props.inActiveStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'white',
    opacity: 0.0,
  },
});

export default EmptyDot;
