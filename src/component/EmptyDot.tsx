/**
 *
 * Created by rouge on 11/09/2019.
 */
import React from 'react';
import {View} from 'react-native';
import {IPropEmptyDot} from "./types/Dot";

const EmptyDot = (props:IPropEmptyDot):React.FunctionComponentElement<IPropEmptyDot>=>{

    return (
        <View
            style={ {
                backgroundColor: 'white',
                opacity: 0.0,
                width: 3 * props.sizeRatio,
                height: 3 * props.sizeRatio,
                margin: 3,
            } } />
    )
};

export default EmptyDot;