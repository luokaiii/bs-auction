import React, { useState } from "react";

import GoodsCard from "../../../components/GoodsCard";

export default () => {
  const [cardList] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  return (
    <div>
      {cardList.map((v, i) => (
        <GoodsCard key={i}/>
      ))}
    </div>
  );
};
