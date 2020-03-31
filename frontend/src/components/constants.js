import moment from "moment";
import { Modal } from "antd";

export const formatDate = date => {
  return moment(date)
    // .utcOffset(960)
    .format("YYYY-MM-DD HH:mm:ss");
};

export const showConfirm = fun => {
  Modal.confirm({
    title: "确定要进行该操作吗？",
    onOk() {
      fun();
    }
  });
};
