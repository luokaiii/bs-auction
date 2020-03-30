package cn.bs.auction.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@javax.persistence.Entity
@Table(name = "table_goods")
@Data
public class Goods extends Entity {
    /* 名称 */
    @NotEmpty
    private String name;
    /* 拍卖类型 */
    @NotNull
    private Type type;
    /* 封面 */
    @NotEmpty
    private String cover;
    /* 详情图 */
    @NotEmpty
    private String pictures;
    /* 简介 */
    @NotEmpty
    private String introduce;
    /* 描述 */
    @NotEmpty
    private String description;
    /* 起拍价 */
    @NotNull
    private Long startPrice;
    /* 加价幅度 */
    @NotNull
    private Long range;
    /* 当前价格 */
    private Long currentPrice;
    /* 竞拍次数 */
    private Long time;
    /* 商品状态 */
    private Status status;
    /* 是否下架，带默认值，增改查都会带着 */
    private Boolean deleted = false;

    /* 创建人 */
    private String username;
    /* 创建人ID */
    private Integer userId;

    /* 创建时间 */
    private LocalDateTime createTime;
    /* 开始时间 */
    private LocalDateTime startTime;
    /* 结束时间 */
    private LocalDateTime endTime;

    /* 中标用户名称 */
    private String auctionUsername;
    /* 中标用户ID */
    private String auctionUserId;
    /* 中标价格 */
    private String auctionPrice;

    public enum Type {
        /* 手机 */
        PHONE,
        /* 图书 */
        BOOKS,
        /* 服装 */
        CLOTHING,
        /* 珠宝首饰 */
        JEWELRY,
        /* 3C数码 */
        DIGITAL,
        /* 汽车用品 */
        CAR,
        /* 其它 */
        OTHER
    }

    /*  */
    public enum Status {
        /* 等待中 */
        CREATED,
        /* 竞拍进行中 */
        STARTED,
        /* 竞拍结束 */
        END,
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Integer getId() {
        return super.getId();
    }

    @Column(length = 2000)
    public String getPictures() {
        return pictures;
    }
}
