react-native-animated-pagination-dot
=============

Paginate component for React native simple dot with **moving animation** 

-----
<p>
<img src="https://img.shields.io/npm/dm/react-native-animated-pagination-dot.svg" />
<img src="https://img.shields.io/npm/dt/react-native-animated-pagination-dot.svg" />
</p>



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
        
        return (
            <View style={{flex:1,}}>
                <PaginationDot 
                    activeDotColor={color} 
                    curPage={currentPage} 
                    maxPage={maxPage}
                />
            
            </View>
        )
    }
}

export default ExampleDotPaginate;
```

-----
## Example

<img src="https://user-images.githubusercontent.com/4319422/64715563-afa1b100-d4fb-11e9-9bc8-abb686b272a0.gif" alt="Pagination Dot Demo" width="400"/>

-----
## API

### Props

| **Prop**                    | **Type**                         | **Description**                                     |
| --------------------------- | -------------------------------- | --------------------------------------------------- |
| `containerWidth`            | `number`                         | Pagination Dot Container Width ( default 84 ).      |
| `curPage`                   | `number`                         | Pagination curernt Page                             |
| `maxPage`                   | `number`                         | Total Page in Pagination                            |
| `activeDotColor`            | `string`                         | Active Dot Color. dot will control by opacity       |


## License

MIT.

## Author

pratt. @soomgo 