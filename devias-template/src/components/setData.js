import React, { useEffect, useState } from 'react';
import { getClickCount, getViewCount, logClick, logView } from './company_card/apiWidget';

export default function GetClickCounts() {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getClickCount();
      if (data) {
        setClickCount(data.clickCount);
        return clickCount;
      }
    })();
  }, []);
}
