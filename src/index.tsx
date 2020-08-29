/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 *
 */
import React from 'react';
import {ScrollView, View, Platform, StyleSheet} from "react-native";
import Dot from './component/Dot';
import EmptyDot, {defaultEmptyDotSize} from './component/EmptyDot';

export interface IDotContainerProps {
    curPage:number;
    maxPage:number;
    sizeRatio?:number;
    activeDotColor:string;
}

const ONE_EMPTY_DOT_SIZE = defaultEmptyDotSize * defaultEmptyDotSize;

class DotContainer extends React.Component<IDotContainerProps>{
    private refScrollView:ScrollView|null = null;

    shouldComponentUpdate (nextProps) {
        if (this.props.curPage === nextProps.curPage) {
            // prevent unnecessary re-render caused by external change
            return false;
        }

        return true;
    }

    componentDidUpdate (prevProps){
        if (this.props.maxPage > 4 && prevProps.curPage !== this.props.curPage)
            this.scrollTo(this.props.curPage)
    }

    render () {
        const { curPage, maxPage, activeDotColor } = this.props;
        const list = [ ...Array(maxPage).keys() ];


        let normalizedPage = curPage;
        if(curPage < 0){
            normalizedPage = 0;
        }

        if(curPage > maxPage-1){
            normalizedPage = maxPage-1
        }
        const sizeRatio = this.getSizeRatio();

        if (maxPage < 5) {
            return (
                <View style={ styles.container }>
                    { list.map(i => {
                        return (
                            <Dot
                                key={ i }
                                idx={ i }
                                sizeRatio={sizeRatio}
                                curPage={ normalizedPage }
                                maxPage={ maxPage }
                                activeColor={activeDotColor}
                            />
                        );
                    }) }
                </View>
            )
        }

        const containerWidth = 84;

        return (
            <View style={ styles.container }
                onLayout={()=>{
                    // scroll to right index on initial render
                    this.scrollTo(this.props.curPage, false);
                }}>
                <ScrollView
                    ref={(ref)=>{
                        this.refScrollView = ref;
                    }}
                    style={ {
                        maxWidth: containerWidth * sizeRatio,
                    } }
                    contentContainerStyle={ {
                        alignItems: 'center',
                    } }
                    bounces={ false }
                    horizontal={ true }
                    scrollEnabled={ false }
                    showsHorizontalScrollIndicator={ false }>

                    {/* previous empty dummy dot */}
                    <EmptyDot sizeRatio={sizeRatio} />
                    <EmptyDot sizeRatio={sizeRatio} />


                    { list.map(i => {
                        return (
                            <Dot
                                sizeRatio={sizeRatio}
                                key={ i }
                                idx={ i }
                                curPage={ normalizedPage }
                                maxPage={ maxPage }
                                activeColor={activeDotColor}
                            />
                        );
                    }) }

                    {/* previous empty dummy dot */}
                    <EmptyDot sizeRatio={sizeRatio} />
                    <EmptyDot sizeRatio={sizeRatio} />

                </ScrollView>
            </View>
        )
    }


    scrollTo (index, animated = true) {
        if(!this.refScrollView) return;
        const sizeRatio = this.getSizeRatio();

        const FIRST_EMPTY_DOT_SPACE = ONE_EMPTY_DOT_SIZE * 2;

        const MOVE_DISTANCE = ONE_EMPTY_DOT_SIZE * sizeRatio;

        this.refScrollView.scrollTo({
            x: Math.max(0, FIRST_EMPTY_DOT_SPACE + ( index - 4 ) * MOVE_DISTANCE),
            animated,
        });
    }

    getSizeRatio () {
        if(!this.props.sizeRatio)
            return 1.0;

        return Math.max(1.0, this.props.sizeRatio);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default DotContainer;