import React, { useState } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  Row,
  Col,
  InputNumber,
  Steps,
  Result,
  message,
  notification
} from "antd";

import { registry } from "../../../service/UserApi";
import MyUpload from "../../../components/MyUpload";
import "./registry.less";

export default Form.create()(({ form }) => {
  const [avatar, setAvatar] = useState([]);
  const [current, setCurrent] = useState(0);
  const [form1Values, setForm1Values] = useState({});
  const [authCode, setAuthCode] = useState(
    Math.floor(Math.random() * 9000) + 1000
  );
  const { getFieldDecorator } = form;

  const checkUsername = (rule, value, callback) => {
    if (value && (value.length < 6 || value.length > 18)) {
      callback("用户名长度不正确");
    } else {
      callback();
    }
  };

  const checkPassword = (rule, value, callback) => {
    if (value && (value.length < 6 || value.length > 18)) {
      callback("密码长度不正确");
    } else {
      callback();
    }
  };

  const checkAuthCode = (rule, value, callback) => {
    if (value && value + "" !== authCode + "") {
      callback("验证码不正确");
    } else {
      callback();
    }
  };

  const checkConfirmPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致");
    } else {
      callback();
    }
  };

  const updateCode = () => {
    setAuthCode(Math.floor(Math.random() * 9000) + 1000);
  };

  const handleSubmit1 = e => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setForm1Values(values);
        setCurrent(1);
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (avatar.length === 0) {
          notification.error({
            message: "请上传头像"
          });
          return;
        }
        const data = Object.assign(
          {
            avatar: avatar[0].url,
            role: "CUSTOMER",
            disabled: false,
            createDate: new Date()
          },
          form1Values,
          values
        );
        registry(data)
          .then(() => {
            setCurrent(2);
          })
          .catch(() => {
            message.error("注册失败，用户已存在");
          });
      }
    });
  };

  return (
    <div className="registry">
      <div style={{ height: "70px" }}></div>
      <div className="login-div">
        <h3 className="title">注册并填写信息</h3>
        <Steps current={current}>
          <Steps.Step title="注册" />
          <Steps.Step title="完善" />
          <Steps.Step title="完成" />
        </Steps>

        {current === 0 && (
          <Form onSubmit={handleSubmit1}>
            <div>
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "用户名不能为空" },
                    { validator: checkUsername }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="用户名 为6-18位字母、数字组合"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "密码不能为空" },
                    { validator: checkPassword }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码 为6-18位字母、数字组合"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password2", {
                  rules: [
                    { required: true, message: "请再次输入密码" },
                    { validator: checkConfirmPassword }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="请再次输入密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("auth-code", {
                  rules: [
                    { required: true, message: "验证码不能为空" },
                    { validator: checkAuthCode }
                  ]
                })(
                  <Row>
                    <Col span={16}>
                      <InputNumber placeholder="请输入验证码" max={9999} />
                    </Col>
                    <Col span={8}>
                      <div className="auth-code" onClick={updateCode}>
                        {authCode}
                      </div>
                    </Col>
                  </Row>
                )}
              </Form.Item>
              <Button block type="primary" htmlType="submit">
                下一步
              </Button>
            </div>
          </Form>
        )}
        {current === 1 && (
          <Form onSubmit={handleSubmit}>
            <div>
              <Form.Item label="头像">
                <MyUpload
                  fileList={avatar}
                  setFileList={setAvatar}
                  replace={true}
                />
              </Form.Item>
              <Form.Item label="昵称">
                {getFieldDecorator("nickname", {
                  rules: [{ required: true, message: "昵称不能为空" }]
                })(
                  <Input
                    prefix={
                      <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="昵称 为2-12位字符"
                  />
                )}
              </Form.Item>
              <Form.Item label="联系方式">
                {getFieldDecorator("phone", {
                  rules: [{ required: true, message: "联系方式不能为空" }]
                })(
                  <Input
                    prefix={
                      <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入联系方式"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  注 册
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}

        {current === 2 && (
          <Result
            status="success"
            title="注册成功"
            extra={[
              <Button key="login" href="/#/f/login">
                去登陆
              </Button>
            ]}
          />
        )}
      </div>
    </div>
  );
});
