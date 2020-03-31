package cn.bs.auction.dao;

import cn.bs.auction.model.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface GoodsRep extends JpaRepository<Goods, Integer> {

    @Query("select g from Goods g where g.startTime<=:time and g.status=:status")
    List<Goods> findByStartTimeGteAndStatus(@Param("time") LocalDateTime time, @Param("status") Goods.Status status);

    @Query("select g from Goods g where g.endTime<=:time and g.status=:status")
    List<Goods> findByEndTimeGteAndStatus(@Param("time") LocalDateTime time, @Param("status") Goods.Status status);

}
