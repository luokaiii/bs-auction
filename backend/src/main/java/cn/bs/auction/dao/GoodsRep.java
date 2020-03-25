package cn.bs.auction.dao;

import cn.bs.auction.model.Goods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsRep extends JpaRepository<Goods, Integer> {
}
