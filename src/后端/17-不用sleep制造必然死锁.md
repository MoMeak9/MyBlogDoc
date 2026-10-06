# 不用 sleep 制造必然死锁

日期：2026-07-11  
标签：#面试 #八股 #后端 #系统设计 #场景题


## 一句话答案

使用两个线程以相反顺序持有两把锁，并用 CountDownLatch 保证双方都拿到第一把锁后再申请第二把锁，即可稳定形成循环等待。

## Java 代码

```java
import java.util.concurrent.CountDownLatch;

public class GuaranteedDeadlock {
    private static final Object LOCK_A = new Object();
    private static final Object LOCK_B = new Object();
    private static final CountDownLatch BOTH_HOLD_ONE = new CountDownLatch(2);

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> lockInOrder(LOCK_A, LOCK_B), "t1");
        Thread t2 = new Thread(() -> lockInOrder(LOCK_B, LOCK_A), "t2");
        t1.start();
        t2.start();
    }

    private static void lockInOrder(Object first, Object second) {
        synchronized (first) {
            BOTH_HOLD_ONE.countDown();
            awaitUninterruptibly(BOTH_HOLD_ONE);
            synchronized (second) {
                throw new AssertionError("unreachable");
            }
        }
    }

    private static void awaitUninterruptibly(CountDownLatch latch) {
        boolean interrupted = false;
        for (;;) {
            try {
                latch.await();
                break;
            } catch (InterruptedException e) {
                interrupted = true;
            }
        }
        if (interrupted) Thread.currentThread().interrupt();
    }
}
```

## 原理拆解

两个线程分别持有 A、B；Latch 确保双方都进入临界区后才继续；之后 t1 等 B、t2 等 A，形成互斥、持有并等待、不可剥夺、循环等待四个死锁条件。

## 面试官追问

1. 如何用 `jstack` 定位死锁？
2. 如何通过统一加锁顺序避免死锁？
3. `ReentrantLock.tryLock` 如何用于规避死锁？

## 面试官追问参考答案

### 1. 如何用 `jstack` 定位死锁？

执行 `jstack PID`，末尾通常会输出 `Found one Java-level deadlock`，列出线程、持有锁和等待锁。也可搜索 `BLOCKED` 和 `waiting to lock`，构建线程到锁的等待环；应连续保存线程栈并结合代码中的加锁顺序定位。

### 2. 如何通过统一加锁顺序避免死锁？

为所有可能同时获取的资源定义全局稳定顺序，例如按资源类型和唯一 ID 排序，任何线程都只按升序加锁、逆序释放。动态资源集合先去重排序再加锁，不能在已持有高序资源时回头申请低序资源，从而破坏循环等待条件。

### 3. `ReentrantLock.tryLock` 如何用于规避死锁？

使用带超时的 `tryLock` 获取第一把和第二把锁，任一失败就释放已经持有的锁，随机退避后重试。所有释放放在 `finally` 中，并限制总重试时间；它避免无限等待，但可能产生活锁或饥饿，需要抖动和重试上限。

