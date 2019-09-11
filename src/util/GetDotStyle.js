/**
 *
 * Created by rouge on 11/09/2019.
 */
import DotType from './DotType';

const getDotStyle = (idx, curPage, maxPage) => {
    let type = DotType.SMALL;

    if (maxPage < 5) {
        //5개 이하인 경우는 단수이기 때문에 큰 Dot으로만 구성
        return ( idx === curPage ) ? DotType.ACTIVE : DotType.INACTIVE;
    }

    if (curPage < 3) {
        // 현재 페이지가 3 이하일때는 별도로 배열을 지정해줌
        // 배열
        // 큰 큰 큰 중
        if (idx < 3) {
            type = DotType.INACTIVE;
            if (curPage === idx) {
                type = DotType.ACTIVE;
            }
        } else if (idx < 4) {
            type = DotType.MEDIUM;
        } else {
            type = DotType.SMALL;

        }
    } else if (curPage === 3) {
        //4번째 페이지 일때 배열은 별도로 지정해줌
        // 배열
        // 중 큰 큰 큰 중
        if (idx < 4) {
            if (idx === 0) {
                type = DotType.MEDIUM
            } else {
                type = DotType.INACTIVE;

                if (curPage === idx) {
                    type = DotType.ACTIVE
                }
            }
        } else if (curPage + 1 === idx) {
            type = DotType.MEDIUM
        } else {
            type = DotType.SMALL
        }
    } else {
        //기타는 모두 동일한 로직으로 돌아가도록
        if (idx > curPage) {
            if (idx === curPage + 1) {
                type = DotType.MEDIUM
            }
        } else if (idx < curPage) {
            if (idx >= curPage - 2) {
                type = DotType.INACTIVE
            } else if (idx === curPage - 3) {
                type = DotType.MEDIUM
            }
        } else {
            type = DotType.ACTIVE;
        }
    }

    return type;

};

export default getDotStyle;