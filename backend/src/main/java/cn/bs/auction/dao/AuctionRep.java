package cn.bs.auction.dao;

import cn.bs.auction.model.Auction;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRep extends JpaRepository<Auction, Integer> {

    List<Auction> findByGoodsId(Integer goodsId, Sort sort);
}
