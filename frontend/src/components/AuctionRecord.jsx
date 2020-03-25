import React, { useState } from "react";

import { Skeleton, List, Avatar, Button } from "antd";

export default () => {
  const [bidList, setBidList] = useState([{}, {}, {}, {}, {}]);
  const loadMore = () => {
    setBidList([...[{}, {}, {}], ...bidList]);
  };
  return (
    <List
      itemLayout="horizontal"
      loadMore={
        <Button block style={{ border: "none" }} onClick={loadMore}>
          查看更多
        </Button>
      }
      dataSource={bidList}
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
