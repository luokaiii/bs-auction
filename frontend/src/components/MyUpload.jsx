// 自定义上传组件
import React from "react";
import { Upload, Icon } from "antd";

import { upload } from "../service/FileApi";

export default ({ fileList, setFileList, replace = true }) => {
  const customRequest = opt => {
    upload(opt.file).then(res => {
      const result = {
        uid: Math.random(),
        name: "image.jpg",
        status: "done",
        url: res.data
      };
      if (replace) {
        setFileList([result]);
      } else {
        setFileList([result, ...fileList]);
      }
    });
  };

  const customRemove = file => {
    const files = fileList.filter(v => v.uid !== file.uid);
    setFileList(files);
  };

  return (
    <Upload
      fileList={fileList}
      listType="picture-card"
      accept=".jpg,.jpeg,.png"
      onRemove={customRemove}
      customRequest={customRequest}
    >
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    </Upload>
  );
};
