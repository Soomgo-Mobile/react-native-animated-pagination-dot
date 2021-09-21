react-native-animated-pagination-dot
=============

Paginate component for React native simple dot with **moving animation** 

-----
[![download](https://img.shields.io/npm/dm/react-native-animated-pagination-dot?logo=npm&style=flat-square)](https://www.npmjs.com/package/react-native-animated-pagination-dot)
[![npm version](https://img.shields.io/npm/v/react-native-animated-pagination-dot?style=flat-square)](https://www.npmjs.com/package/react-native-animated-pagination-dot)
[![stars](https://img.shields.io/github/stars/rouge3351/react-native-animated-pagination-dot?logo=github&style=flat-square)](https://github.com/rouge3351/react-native-animated-pagination-dot)
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

const ExampleDotPaginate:React.FC = ()=>{
    const [curPage] = React.useState(0);
    
    return (
        <PaginationDot
            activeDotColor={'black'}
            curPage={curPage}
            maxPage={20}
        />
    )
}

export default ExampleDotPaginate;
```

-----
## Example

<img src="https://user-images.githubusercontent.com/4319422/92298858-39a61d80-ef88-11ea-85dd-e7a4a5c115dc.gif" alt="Pagination Dot Demo" width="320"/>

-----
## API

### Props

| **Prop**                    | **Type**                    | **Required(Default Value)**  | **Description**                                                |
| --------------------------- | ----------------------------| ---------------------------- | ---------------------------------------------------            |
| `curPage`                   | `number`                    | required                     | Pagination curernt Page                                        |
| `maxPage`                   | `number`                    | required                     | Total Page in Pagination                                       |
| `activeDotColor`            | `string`                    | required                     | Active Dot Color. dot will control by opacity                  |
| `sizeRatio`                 | `number`                    | 1.0                          | Customize Dot Size. minimum value is 1.0 (*recommend 1.0 ~ 2.0*) |
| `vertical`                  | `boolean`                   | false                        | Dot direction                                         |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.


## License

MIT.

## Author

rouge
