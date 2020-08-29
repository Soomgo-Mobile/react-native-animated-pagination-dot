react-native-animated-pagination-dot
=============

Paginate component for React native simple dot with **moving animation** 

-----
![download](https://img.shields.io/npm/dm/react-native-animated-pagination-dot?logo=npm&style=flat-square)
![npm version](https://img.shields.io/npm/v/react-native-animated-pagination-dot?style=flat-square)
![stars](https://img.shields.io/github/stars/rouge3351/react-native-animated-pagination-dot?logo=github&style=flat-square)
-----

## Installation

Installation can be done through `npm`:

```shell
npm i react-native-animated-pagination-dot --save
```

-----
## Usage
You can easily add to your project.<br/>
just import component and set current page index and max page index.
```js
import React from 'react'
import {View} from 'react-native'
import PaginationDot from 'react-native-animated-pagination-dot'

class ExampleDotPaginate extends React.Component {
    state={
        currentPage :0,
        maxPage:20,
    };
    
    render(){
        const {currentPage, maxPage} = this.state;
        const color = 'black';
        
        return (
            <View style={{flex:1,}}>
                <PaginationDot 
                    activeDotColor={color} 
                    curPage={currentPage} 
                    maxPage={maxPage}
                    sizeRatio={1.0}
                />
            
            </View>
        )
    }
}

export default ExampleDotPaginate;
```

-----
## Example

<img src="https://user-images.githubusercontent.com/4319422/91634767-df5c0880-ea2d-11ea-90f6-ae7bb4030325.gif" alt="Pagination Dot Demo" width="250"/>

-----
## API

### Props

| **Prop**                    | **Type**                         | **Description**                                       |
| --------------------------- | -------------------------------- | ---------------------------------------------------   |
| `curPage`                   | `number`                         | Pagination curernt Page                               |
| `maxPage`                   | `number`                         | Total Page in Pagination                              |
| `activeDotColor`            | `string`                         | Active Dot Color. dot will control by opacity         |
| `sizeRatio`                 | `number`(default. 1.0)           | Customize Dot Size. minimum value is 1.0 (recommend value is 1.0 ~ 2.0) |


## License

MIT.

## Author

rouge
