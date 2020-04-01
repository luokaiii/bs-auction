package cn.bs.auction.controller;

import cn.bs.auction.dao.AuctionRep;
import cn.bs.auction.dao.GoodsRep;
import cn.bs.auction.model.Auction;
import cn.bs.auction.model.CustomUserDetails;
import cn.bs.auction.model.Goods;
import cn.bs.auction.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/bs/auction")
public class AuctionController {

    private final AuctionRep auctionRep;

    private final GoodsRep goodsRep;

    @Autowired
    public AuctionController(AuctionRep auctionRep,
                             GoodsRep goodsRep) {
        this.auctionRep = auctionRep;
        this.goodsRep = goodsRep;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> findById(@PathVariable Integer id) {
        Auction auction = auctionRep.findById(id).orElseThrow(() -> new RuntimeException("不存在"));
        return ResponseEntity.ok(auction);
    }

    @GetMapping
    public ResponseEntity<Page<Auction>> findByPage(Auction auction,
                                                    @PageableDefault Pageable pageable) {
        Page<Auction> page = auctionRep.findAll(Example.of(auction), pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Auction>> findByPage(Auction auction,
                                                    @SortDefault Sort sort) {
        List<Auction> list = auctionRep.findAll(Example.of(auction), sort);
        return ResponseEntity.ok(list);
    }

    /**
     * 参与一次竞拍
     *
     * @param goodsId 竞品ID
     * @param price   参拍价格
     */
    @PostMapping("/goods/{goodsId}")
    public void offer(@PathVariable Integer goodsId,
                      @RequestParam("price") Long price) {
        CustomUserDetails user = UserUtils.getLoginUser();
        Goods goods = goodsRep.findById(goodsId).orElseThrow(() -> new RuntimeException("不存在"));
        if (goods.getStatus() != Goods.Status.STARTED) {
            throw new RuntimeException("竞拍尚未开始或已结束");
        }
        Auction auction = new Auction();
        auction.setUsername(user.getNickname());
        auction.setUserId(user.getId());
        auction.setUserProfile(user.getAvatar());
        auction.setPrice(goods.getCurrentPrice() + price);
        auction.setStatus(Auction.Status.CREATED);
        auction.setCreateTime(LocalDateTime.now());
        auction.setGoodsId(goods.getId());
        auction.setGoodsName(goods.getName());
        auction.setGoodsCover(goods.getCover());
        auction.setGoodsStartPrice(goods.getStartPrice());
        auction.setGoodsStartTime(goods.getStartTime());
        auction.setGoodsEndTime(goods.getEndTime());
        auctionRep.save(auction);

        goods.setTime(goods.getTime() + 1);
        goods.setCurrentPrice(goods.getCurrentPrice() + price);
        goodsRep.save(goods);
    }

    /**
     * 完成此次竞拍
     *
     * @param id 竞品ID
     * @return 竞拍信息
     */
    @PutMapping("/{id}/finished")
    public ResponseEntity<Auction> finished(@PathVariable Integer id) {
        Auction auction = auctionRep.findById(id).orElseThrow(() -> new RuntimeException("不存在"));
        if (auction.getStatus() != Auction.Status.BID) {
            throw new RuntimeException("该竞标未中标");
        }
        auction.setStatus(Auction.Status.FINISHED);
        auction.setFinishTime(LocalDateTime.now());
        return ResponseEntity.ok(auctionRep.save(auction));
    }
}
