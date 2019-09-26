/**
 *
 * Created by rouge on 11/09/2019.
 */
import React from "react";
import {Animated} from "react-native";
import PropTypes from 'prop-types';

import EmptyDot from './EmptyDot';
import GetDotStyle from '../util/GetDotStyle'

class Dot extends React.Component {
    constructor (props) {
        super(props);

        const type = GetDotStyle(props.idx, props.curPage, props.maxPage);

        this.state = {
            animVal: new Animated.Value(0),
            animate: false,
            prevType: type,
            type: type
        }

    }

    static getDerivedStateFromProps (nextProps, prevState) {
        const nextType = GetDotStyle(nextProps.idx, nextProps.curPage, nextProps.maxPage);
        const prevType = prevState.type;

        return {
            animate: ( nextType.size !== prevType.size ) || ( nextType.opacity !== prevType.opacity ),
            prevType: prevType,
            type: nextType
        }
    }

    componentDidUpdate () {

        if (this.state.animate === false) return;

        this.state.animVal.setValue(0);

        Animated.timing(
            this.state.animVal, {
                toValue: 1,
                duration: 300,
            },
        ).start();
    }


    render () {
        const { idx, curPage, maxPage } = this.props;
        const { prevType, type } = this.state;

        if (curPage < 3) {
            if (idx >= 5)
                return (
                    <EmptyDot />
                );

        } else if (curPage < 4) {
            if (idx > 5)
                return (
                    <EmptyDot />
                );
        }


        const opacity = this.state.animVal.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ prevType.opacity, type.opacity ]
        });

        const size = this.state.animVal.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ prevType.size, type.size ]
        });

        const borderRadius = this.state.animVal.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: [ prevType.size * 0.5, type.size * 0.5 ]
        });

        const {activeColor} = this.props;


        return (
            <Animated.View
                style={ [ {
                    backgroundColor: activeColor,
                    margin: 3,
                }, {
                    width: size,
                    height: size,
                    borderRadius: borderRadius,
                    opacity: opacity,
                } ] } />
        )
    }

}

Dot.propTypes = {
    idx: PropTypes.number,
    curPage:PropTypes.number,
    maxPage:PropTypes.number,
    activeColor:PropTypes.string
};

export default Dot;