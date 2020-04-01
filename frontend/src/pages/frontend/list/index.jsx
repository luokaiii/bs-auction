import React, { useEffect } from "react";
import { Breadcrumb, Icon, Radio, Row, Col, Pagination, Form } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

import { getByPage } from "../../../service/GoodsApi";
import GoodsCard from "../../../components/GoodsCard";
import "./index.less";
import { useState } from "react";
import { useCallback } from "react";

export default Form.create()(({ form }) => {
  const [data, setData] = useState({});
  const [recommend, setRecommend] = useState([]);
  const [sort, setSort] = useState("createTime,desc");
  const { getFieldDecorator } = form;

  const loadRecommend = () => {
    getByPage({ page: 0, size: 3, sort: "createTime,desc" }).then(res => {
      setRecommend(res.data.content);
    });
  };

  const loadData = useCallback(
    (params = { page: 0, size: 9, sort }) => {
      getByPage(Object.assign({ size: 9, sort }, params)).then(res => {
        setData(res.data);
      });
    },
    [sort]
  );

  useEffect(() => {
    loadData();
    loadRecommend();
  }, [loadData]);

  const pagination = {
    current: data.number + 1 || 0,
    total: data.totalElements || 0,
    pageSize: data.size || 0,
    onChange: (page, size) => {
      loadData({ page: page - 1, size, sort: "createTime,desc" });
    }
  };

  const handleChange = () => {
    form.validateFields((err, values) => {
      if (!err) {
        loadData(values);
      }
    });
  };

  const updateSort = e => {
    setSort(e.target.value);
  };

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
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              onChange={handleChange}
            >
              <Form.Item label="类型">
                {getFieldDecorator("type")(
                  <Radio.Group>
                    <Radio value="">不限</Radio>
                    <Radio value="PHONE">手机</Radio>
                    <Radio value="BOOKS">图书</Radio>
                    <Radio value="CLOTHING">服装</Radio>
                    <Radio value="JEWELRY">珠宝首饰</Radio>
                    <Radio value="DIGITAL">3C数码</Radio>
                    <Radio value="CAR">汽车用品</Radio>
                    <Radio value="OTHER">其它</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator("status")(
                  <Radio.Group>
                    <Radio value="">不限</Radio>
                    <Radio value="STARTED">竞拍中</Radio>
                    <Radio value="CREATED">尚未开始</Radio>
                    <Radio value="END">已结束</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Form>
          </div>
          <div className="bg-white-div content-list">
            <div className="sort">
              <span>排序：</span>
              <Radio.Group value={sort} onChange={updateSort}>
                <Radio.Button value="createTime,desc">综合</Radio.Button>
                <Radio.Button value="startPrice,asc">起拍价↓</Radio.Button>
                <Radio.Button value="time,desc">竞拍次数↓</Radio.Button>
                <Radio.Button value="startTime,desc">开始时间↓</Radio.Button>
                <Radio.Button value="endTime,desc">结束时间↓</Radio.Button>
              </Radio.Group>
            </div>
            <div className="item-list">
              {data.content &&
                data.content.map((v, i) => <GoodsCard data={v} key={i} />)}
            </div>
            <div className="pagination">
              <Pagination {...pagination} />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white-div">
            <h1 style={{ textAlign: "center", padding: "10px 0" }}>热门推荐</h1>
            <div className="item-list">
              {recommend.map((v, i) => (
                <GoodsCard data={v} key={i} />
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});
