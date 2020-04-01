import React from "react";
import { Divider } from "antd";

export default function about() {
  return (
    <div className="page">
      <Divider children="拍卖规则(以下均为模拟数据，非真实数据)" />
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ color: "#3e3e3e" }}>
          <strong>
            <span style={{ fontSize: "16px" }}>本拍卖平台拍卖规则简述</span>
          </strong>
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}></p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ color: "#ff4c00" }}>
          <span style={{ fontSize: "15px" }}>一 、拍卖程序：</span>
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          <strong>在线拍卖 </strong>
          自由出价，有不定时的自由出价时间，买家依据设置好的阶梯出价，自由出价时间结束后，将不得再进行商品的竞拍。
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ color: "#ff4c00" }}>
          <span style={{ fontSize: "15px" }}>二 、关于拍品：</span>
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          拍卖开始前的预展期间，请买家认真查看图片和描述，有疑问及时发信息或电话询问。所有拍品经过网站查验，全部保真。
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          <span style={{ color: "#ff4c00" }}>三、交割：</span>
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          竞买成功后，买家应在三日内交割付款，否则视为违约，平台有权关闭交易。违约有对应的信用评价体系处理。
        </span>
        <br />
        <span style={{ fontSize: "15px" }}>
          本平台为模拟交易场景，因此不具备物流、交易等其它情景。
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          <span style={{ color: "#ff4c00" }}>四、邮寄方式：</span>
        </span>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          全部顺丰邮寄，运费由买家承担。发货时间为工作日三天内发货。
        </span>
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
    </div>
  );
}
