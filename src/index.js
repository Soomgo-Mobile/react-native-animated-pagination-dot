/**
 *
 * Created by rouge on 11/09/2019.
 */
import React from 'react';
import {ScrollView, View, Platform} from "react-native";
import Dot from './component/Dot';
import EmptyDot from './component/EmptyDot';
import PropTypes from "prop-types";


class DotContainer extends React.Component{

    componentDidUpdate (prevProps){
        if (this.props.maxPage > 4 && prevProps.curPage !== this.props.curPage)
            this.scrollTo(this.props.curPage)
    }


    render () {
        const { curPage, maxPage, activeDotColor } = this.props;
        const list = [ ...Array(maxPage).keys() ];

        if (maxPage < 5) {

            return (
                <View style={ styles.container }>
                    { list.map(i => {
                        return (
                            <Dot
                                key={ i }
                                idx={ i }
                                curPage={ curPage }
                                maxPage={ maxPage }
                            />
                        );
                    }) }
                </View>
            )

        }
        const { containerWidth = 84 } = this.props;

        return (
            <View style={ styles.container }>
                <ScrollView
                    ref="_scrollView"
                    style={ {
                        maxWidth: containerWidth,
                    } }
                    contentContainerStyle={ {
                        alignItems: 'center',
                    } }
                    scalesPageToFit={ Platform.OS === 'android' }
                    bounces={ false }
                    horizontal={ true }
                    scrollEnabled={ false }
                    showsHorizontalScrollIndicator={ false }>

                    {/* previous empty dummy dot */}
                    <EmptyDot />
                    <EmptyDot />


                    { list.map(i => {
                        return (
                            <Dot
                                key={ i }
                                idx={ i }
                                curPage={ curPage }
                                maxPage={ maxPage }
                                activeColor={activeDotColor}
                            />
                        );
                    }) }

                    {/* previous empty dummy dot */}
                    <EmptyDot />
                    <EmptyDot />

                </ScrollView>
            </View>
        )
    }


    scrollTo (index) {
        this.refs._scrollView.scrollTo({
            x: Math.max(0, 18 + ( index - 4 ) * 9),
            animated: true
        });
    }
}

DotContainer.propTypes = {
    containerWidth:PropTypes.number,
    curPage:PropTypes.number,
    maxPage:PropTypes.number,
    activeDotColor:PropTypes.string
};

export default DotContainer;