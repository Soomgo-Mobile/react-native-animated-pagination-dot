/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 *
 */
import React from "react";
import {Animated} from "react-native";

import EmptyDot from './EmptyDot';
import {
    IPropsDot,
    IStateDot,
} from './types/Dot';
import { getDotStyle } from '../util/DotUtils';

class Dot extends React.Component<IPropsDot, IStateDot> {
    constructor (props) {
        super(props);

        const type = getDotStyle({
            idx:props.idx,
            curPage:props.curPage,
            maxPage:props.maxPage,
        });

        this.state = {
            animVal: new Animated.Value(0),
            animate: false,
            prevType: type,
            type: type
        }

    }

    static getDerivedStateFromProps (nextProps, prevState) {
        const nextType = getDotStyle({
            idx:nextProps.idx,
            curPage:nextProps.curPage,
            maxPage:nextProps.maxPage,
        });
        const prevType = prevState.type;

        return {
            animate: ( nextType.size !== prevType.size ) || ( nextType.opacity !== prevType.opacity ),
            prevType: prevType,
            type: nextType
        }
    }

    componentDidUpdate () {

        if (!this.state.animate) return;

        this.state.animVal.setValue(0);

        Animated.timing(
            this.state.animVal, {
                toValue: 1,
                duration: 300,
                useNativeDriver:false
            },
        ).start();
    }


    render () {
        const { idx, curPage, sizeRatio } = this.props;
        const { prevType, type } = this.state;

        if (curPage < 3) {
            if (idx >= 5)
                return (
                    <EmptyDot sizeRatio={sizeRatio} />
                );

        } else if (curPage < 4) {
            if (idx > 5)
                return (
                    <EmptyDot sizeRatio={sizeRatio} />
                );
        }


        const opacity = this.state.animVal.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ prevType.opacity, type.opacity ]
        });

        const size = this.state.animVal.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ prevType.size * sizeRatio, type.size * sizeRatio ]
        });

        const borderRadius = this.state.animVal.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ prevType.size * sizeRatio * 0.5, type.size * sizeRatio * 0.5 ]
        });

        const {activeColor} = this.props;


        return (
            <Animated.View
                style={ [ {
                    backgroundColor: activeColor,
                    margin: 3 * sizeRatio,
                }, {
                    width: size,
                    height: size,
                    borderRadius: borderRadius,
                    opacity: opacity,
                } ] } />
        )
    }

}

export default Dot;