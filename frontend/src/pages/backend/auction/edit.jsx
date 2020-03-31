import React, { useState, useEffect } from "react";
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
  ConfigProvider,
  Button,
  notification
} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";

import { create, getById, update } from "../../../service/GoodsApi";
import MyUpload from "../../../components/MyUpload";
import "./edit.less";

export default Form.create()(({ form, match }) => {
  const [data, setData] = useState({});
  const [cover, setCover] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [dateValue, setDateValue] = useState(moment());
  const [timeValue, setTimeValue] = useState(moment());
  const { getFieldDecorator } = form;
  const { id } = match.params;

  useEffect(() => {
    if (id === "0") return;
    getById(id).then(res => {
      const pics = res.data.pictures.split(",").map((v, i) => {
        return {
          uid: i,
          name: "image.jpg",
          status: "done",
          url: v
        };
      });
      setData(res.data);
      setCover([
        {
          uid: 1,
          name: "image.jpg",
          status: "done",
          url: res.data.cover
        }
      ]);
      setPictures(pics);
      setDateValue(moment(res.data.startTime));
      setTimeValue(moment(res.data.startTime));
    });
  }, [id]);

  const handleDate = date => {
    setDateValue(date);
  };

  const handleTime = time => {
    setTimeValue(time);
  };

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        // if (cover.length === 0) {
        //   notification.error({
        //     message: "请上传封面"
        //   });
        // }
        // if (pictures.length === 0) {
        //   notification.error({
        //     message: "请上传详情图"
        //   });
        // }
        const createTime = moment().add(8, "h");
        const startTime = moment(
          dateValue.format("YYYY-MM-DD") + timeValue.format().slice(10)
        ).add(8, "h");
        const endTime = moment(
          dateValue.format("YYYY-MM-DD") + timeValue.format().slice(10)
        )
          .add(values.duration, "h")
          .add(8, "h");
        const params = ;

        if (id === "0") {
          create(Object.assign(
            {
              cover: cover[0].url,
              pictures: pictures.map(v => v.url).join(","),
              createTime,
              startTime,
              endTime,
              currentPrice: values.startPrice,
              status: "CREATED",
              time: 0
            },
            values
          )).then(res => {
            window.location.href = "/#/b/auction/list/all";
          });
        } else {
          update(id, Object.assign(
            {
              cover: cover[0].url,
              pictures: pictures.map(v => v.url).join(","),
              startTime,
              endTime,
              status: "CREATED",
              time: 0
            },
            values
          )).then(res => {
            window.location.href = "/#/b/auction/list/all";
          });
        }
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
            initialValue: data.name,
            rules: [{ required: true, message: "标题不能为空" }]
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item label="简介">
          <Row>
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("introduce", {
                  initialValue: data.introduce,
                  rules: [{ required: true, message: "简介不能为空" }]
                })(<Input.TextArea placeholder="请输入简介" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                {getFieldDecorator("type", {
                  initialValue: data.type,
                  rules: [{ required: true, message: "类型不能为空" }]
                })(
                  <Select placeholder="请选择分类">
                    <Select.Option value="PHONE">手机</Select.Option>
                    <Select.Option value="BOOKS">图书</Select.Option>
                    <Select.Option value="CLOTHING">服装</Select.Option>
                    <Select.Option value="JEWELRY">珠宝首饰</Select.Option>
                    <Select.Option value="DIGITAL">3C数码</Select.Option>
                    <Select.Option value="CAR">汽车用品</Select.Option>
                    <Select.Option value="OTHER">其它</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="详细描述">
          {getFieldDecorator("description", {
            initialValue: data.description,
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
                  initialValue: data.startPrice,
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
                  initialValue: data.range || "100",
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
                <ConfigProvider locale={zh_CN}>
                  <DatePicker
                    disabledDate={disabledDate}
                    onChange={handleDate}
                    value={dateValue}
                  />
                  <TimePicker
                    format="HH:mm"
                    onChange={handleTime}
                    value={timeValue}
                  />
                </ConfigProvider>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="持续时长">
                {getFieldDecorator("duration", {
                  initialValue: "24",
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
          disabled={data.status && data.status !== "CREATED"}
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
