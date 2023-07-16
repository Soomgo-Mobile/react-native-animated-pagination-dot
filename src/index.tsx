/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 * Converted to Functional component. on 21/09/2021
 */
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  I18nManager,
  View,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import usePrevious from 'react-use/lib/usePrevious';
import Dot from './component/Dot';
import EmptyDot, { defaultEmptyDotSize } from './component/EmptyDot';

export interface IDotContainerProps {
  curPage: number;
  maxPage: number;
  sizeRatio?: number;
  activeDotColor: string;
  inactiveDotColor?: string;
  vertical?: boolean;
}

const ONE_EMPTY_DOT_SIZE = defaultEmptyDotSize * defaultEmptyDotSize;

const DotContainer: React.FC<IDotContainerProps> = ({
  curPage,
  maxPage,
  sizeRatio: sizeRatioProp,
  activeDotColor,
  inactiveDotColor,
  vertical,
}) => {
  curPage = I18nManager.isRTL ? maxPage - 1 - curPage : curPage;
  const prevPage = usePrevious(curPage);

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const getSizeRatio = useCallback<() => number>(() => {
    if (!sizeRatioProp) return 1.0;

    return Math.max(1.0, sizeRatioProp);
  }, [sizeRatioProp]);

  const scrollTo = useCallback<(index: number, animated?: boolean) => void>(
    (index, animated = true) => {
      const sizeRatio = getSizeRatio();
      const FIRST_EMPTY_DOT_SPACE = ONE_EMPTY_DOT_SIZE * 2;
      const MOVE_DISTANCE = ONE_EMPTY_DOT_SIZE * sizeRatio;

      const moveTo = Math.max(
        0,
        FIRST_EMPTY_DOT_SPACE + (index - 4) * MOVE_DISTANCE
      );

      if (vertical) {
        y.value = animated ? withTiming(moveTo, { duration: 400 }) : moveTo;
        return;
      }

      x.value = animated ? withTiming(moveTo, { duration: 400 }) : moveTo;
    },
    [getSizeRatio, vertical, x, y]
  );

  const getContainerStyle = useCallback<() => StyleProp<ViewStyle>>(() => {
    const sizeRatio = getSizeRatio();
    const containerSize = 84 * sizeRatio;

    return {
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
      maxHeight: vertical ? containerSize : undefined,
      maxWidth: vertical ? undefined : containerSize,
      overflow: 'hidden',
    };
  }, [getSizeRatio, vertical]);

  useEffect(() => {
    if (maxPage > 4 && prevPage !== curPage) scrollTo(curPage);
  }, [prevPage, curPage, maxPage, scrollTo]);

  const list = useMemo(() => [...Array(maxPage).keys()], [maxPage]);

  let normalizedPage = curPage;
  if (curPage < 0) {
    normalizedPage = 0;
  }

  if (curPage > maxPage - 1) {
    normalizedPage = maxPage - 1;
  }
  const sizeRatio = getSizeRatio();

  const container = getContainerStyle();

  const contentContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        {
          translateY: y.value,
        },
      ],
    };
  }, [x, y]);

  if (maxPage < 5) {
    return (
      <View style={container}>
        {list.map((i) => {
          return (
            <Dot
              key={i}
              idx={i}
              sizeRatio={sizeRatio}
              curPage={normalizedPage}
              maxPage={maxPage}
              activeColor={activeDotColor}
              inactiveColor={inactiveDotColor}
            />
          );
        })}
      </View>
    );
  }

  return (
    <View
      style={container}
      onLayout={() => {
        // scroll to right index on initial render
        scrollTo(curPage, false);
      }}
    >
      <Animated.View
        style={[styles.scrollViewContainer, contentContainerStyle]}
      >
        {/* previous empty dummy dot */}
        <EmptyDot sizeRatio={sizeRatio} />
        <EmptyDot sizeRatio={sizeRatio} />

        {list.map((i) => {
          return (
            <Dot
              sizeRatio={sizeRatio}
              key={i}
              idx={i}
              curPage={normalizedPage}
              maxPage={maxPage}
              activeColor={activeDotColor}
              inactiveColor={inactiveDotColor}
            />
          );
        })}

        {/* previous empty dummy dot */}
        <EmptyDot sizeRatio={sizeRatio} />
        <EmptyDot sizeRatio={sizeRatio} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default DotContainer;
