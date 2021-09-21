/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, StatusBar, Button } from 'react-native';

import PaginationDot from 'react-native-animated-pagination-dot';

const TestDotContainer = ({ color, sizeRatio = 1.0, maxPage = 10 }) => {
  const [page, setPage] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginBottom: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>
            page
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
            {page + 1} / {maxPage}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>
            sizeRatio
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
            {sizeRatio}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          title="Prev"
          onPress={() => {
            setPage(page - 1);
          }}
        />

        <PaginationDot
          activeDotColor={color}
          curPage={page}
          maxPage={maxPage}
          sizeRatio={sizeRatio}
        />

        <Button
          title="Next"
          onPress={() => {
            setPage(page + 1);
          }}
        />
      </View>
    </View>
  );
};

const TestDotVerticalContainer = ({ color, sizeRatio = 1.0, maxPage = 10 }) => {
  const [page, setPage] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginBottom: 10,
      }}
    >
      <View style={{ flex: 5, flexDirection: 'column' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>
            page
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
            {page + 1} / {maxPage}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>
            sizeRatio
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>
            {sizeRatio}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Button
            title="Prev"
            onPress={() => {
              setPage(page - 1);
            }}
          />

          <Button
            title="Next"
            onPress={() => {
              setPage(page + 1);
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PaginationDot
          activeDotColor={color}
          curPage={page}
          maxPage={maxPage}
          sizeRatio={sizeRatio}
          vertical={true}
        />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: 'black',
            }}
          >
            Animated Pagination Dots
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: 'column',
            paddingVertical: 30,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <TestDotContainer maxPage={20} color={'black'} sizeRatio={1} />
          <TestDotContainer maxPage={4} color={'green'} sizeRatio={1.0} />
          <TestDotVerticalContainer maxPage={10} color={'rgb(0,0,120)'} />
          <TestDotVerticalContainer
            maxPage={4}
            color={'blue'}
            sizeRatio={1.5}
          />
        </View>
      </View>
    </View>
  );
};

export default App;
