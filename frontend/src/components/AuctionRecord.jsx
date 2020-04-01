import React, { useState, useEffect, useRef } from "react";

import { getByPage } from "../service/AuctionApi";
import { Skeleton, List, Avatar, Button } from "antd";
import { useCallback } from "react";

export default ({ goodsId }) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(true);

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

  if (data.status === "STARTED") {
    useInterval(() => {
      loadList();
    }, 5000);
  }

  const loadList = useCallback(
    (params = { page, size: 5, sort: "createTime,desc", goodsId }) => {
      getByPage(params).then(res => {
        setData(res.data);
        setNoMore(res.data.last);
      });
    },
    [goodsId, page]
  );

  useEffect(() => {
    loadList();
  }, [loadList]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <List
      itemLayout="horizontal"
      loadMore={
        <Button
          block
          style={{ border: "none" }}
          disabled={noMore}
          onClick={loadMore}
        >
          查看更多
        </Button>
      }
      dataSource={data.content || []}
      renderItem={item => (
        <List.Item>
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="张三"
              description="出价 11000 元"
            />
            <div>2020年03月24日 10时14分33秒</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
