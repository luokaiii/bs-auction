package cn.bs.auction.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;
import java.time.LocalDateTime;

/**
 * 竞拍表
 */
@EqualsAndHashCode(callSuper = true)
@javax.persistence.Entity
@Table(name = "table_auction")
@Data
public class Auction extends Entity{
    /* 用户名 */
    private String username;
    /* 用户ID */
    private Integer userId;
    /* 用户ID */
    private Integer goodsId;
    /* 名称 */
    private String goodsName;
    /* 开始时间 */
    private LocalDateTime goodsStartTime;
    /* 结束时间 */
    private LocalDateTime goodsEndTime;
    /* 竞拍价格 */
    private Long price;
    /* 支付时间 */
    private LocalDateTime payTime;
    /* 发货时间 */
    private LocalDateTime shipTime;
    /* 状态 */
    private Status status;

    public enum Status {
        /* 待审核 */
        CREATED,
        /* 已审核、待付款 */
        UN_PAY,
        /* 已支付、待发货 */
        PAYED,
        /* 已发货，结束 */
        SHIP
    }
}
