import React, { useState, useEffect } from "react";

import GoodsCard from "../../../components/GoodsCard";
import { getByPage } from "../../../service/GoodsApi";

export default ({ type }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getByPage({ page: 0, size: 7, sort: "createTime,desc", type }).then(res => {
      setList(res.data.content);
    });
  }, [type]);

  return (
    <div>
      {list.map((v, i) => (
        <GoodsCard key={i} data={v} />
      ))}
      <GoodsCard isMore={true} />
    </div>
  );
};
