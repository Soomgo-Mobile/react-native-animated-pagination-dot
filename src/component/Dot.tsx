/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';
import { usePrevious } from 'react-use';
import EmptyDot from './EmptyDot';
import { getDotStyle } from '../util/DotUtils';

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
  const prevType = usePrevious(type);

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

  const animStyle = useMemo(() => {
    const size = animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [
        (prevType?.size || 3) * props.sizeRatio,
        type.size * props.sizeRatio,
      ],
    });
    return {
      width: size,
      height: size,
      borderRadius: animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [
          (prevType?.size || 3) * props.sizeRatio * 0.5,
          type.size * props.sizeRatio * 0.5,
        ],
      }),
      opacity: animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [prevType?.opacity || 0.2, type.opacity],
      }),
    };
  }, [
    animVal,
    prevType?.opacity,
    prevType?.size,
    props.sizeRatio,
    type.opacity,
    type.size,
  ]);

  if (props.curPage < 3) {
    if (props.idx >= 5) return <EmptyDot sizeRatio={props.sizeRatio} />;
  } else if (props.curPage < 4) {
    if (props.idx > 5) return <EmptyDot sizeRatio={props.sizeRatio} />;
  }

  return (
    <Animated.View
      style={[
        {
          backgroundColor: props.activeColor,
          margin: 3 * props.sizeRatio,
        },
        animStyle,
      ]}
    />
  );
};

export default Dot;
