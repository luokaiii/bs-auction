import React from "react";
import {
  Breadcrumb,
  Icon,
  Tag,
  Carousel,
  InputNumber,
  Button,
  List,
  Skeleton,
  Avatar,
  Radio,
  Row,
  Col,
  Pagination,
  Form
} from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

import GoodsCard from "../../../components/GoodsCard";
import "./index.less";

export default () => {
  return (
    <div className="width-content list">
      <Breadcrumb>
        <BreadcrumbItem href="/#/f/home">
          <Icon type="home" /> 首页
        </BreadcrumbItem>
        <BreadcrumbItem href="/#/f/list">
          <Icon type="table" /> 全部拍品
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span={18}>
          <div className="bg-white-div tag-list">
            <Form labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              <Form.Item label="类型">
                <Radio.Group>
                  <Radio>不限</Radio>
                  <Radio>手机</Radio>,<Radio>图书</Radio>,<Radio>服装</Radio>,
                  <Radio>珠宝首饰</Radio>,<Radio>3C数码</Radio>,
                  <Radio>汽车用品</Radio>,
                </Radio.Group>
              </Form.Item>
              <Form.Item label="标签">
                <Radio.Group>
                  <Radio>不限</Radio>
                  <Radio>全新</Radio>,<Radio>nice</Radio>,<Radio>好看</Radio>,
                  <Radio>几乎全新</Radio>,<Radio>男士必备</Radio>,
                  <Radio>女士必备</Radio>,
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
          <div className="bg-white-div content-list">
            <div className="sort">
              <span>排序：</span>
              <Radio.Group>
                <Radio.Button value="id,desc">综合</Radio.Button>
                <Radio.Button value="price,asc">起拍价↓</Radio.Button>
                <Radio.Button value="time,desc">竞拍次数↓</Radio.Button>
                <Radio.Button value="publishTime,desc">发布时间↓</Radio.Button>
              </Radio.Group>
            </div>
            <div className="item-list">
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
            </div>
            <div className="pagination">
              <Pagination defaultCurrent={6} total={500} />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white-div">
            <h1 style={{ textAlign: "center", padding: "10px 0" }}>热门推荐</h1>
            <div className="item-list">
              <GoodsCard />
              <GoodsCard />
              <GoodsCard />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
