import { BaseSyntheticEvent } from 'react';

class InfiniteScrollUtil {
  hasReachedDivBottom = (event: BaseSyntheticEvent) => {
    return (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    );
  };
}

const infiniteScrollUtil = new InfiniteScrollUtil();
export default infiniteScrollUtil;
