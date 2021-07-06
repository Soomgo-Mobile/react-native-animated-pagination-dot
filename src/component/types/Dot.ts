import { Animated, ViewStyle } from 'react-native';
import { IDotStyle } from '../../util/DotUtils';

export interface IPropsDot {
    idx: number;
    curPage: number;
    maxPage: number;
    activeColor: string;
    sizeRatio: number;
    activeStyle?: ViewStyle
}

export interface IStateDot {
    animVal:Animated.Value;
    animate: boolean;
    prevType: IDotStyle;
    type: IDotStyle;
}

export interface IPropEmptyDot {
    sizeRatio:number;
    inActiveStyle?: ViewStyle
}
