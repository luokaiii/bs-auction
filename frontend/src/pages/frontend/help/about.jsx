import React from "react";
import { Divider } from "antd";

export default function about() {
  return (
    <div className="page">
      <Divider children="关于我们(以下均为模拟数据，非真实数据)" />
      <p style={{ textAlign: "justify", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          本拍卖系统是一家拍卖公司，我们拥有数十位专家鉴定队伍，所有拍品都由本公司过眼鉴定，并做保真担保。
        </span>
      </p>
      <p style={{ textAlign: "justify", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          鉴于微拍泛滥、地摊横行，市场鱼龙混杂，劣币驱除良币的状况。本平台有意做一个收藏品市场的”网易严选”，本产品要求拍品均需送到公司，经我们查验审核，然后统一上拍发货。
          <strong>
            <span style={{ color: "#ff4c41" }}>
              让买家：“只根据个人喜好竞买，不用担心真假问题”，
            </span>
          </strong>
          <span style={{ color: "#000000" }}>是我们自始至终的追求。我们</span>
          保证所有拍品保真、如实描述。
        </span>
      </p>
      <p style={{ textAlign: "justify", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>拍卖平台，是信誉的点滴积累；</span>
      </p>
      <p style={{ textAlign: "justify", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          本拍卖平台，是去除实体拍卖的暴利，进入拍卖微利时代；
        </span>
      </p>
      <p style={{ textAlign: "justify", textIndent: "2em" }}>
        <span style={{ fontSize: "15px" }}>
          本拍卖平台，是在收藏品市场，用匠心的态度，一点一滴的做好、做专业。
        </span>
      </p>
    </div>
  );
}
