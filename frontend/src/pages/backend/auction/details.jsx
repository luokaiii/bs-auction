import React from "react";
import { Descriptions, Divider, Button } from "antd";
import AuctionRecord from "../../../components/AuctionRecord";

const Pictures = [
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/110329/5/3697/324874/5e1436b0E000652a6/9b61f9e797fda9e0.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/82840/16/13454/51129/5daffac9Ea3cbc27d/ded1f23aad8eff8b.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/47376/7/14002/94252/5daffac9E02fde33a/6c275b4fc553332b.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/95742/20/545/113756/5daffac9E6495fea4/ddd97308809c75e3.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/90716/6/523/54582/5daffacaE732854b7/deb1ca5e49fb8095.jpg"
];

export default () => {
  return (
    <div>
      <Descriptions
        title={
          <div style={{ display: "flex" }}>
            <h3 style={{ marginRight: "20px" }}>拍品详情</h3>
            <Button
              size="small"
              type="primary"
              href="/?#/b/auction/edit/0/edit"
              style={{ marginRight: "10px" }}
            >
              编辑
            </Button>
            <Button size="small" href="/#/b/auction/list/all">
              返回
            </Button>
          </div>
        }
      >
        <Descriptions.Item label="名称" span={3}>
          荣耀MagicBook 2019 第三方Linux版 14英寸轻薄窄边框笔记本电脑（AMD锐龙7
          3700U 8G 512G FHD）冰河银
        </Descriptions.Item>
        <Descriptions.Item label="封面" span={3}>
          <img src={Pictures[0]} alt="" height="70px" />
        </Descriptions.Item>
        <Descriptions.Item label="详情图" span={3}>
          {Pictures.map((v, i) => (
            <img src={v} key={i} alt="" height="70px" />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="简介" span={3}>
          1) PCx1 2) HUAWEI USB-C电源适配器65W x 1 3) 电源适配器线（USB-C） x 1
          4) 快速入门 x 1 5) 保修卡 x 1
        </Descriptions.Item>
        <Descriptions.Item label="详细描述" span={3}>
          本产品全国联保，享受三包服务，质保期为：二年质保
          如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，15日内换货，15日以上在质保期内享受免费保修等三包服务！
          (注:如厂家在商品介绍中有售后保障的说明,则此商品按照厂家说明执行售后保障服务。)
        </Descriptions.Item>
        <Descriptions.Item label="起拍价">￥1000元</Descriptions.Item>
        <Descriptions.Item label="加价幅度">100元/次</Descriptions.Item>
        <Descriptions.Item label="当前最高价">1000元/0次</Descriptions.Item>
        <Descriptions.Item label="物流方式">
          顺丰包邮(全平台支持)
        </Descriptions.Item>
        <Descriptions.Item label="佣金" span={2}>
          无(全平台无佣金)
        </Descriptions.Item>
        <Descriptions.Item label="开始时间">
          2020年3月25日 14:15:20
        </Descriptions.Item>
        <Descriptions.Item label="结束时间" span={2}>
          2020年3月28日 14:15:20
        </Descriptions.Item>
      </Descriptions>
      <Divider children="出价记录" />
      <AuctionRecord />
    </div>
  );
};
