import React, { useState, useEffect, useRef } from "react";

import { formatDate } from "./constants";
import { getByList } from "../service/AuctionApi";
import { Skeleton, List, Avatar, Button, Badge, Tag } from "antd";
import { useCallback } from "react";

export default ({ goodsId }) => {
  const [data, setData] = useState([]);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // 保存新回调
    useEffect(() => {
      savedCallback.current = callback;
    });

    // 建立 interval
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    loadList();
  }, 5000);

  const loadList = useCallback(
    (params = { sort: "createTime,desc", goodsId }) => {
      getByList(params).then(res => {
        setData(res.data);
      });
    },
    [goodsId]
  );

  useEffect(() => {
    loadList();
  }, [loadList]);

  return (
    <List
      className="scroll-container"
      style={{ height: "360px", overflow: "auto" }}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={<Avatar src={item.userProfile} />}
              title={
                <span>
                  {item.username}
                  {index === 0 && <Tag color="#f50">最高价</Tag>}
                </span>
              }
              description={
                <span>
                  出价 <span style={{ color: "#f50" }}>{item.price}</span> 元
                </span>
              }
            />
            <div style={{ marginRight: "10px" }}>
              {formatDate(item.createTime)}
            </div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
