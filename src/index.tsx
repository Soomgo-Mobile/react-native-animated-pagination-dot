/**
 *
 * Created by rouge on 11/09/2019.
 * Converted to Typescript on 14/07/2020.
 *
 */
import React from 'react';
import {ScrollView, View, ViewStyle, StyleProp} from "react-native";
import Dot from './component/Dot';
import EmptyDot, {defaultEmptyDotSize} from './component/EmptyDot';

export interface IDotContainerProps {
    curPage:number;
    maxPage:number;
    sizeRatio?:number;
    activeDotColor:string;
    vertical?:boolean;
    activeStyle?: ViewStyle
    inActiveStyle?: ViewStyle
}

const ONE_EMPTY_DOT_SIZE = defaultEmptyDotSize * defaultEmptyDotSize;

class DotContainer extends React.Component<IDotContainerProps>{
    private refScrollView:ScrollView|null = null;

    shouldComponentUpdate (nextProps: IDotContainerProps) {
        if (this.props.curPage === nextProps.curPage) {
            // prevent unnecessary re-render caused by external change
            return false;
        }

        return true;
    }

    componentDidUpdate (prevProps: IDotContainerProps){
        if (this.props.maxPage > 4 && prevProps.curPage !== this.props.curPage)
            this.scrollTo(this.props.curPage)
    }

    render () {
        const { curPage, maxPage, activeDotColor, activeStyle, inActiveStyle } = this.props;
        const list = [ ...Array(maxPage).keys() ];


        let normalizedPage = curPage;
        if(curPage < 0){
            normalizedPage = 0;
        }

        if(curPage > maxPage-1){
            normalizedPage = maxPage-1
        }
        const sizeRatio = this.getSizeRatio();

        const container = this.getContainerStyle();

        if (maxPage < 5) {
            return (
                <View style={ container }>
                    { list.map(i => {
                        return (
                            <Dot
                                key={ i }
                                idx={ i }
                                sizeRatio={sizeRatio}
                                curPage={ normalizedPage }
                                maxPage={ maxPage }
                                activeColor={activeDotColor}
                                activeStyle={activeStyle}
                            />
                        );
                    }) }
                </View>
            )
        }


        return (
            <View style={ container }
                  onLayout={()=>{
                      // scroll to right index on initial render
                      this.scrollTo(this.props.curPage, false);
                  }}>
                <ScrollView
                    ref={(ref)=>{
                        this.refScrollView = ref;
                    }}
                    contentContainerStyle={ {
                        alignItems: 'center',
                    } }
                    bounces={ false }
                    horizontal={ !this.props.vertical }
                    scrollEnabled={ false }
                    showsVerticalScrollIndicator={ false }
                    showsHorizontalScrollIndicator={ false }>

                    {/* previous empty dummy dot */}
                    <EmptyDot sizeRatio={sizeRatio} inActiveStyle={inActiveStyle} />
                    <EmptyDot sizeRatio={sizeRatio} inActiveStyle={inActiveStyle} />


                    { list.map(i => {
                        return (
                            <Dot
                                sizeRatio={sizeRatio}
                                key={ i }
                                idx={ i }
                                curPage={ normalizedPage }
                                maxPage={ maxPage }
                                activeColor={activeDotColor}
                                activeStyle={activeStyle}
                            />
                        );
                    }) }

                    {/* previous empty dummy dot */}
                    <EmptyDot sizeRatio={sizeRatio} inActiveStyle={inActiveStyle} />
                    <EmptyDot sizeRatio={sizeRatio} inActiveStyle={inActiveStyle} />

                </ScrollView>
            </View>
        )
    }


    scrollTo (index: number, animated = true) {
        if(!this.refScrollView) return;

        const sizeRatio = this.getSizeRatio();
        const FIRST_EMPTY_DOT_SPACE = ONE_EMPTY_DOT_SIZE * 2;
        const MOVE_DISTANCE = ONE_EMPTY_DOT_SIZE * sizeRatio;

        const moveTo = Math.max(0, FIRST_EMPTY_DOT_SPACE + ( index - 4 ) * MOVE_DISTANCE);

        if ( this.props.vertical ){
            this.refScrollView.scrollTo({
                x: 0,
                y: moveTo,
                animated,
            });
            return;
        }

        this.refScrollView.scrollTo({
            x: moveTo,
            y:0,
            animated,
        });
    }

    getSizeRatio ():number {
        if(!this.props.sizeRatio)
            return 1.0;

        return Math.max(1.0, this.props.sizeRatio);
    }

    getContainerStyle (): StyleProp<ViewStyle> {
        const {vertical} = this.props;
        const sizeRatio = this.getSizeRatio();
        const containerSize = 84 * sizeRatio;

        return {
            alignItems : 'center',
            flexDirection : vertical ? 'column' : 'row',
            maxHeight : vertical ? containerSize : undefined,
            maxWidth : vertical ? undefined : containerSize
        }

    }
}

export default DotContainer;