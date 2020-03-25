import React from "react";

import { Form, Input, Icon, Checkbox, Button } from "antd";

import "./login.less";

export default Form.create()(({ form }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setTimeout(() => {
          window.location.href = "/#/f/home";
        }, 1500);
      }
    });
  };

  return (
    <div className="login">
      <div style={{ height: "100px" }}></div>
      <div className="login-div">
        <h2 className="title">欢迎登陆</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "用户名不能为空" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "密码不能为空" }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox>记住我</Checkbox>
            <Button type="primary" htmlType="submit" block>
              登 录
            </Button>
            <div style={{ textAlign: "right" }}>
              忘记密码？点我
              <Button type="link" href="/#/f/reset">
                找回密码
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
