package cn.bs.auction.dao;

import cn.bs.auction.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRep extends JpaRepository<Auction, Integer> {
}
