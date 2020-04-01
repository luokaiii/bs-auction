import React from "react";
import { Divider } from "antd";

export default function about() {
  return (
    <div className="page">
      <Divider children="支付流程(以下均为模拟数据，非真实数据)" />
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        我们支持多种支付方式，且不收取任何手续费：
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        1、微信支付：支持国内大部分银行、支持信用卡支付；
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        2、支付宝支付：支持国内绝大部分银行、也支持信用卡、花呗等支付。
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>3、银行转账付款。</p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>4、合作余额支付。</p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        <br />
      </p>
      <p style={{ textAlign: "start", textIndent: "2em" }}>
        特别说明：本项目为Mock模式，不涉及真实支付场景。
      </p>
    </div>
  );
}
