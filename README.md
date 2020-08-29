react-native-animated-pagination-dot
=============

Paginate component for React native simple dot with **moving animation** 

-----
![download](https://img.shields.io/npm/dm/react-native-animated-pagination-dot.svg) ![npm version](https://badge.fury.io/js/react-native-animated-pagination-dot.svg)
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

<img src="https://user-images.githubusercontent.com/4319422/91634695-32818b80-ea2d-11ea-93ca-006545f9b9a7.gif" alt="Pagination Dot Demo" width="200"/>

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
