import React, { useState } from "react";
import { Form, Input, Icon, Button, message, notification } from "antd";

import { registry } from "../../../service/UserApi";
import MyUpload from "../../../components/MyUpload";

export default Form.create()(({ form }) => {
  const [profile, setProfile] = useState([]);
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (profile.length === 0) {
          notification.error({ message: "请上传头像" });
          return;
        }
        const data = Object.assign(
          {
            avatar: profile[0].url,
            role: "ADMIN",
            disabled: false,
            createDate: new Date()
          },
          values
        );
        console.log(data);
        registry(data)
          .then(() => {
            message.success("添加成功");
            setTimeout(() => {
              window.location.href = "/#/b/user/list/ADMIN";
            }, 1000);
          })
          .catch(() => {
            message.error("添加失败，用户已存在");
          });
      }
    });
  };

  return (
    <div>
      <div className="top-div">
        <h2>创建后台账户</h2>
        <div>
          <Button href="/#/b/user/list/ADMIN">返回</Button>
        </div>
      </div>
      <Form
        className="form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onSubmit={handleSubmit}
      >
        <Form.Item label="头像">
          <MyUpload
            fileList={profile}
            setFileList={setProfile}
            replace={true}
          />
        </Form.Item>
        <Form.Item label="登录用户名">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "用户名不能为空" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名 为6-18位字母、数字组合"
            />
          )}
        </Form.Item>
        <Form.Item label="登录密码">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "密码不能为空" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码 为6-18位字母、数字组合"
            />
          )}
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
        <div style={{ width: "300px", margin: "50px auto" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            添 加
          </Button>
        </div>
      </Form>
    </div>
  );
});
