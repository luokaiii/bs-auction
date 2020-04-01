package cn.bs.auction.config;

import cn.bs.auction.dao.AuctionRep;
import cn.bs.auction.dao.GoodsRep;
import cn.bs.auction.model.Auction;
import cn.bs.auction.model.Goods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * 定时任务，每分钟查询一次是否有到期的竞拍
 * 1. 已到开始时间，但是状态为等待的
 * —— 更改竞拍状态为进行中
 * —— 放开参与竞拍功能
 * 2. 已到结束时间，但是状态为进行中的
 * —— 更改竞拍状态为结束
 * —— 选择竞拍价格最高的订单，改为中标
 * —— 竞拍中标人设置为订单人
 * —— 其余订单，改为未中标
 */
@Configuration
@EnableScheduling
public class TimeTask {
    private final GoodsRep goodsRep;

    private final AuctionRep auctionRep;

    @Autowired
    public TimeTask(GoodsRep goodsRep,
                    AuctionRep auctionRep) {
        this.goodsRep = goodsRep;
        this.auctionRep = auctionRep;
    }

    @Scheduled(fixedDelay = 60 * 1000)
    public void doSomething() {
        Date date = new Date();
        LocalDateTime now = LocalDateTime.now();
        List<Goods> starting = goodsRep.findByStartTimeGteAndStatus(now, Goods.Status.CREATED);
        if (starting.size() > 0) {
            starting.forEach(goods -> goods.setStatus(Goods.Status.STARTED));
            goodsRep.saveAll(starting);
        }

        Sort sort = Sort.by(Sort.Direction.DESC, "price");
        List<Goods> ending = goodsRep.findByEndTimeGteAndStatus(now, Goods.Status.STARTED);
        for (Goods goods : ending) {
            List<Auction> auctions = auctionRep.findByGoodsId(goods.getId(), sort);
            if (auctions.size() > 0) {
                Auction first = auctions.get(0);
                System.out.println(String.format("用户[%s],中标商品[%s],价格[%s]", first.getUsername(), first.getGoodsName(), first.getPrice()));
                goods.setAuctionUserId(first.getUserId());
                goods.setAuctionUsername(first.getUsername());
                goods.setAuctionPrice(first.getPrice());
                auctions.forEach(auction -> auction.setStatus(Auction.Status.UN_BID));
                first.setStatus(Auction.Status.BID);
                auctionRep.saveAll(auctions);
            }
        }
        if (ending.size() > 0) {
            ending.forEach(goods -> goods.setStatus(Goods.Status.END));
            goodsRep.saveAll(ending);
        }

    }
}
