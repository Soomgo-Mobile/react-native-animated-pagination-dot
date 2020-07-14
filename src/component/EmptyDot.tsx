/**
 *
 * Created by rouge on 11/09/2019.
 */
import React from 'react';
import {View} from 'react-native';

const EmptyDot = ()=>{
    return (
        <View
            style={ {
                backgroundColor: 'white',
                opacity: 0.0,
                width: 3,
                height: 3,
                margin: 3,
            } } />
    )
};

export default EmptyDot;