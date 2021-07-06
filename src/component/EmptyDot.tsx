/**
 *
 * Created by rouge on 11/09/2019.
 */
import React from 'react';
import {View} from 'react-native';
import {IPropEmptyDot} from "./types/Dot";

export const defaultEmptyDotSize = 3;


const EmptyDot = ({ sizeRatio, inActiveStyle }:IPropEmptyDot):React.FunctionComponentElement<IPropEmptyDot>=>{

    return (
        <View
            style={ [{
                backgroundColor: 'white',
                opacity: 0.0,
                width: defaultEmptyDotSize * sizeRatio,
                height: defaultEmptyDotSize * sizeRatio,
                margin: defaultEmptyDotSize * sizeRatio,
            }, inActiveStyle] } />
    )
};

export default EmptyDot;