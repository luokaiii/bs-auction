package cn.bs.auction.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@javax.persistence.Entity
@Table(name = "table_goods")
@Data
public class Goods extends Entity{
    /* 名称 */
    private String name;
    /* 仓库地址 */
    private String warehouse;
    /* 拍卖类型 */
    private Type type;
    /* 封面 */
    private String cover;
    /* 详情图 */
    private String pictures;
    /* 起拍价 */
    private Long start;
    /* 加价幅度 */
    private Long range;
    /* 出货商 */
    private String provider;
    /* 用户名 */
    private String username;
    /* 用户ID */
    private Integer userId;
    /* 交货方式 */
    private String deliveryMethod;
    /* 交货时间 */
    private String deliveryTime;
    /* 商品状态 */
    private Status status;
    /* 创建时间 */
    private LocalDateTime createTime;
    /* 开始时间 */
    private LocalDateTime startTime;
    /* 结束时间 */
    private LocalDateTime endTime;
    /* 竞拍记录 */
    private String records;
    /* 中标用户 */
    private String auctionUsername;

    public enum Type {

    }
    /*  */
    public enum Status {
        /* 待发起 */
        CREATED,
        /* 竞拍开始 */
        STARTED,
        /* 竞拍结束 */
        END,
    }

    public enum Method {
        /* 物流 */
        EXPRESS,
        /* 自提 */
        PICK_UP
    }
}
