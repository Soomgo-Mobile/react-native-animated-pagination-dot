type IDotStyle = {
  size: number;
  opacity: number;
};

enum EnumDotType {
  ACTIVE,
  INACTIVE,
  MEDIUM,
  SMALL,
}

const DotStyle = {
  [EnumDotType.INACTIVE]: {
    size: 8,
    opacity: 0.2,
  },
  [EnumDotType.ACTIVE]: {
    size: 8,
    opacity: 1.0,
  },
  [EnumDotType.MEDIUM]: {
    size: 5,
    opacity: 0.2,
  },
  [EnumDotType.SMALL]: {
    size: 3,
    opacity: 0.2,
  },
};

export type getDotStylePayload = {
  idx: number;
  curPage: number;
  maxPage: number;
};

export const getDotStyle = ({
  idx,
  curPage,
  maxPage,
}: getDotStylePayload): IDotStyle => {
  let type = EnumDotType.SMALL;

  if (maxPage < 5) {
    //5개 이하인 경우는 단수이기 때문에 큰 Dot으로만 구성
    // return ( idx === curPage ) ? EnumDotType.ACTIVE : EnumDotType.INACTIVE;
    return DotStyle[
      idx === curPage ? EnumDotType.ACTIVE : EnumDotType.INACTIVE
    ];
  }

  if (curPage < 3) {
    // 현재 페이지가 3 이하일때는 별도로 배열을 지정해줌
    // 배열
    // 큰 큰 큰 중
    if (idx < 3) {
      type = EnumDotType.INACTIVE;
      if (curPage === idx) {
        type = EnumDotType.ACTIVE;
      }
    } else if (idx < 4) {
      type = EnumDotType.MEDIUM;
    } else {
      type = EnumDotType.SMALL;
    }
  } else if (curPage === 3) {
    //4번째 페이지 일때 배열은 별도로 지정해줌
    // 배열
    // 중 큰 큰 큰 중
    if (idx < 4) {
      if (idx === 0) {
        type = EnumDotType.MEDIUM;
      } else {
        type = EnumDotType.INACTIVE;

        if (curPage === idx) {
          type = EnumDotType.ACTIVE;
        }
      }
    } else if (curPage + 1 === idx) {
      type = EnumDotType.MEDIUM;
    } else {
      type = EnumDotType.SMALL;
    }
  } else {
    //기타는 모두 동일한 로직으로 돌아가도록
    if (idx > curPage) {
      if (idx === curPage + 1) {
        type = EnumDotType.MEDIUM;
      }
    } else if (idx < curPage) {
      if (idx >= curPage - 2) {
        type = EnumDotType.INACTIVE;
      } else if (idx === curPage - 3) {
        type = EnumDotType.MEDIUM;
      }
    } else {
      type = EnumDotType.ACTIVE;
    }
  }

  return DotStyle[type];
};
