/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 *
 */
import React from 'react';
import {ScrollView, View, Platform, StyleSheet} from "react-native";
import Dot from './component/Dot';
import EmptyDot from './component/EmptyDot';

export interface IDotContainerProps {
    curPage:number;
    maxPage:number;
    containerWidth?:number;
    activeDotColor:string;
}


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

        if (maxPage < 5) {
            return (
                <View style={ styles.container }>
                    { list.map(i => {
                        return (
                            <Dot
                                key={ i }
                                idx={ i }
                                curPage={ normalizedPage }
                                maxPage={ maxPage }
                                activeColor={activeDotColor}
                            />
                        );
                    }) }
                </View>
            )
        }

        const { containerWidth = 84 } = this.props;

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
                        maxWidth: containerWidth,
                    } }
                    contentContainerStyle={ {
                        alignItems: 'center',
                    } }
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
                                curPage={ normalizedPage }
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


    scrollTo (index, animated = true) {
        if(!this.refScrollView) return;

        this.refScrollView.scrollTo({
            x: Math.max(0, 18 + ( index - 4 ) * 9),
            animated,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default DotContainer;