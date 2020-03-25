import React, { useState } from "react";
import {
  Form,
  message,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
  TimePicker,
  LocaleProvider,
  Button
} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

import MyUpload from "../../../components/MyUpload";
import "./edit.less";
import moment from "moment";

export default Form.create()(({ form, match }) => {
  const [cover, setCover] = useState([]);
  const [pictures, setPictures] = useState([]);
  const { getFieldDecorator } = form;
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        message.success("修改成功，返回列表...");
        setTimeout(() => {
          window.location.href = "/#/b/auction/list/all";
        }, 1000);
      }
    });
  };

  const disabledDate = current => {
    return (
      current &&
      current <
        moment()
          .endOf("day")
          .valueOf() -
          24 * 1000 * 60 * 60
    );
  };

  return (
    <div>
      <h3>编辑拍品</h3>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onSubmit={handleSubmit}
      >
        <Form.Item label="标题">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "标题不能为空" }]
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item label="简介">
          {getFieldDecorator("introduce", {
            rules: [{ required: true, message: "简介不能为空" }]
          })(<Input.TextArea placeholder="请输入简介" />)}
        </Form.Item>
        <Form.Item label="详细描述">
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "详细描述不能为空" }]
          })(<Input.TextArea placeholder="请输入详细描述" />)}
        </Form.Item>
        <Form.Item label="封面">
          <MyUpload fileList={cover} setFileList={setCover} replace={true} />
        </Form.Item>
        <Form.Item label="详情图">
          <MyUpload
            fileList={pictures}
            setFileList={setPictures}
            replace={false}
          />
        </Form.Item>
        <Form.Item label="价格设置">
          <Row>
            <Col span={12}>
              <Form.Item label="起拍价">
                {getFieldDecorator("startPrice", {
                  rules: [{ required: true, message: "起拍价不能为空" }]
                })(
                  <InputNumber
                    style={{ width: "200px" }}
                    placeholder="请输入起拍价 eg: 2000"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="加价幅度">
                {getFieldDecorator("range", {
                  initialValue: "100",
                  rules: [{ required: true, message: "加价幅度" }]
                })(
                  <Select>
                    <Select.Option value="10">10 元/次</Select.Option>
                    <Select.Option value="20">20 元/次</Select.Option>
                    <Select.Option value="50">50 元/次</Select.Option>
                    <Select.Option value="80">80 元/次</Select.Option>
                    <Select.Option value="100">100 元/次</Select.Option>
                    <Select.Option value="200">200 元/次</Select.Option>
                    <Select.Option value="500">500 元/次</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="时间设置">
          <Row>
            <Col span={12}>
              <Form.Item label="开始时间">
                <LocaleProvider locale={zh_CN}>
                  <DatePicker disabledDate={disabledDate} />
                  <TimePicker format="HH:mm" />
                </LocaleProvider>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="持续时长">
                {getFieldDecorator("duration", {
                  initialValue: "3",
                  rules: [{ required: true, message: "请选择拍卖持续时长" }]
                })(
                  <Select>
                    <Select.Option value="1">1小时后</Select.Option>
                    <Select.Option value="3">3小时后</Select.Option>
                    <Select.Option value="6">6小时后</Select.Option>
                    <Select.Option value="12">12小时后</Select.Option>
                    <Select.Option value="24">1天后</Select.Option>
                    <Select.Option value="48">2天后</Select.Option>
                    <Select.Option value="36">3天后</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{
            margin: "30px 0 10px 0",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff"
          }}
        >
          保存
        </Button>
      </Form>
    </div>
  );
});
