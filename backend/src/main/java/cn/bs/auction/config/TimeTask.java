package cn.bs.auction.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

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

    @Scheduled(fixedDelay = 60 * 1000)
    public void doSomething() {
        System.out.println("定时任务");
    }
}
