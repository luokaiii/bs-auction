package cn.bs.auction.controller;

import cn.bs.auction.dao.GoodsRep;
import cn.bs.auction.model.CustomUserDetails;
import cn.bs.auction.model.Goods;
import cn.bs.auction.utils.CopyUtils;
import cn.bs.auction.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/bs/goods")
public class GoodsController {

    private final GoodsRep goodsRep;

    @Autowired
    public GoodsController(GoodsRep goodsRep) {
        this.goodsRep = goodsRep;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Goods> findById(@PathVariable Integer id) {
        Goods goods = goodsRep.findById(id).orElseThrow(() -> new RuntimeException("不存在"));
        return ResponseEntity.ok(goods);
    }

    @GetMapping
    public ResponseEntity<Page<Goods>> findByPage(Goods goods,
                                                  @PageableDefault Pageable pageable) {
        Page<Goods> page = goodsRep.findAll(Example.of(goods), pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping
    public void create(@RequestBody @Valid Goods goods) {
        CustomUserDetails user = UserUtils.getLoginUser();
        goods.setId(null);
        goods.setUserId(user.getId());
        goods.setUsername(user.getUsername());
        goods.setCreateTime(LocalDateTime.now());
        goods.setStatus(Goods.Status.CREATED);
        goods.setDeleted(false);
        goods.setTime(0L);
        goodsRep.save(goods);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Integer id,
                       @RequestBody @Valid Goods goods) {
        Goods db = goodsRep.findById(id).orElseThrow(() -> new RuntimeException("不存在"));
        if (db.getStatus() != Goods.Status.CREATED) {
            throw new RuntimeException("当前状态不支持修改");
        }
        CopyUtils.copyPropertiesIgnoreNull(goods, db);
        goodsRep.save(db);
    }

    @DeleteMapping("/{id}")
    public void deleted(@PathVariable Integer id) {
        Goods db = goodsRep.findById(id).orElseThrow(() -> new RuntimeException("不存在"));
        if (db.getStatus() != Goods.Status.CREATED) {
            throw new RuntimeException("当前状态不支持删除/恢复");
        }
        db.setDeleted(!db.getDeleted());
        goodsRep.save(db);
    }
}
