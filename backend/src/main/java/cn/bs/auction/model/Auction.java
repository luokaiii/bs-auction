package cn.bs.auction.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 竞拍表
 */
@EqualsAndHashCode(callSuper = true)
@javax.persistence.Entity
@Table(name = "table_auction")
@Data
public class Auction extends Entity {
    /* 用户名 */
    private String username;
    /* 用户ID */
    private Integer userId;
    /* 竞拍价格 */
    private Long price;
    /* 完成时间 */
    private LocalDateTime finishTime;
    /* 状态 */
    private Status status;
    /* 竞拍时间 */
    private LocalDateTime createTime;

    /* 竞品ID */
    private Integer goodsId;
    /* 竞品名称 */
    private String goodsName;
    /* 竞品封面 */
    private String goodsCover;
    /* 竞品开始时间 */
    private LocalDateTime goodsStartTime;
    /* 竞品结束时间 */
    private LocalDateTime goodsEndTime;

    public enum Status {
        /* 竞拍中 */
        CREATED,
        /* 中标 */
        BID,
        /* 未中标 */
        UN_BID,
        /* 完成 */
        FINISHED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Integer getId() {
        return super.getId();
    }
}
