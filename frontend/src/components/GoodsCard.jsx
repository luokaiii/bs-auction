import React from "react";
import { Icon } from "antd";
import "./GoodsCard.less";

export default () => {
  const gotoDetails = () => {
    window.location.href = "/#/f/details/0";
  };
  return (
    <div className="goods-card" onClick={gotoDetails}>
      <div className="picture">
        <img
          alt=""
          src="http://imgs.qudiandi.com/20200320/87429fa2ae2d55ad77c950c0cbfa9351.jpg!210w_210h_4e"
        />
      </div>
      <div className="title">
        （乙4262）原田由己编辑《标笺正、续文章轨范》和刻本 线装6册全
        正、续各七卷3册 一部古文选评集
      </div>
      <div className="price-view">
        <div className="left">
          <div>
            起拍价：<span className="red">￥40000000</span>
          </div>
          <div>
            当前价：<span className="red">￥400</span>
          </div>
        </div>
        <div className="right">
          竞拍次数：
          <Icon type="fire" theme="twoTone" />
          15
        </div>
      </div>
    </div>
  );
};
