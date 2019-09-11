/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import PaginationDot from 'react-native-animated-pagination-dot';

const TestDotContainer = ( {color, maxPage=10} )=>{

  const [page, setPage] = useState(0);

  return (
      <View style={{flex:1,}}>
          <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:1, justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginRight:12}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: 'black',}}>current</Text>
                  <Text style={{ fontSize: 16, fontWeight: '400', color: 'black',}}>{page+1}</Text>
              </View>
              <View style={{flex:1, justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginLeft:12}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: 'black',}}>max</Text>
                  <Text style={{ fontSize: 16, fontWeight: '400', color: 'black',}}>{maxPage}</Text>
              </View>
          </View>
          <View style={{flex:2, justifyContent:'space-between', flexDirection:'row', alignItems:'center' }}>
            <Button
                title="Prev"
                onPress={()=>{
                    setPage(page-1);
              }}/>

            <PaginationDot activeDotColor={color} containerWidth={90} curPage={page} maxPage={maxPage}/>

            <Button
                title="Next"
                onPress={()=>{
                    setPage(page+1);
                }}/>
          </View>
      </View>
  )
}

const App = () => {
  return (
    <View style={{flex:1,}}>
      <StatusBar barStyle="dark-content" />
        <View style={{ flex:1, backgroundColor:'white'}}>
          <View style={{flex:1, justifyContent:'center', alignItems:'flex-start',padding:20 }}>
            <Text style={{
              fontSize: 24,
                fontWeight: '600',
                color: 'black',}}>Animated Pagination Dots</Text>
          </View>
            <View style={{flex:2, flexDirection:'column', paddingVertical:30, paddingHorizontal:20, marginBottom:20 }}>
              <TestDotContainer maxPage={20} color={'black'} />
              <TestDotContainer maxPage={10} color={'red'} />
              <TestDotContainer maxPage={4}  color={'green'} />
              <TestDotContainer maxPage={5}  color={'blue'} />
            </View>
        </View>
    </View>
  );
};

export default App;
