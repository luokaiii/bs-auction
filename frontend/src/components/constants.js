import moment from "moment";
import { Modal } from "antd";

export const formatDate = date => {
  return (
    moment(date)
      // .utcOffset(960)
      .format("YYYY-MM-DD HH:mm:ss")
  );
};

export const showConfirm = fun => {
  Modal.confirm({
    title: "确定要进行该操作吗？",
    onOk() {
      fun();
    }
  });
};

export const GoodsType = {
  PHONE: "手机",
  BOOKS: "图书",
  CLOTHING: "服装",
  JEWELRY: "珠宝首饰",
  DIGITAL: "3C数码",
  CAR: "汽车用品",
  OTHER: "其它"
};

export const GoodsStatus = {
  CREATED: "等待中",
  STARTED: "竞拍进行中",
  END: "竞拍结束"
};
