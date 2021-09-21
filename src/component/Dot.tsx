/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { usePrevious } from 'react-use';
import EmptyDot from './EmptyDot';
import { getDotStyle, IDotStyle } from '../util/DotUtils';

const Dot: React.FC<{
  idx: number;
  curPage: number;
  maxPage: number;
  activeColor: string;
  sizeRatio: number;
}> = (props) => {
  const [animVal] = useState(new Animated.Value(0));
  const [animate, setAnimate] = useState(false);
  const [type, setType] = useState(() =>
    getDotStyle({
      idx: props.idx,
      curPage: props.curPage,
      maxPage: props.maxPage,
    })
  );
  const prevType = usePrevious<IDotStyle>(type);

  useEffect(() => {
    const nextType = getDotStyle({
      idx: props.idx,
      curPage: props.curPage,
      maxPage: props.maxPage,
    });

    const nextAnimate =
      nextType.size !== (prevType?.size || 3) ||
      nextType.opacity !== (prevType?.opacity || 0.2);

    setType(nextType);
    setAnimate(nextAnimate);
  }, [
    prevType?.opacity,
    prevType?.size,
    props.curPage,
    props.idx,
    props.maxPage,
  ]);

  useEffect(() => {
    if (!animate) return;

    animVal.setValue(0);
    Animated.timing(animVal, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animVal, animate, prevType, type]);

  if (props.curPage < 3) {
    if (props.idx >= 5) return <EmptyDot sizeRatio={props.sizeRatio} />;
  } else if (props.curPage < 4) {
    if (props.idx > 5) return <EmptyDot sizeRatio={props.sizeRatio} />;
  }

  const opacity = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [prevType?.opacity || 0.2, type.opacity],
  });

  const size = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (prevType?.size || 3) * props.sizeRatio,
      type.size * props.sizeRatio,
    ],
  });

  const borderRadius = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (prevType?.size || 3) * props.sizeRatio * 0.5,
      type.size * props.sizeRatio * 0.5,
    ],
  });
  const { activeColor } = props;

  return (
    <Animated.View
      style={[
        {
          backgroundColor: activeColor,
          margin: 3 * props.sizeRatio,
        },
        {
          width: size,
          height: size,
          borderRadius: borderRadius,
          opacity: opacity,
        },
      ]}
    />
  );
};

export default Dot;
