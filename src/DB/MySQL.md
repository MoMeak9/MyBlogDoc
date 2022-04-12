# MySQL

MySQL是一个关系型数据库，其实本质上就是一款软件、一个程序：

- 这个程序中管理着多个数据库；
- 每个数据库中可以有多张表；
- 每个表中可以有多条数据；

## 认识SQL语句

我们希望操作数据库（特别是在程序中），就需要有和数据库沟通的语言，这个语言就是SQL：

- SQL是Structured Query Language，称之为结构化查询语言，简称SQL；
- 使用SQL编写出来的语句，就称之为SQL语句；
- SQL语句可以用于对数据库进行操作；

事实上，常见的关系型数据库SQL语句都是比较相似的，所以你学会了MySQL中的SQL语句，之后去操作比如 Oracle或者其他关系型数据库，也是非常方便的。

**SQL语句的常用规范：**

- 通常关键字是大写的，比如CREATE、TABLE、SHOW等等；
- 一条语句结束后，需要以 ; 结尾；
- 如果遇到关键字作为表明或者字段名称，可以使用``包裹;

## SQL语句的分类

**常见的SQL语句我们可以分成四类：**

DDL（Data Definition Language）：数据定义语言；

- 可以通过DDL语句对数据库或者表进行：创建、删除、修改等操作；

DML（Data Manipulation Language）：数据操作语言；

- 可以通过DML语句对表进行：添加、删除、修改等操作；

DQL（Data Query Language）：数据查询语言；

- 可以通过DQL从数据库中查询记录；（重点）

DCL（Data Control Language）：数据控制语言；

对数据库、表格的权限进行相关访问控制操作；

## 数据库的操作

**查看当前数据库**

```sql
# 查看所有的数据
SHOW DATABASES;
# 使用某一个数据
USE coderhub;
# 查看当前正在使用的数据库
SELECT DATABASE();
```

**创建新的数据库**

```sql
# 创建数据库语句
CREATE DATABASE bilibili;
CREATE DATABASE IF NOT EXISTS bilibili;
CREATE DATABASE IF NOT EXISTS bilibili
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

**删除数据库 **

```sql
# 删除数据库
DROP DATABASE bilibili;
DROP DATABASE IF EXIT bilibili;
```

**修改数据库**

```sql
# 修改数据库的字符集和排序规则
ALTER DATABASE bilibili CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
```

**查看数据表 **

```sql
# 查看所有的数据表
SHOW TABLES;
# 查看某一个表结构
DESC user;
```

**创建数据表 **

```sql
CREATE TABLE IF NOT EXISTS `users`(
	name VARCHAR(20),
	age INT,
	height DOUBLE
);
```

**创建一个完整的表**

```sql
# 创建一张表
CREATE TABLE IF NOT EXISTS `users`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	age INT DEFAULT 0,
	telPhone VARCHAR(20) DEFAULT '' UNIQUE NOT NULL
);
```

**删除数据表**

```sql
# 删除数据库
DROP TABLE users;
DROP TABLE IF EXISTS users;
```

**修改表**

```sql
# 1.修改表名
ALTER TABLE `moments` RENAME TO `moment`;
# 2.添加一个新的列
ALTER TABLE `moment` ADD `publishTime` DATETIME;
ALTER TABLE `moment` ADD `updateTime` DATETIME;
# 3.删除一列数据
ALTER TABLE `moment` DROP `updateTime`;
# 4.修改列的名称
ALTER TABLE `moment` CHANGE `publishTime` `publishDate` DATE;
# 5.修改列的数据类型
ALTER TABLE `moment` MODIFY `id` INT;
```

**插入数据**

```sql
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`) VALUES ('iPhone', 'iPhone12只要998', 998.88, '2020-10-10'); 
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`) VALUES ('huawei', 'iPhoneP40只要888', 888.88, '2020-11-11');
```

**删除数据**

```sql
# 删除数据
# 会删除表中所有的数据
DELETE FROM `products`;
# 会删除符合条件的数据
DELETE FROM `products` WHERE `title` = 'iPhone';
```

**修改数据**

```sql
# 修改数据
# 会修改表中所有的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88;
# 会修改符合条件的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88 WHERE `title` = 'iPhone';
```

**如果我们希望修改完数据后，直接可以显示最新的更新时间**

```sql
ALTER TABLE `products` ADD `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

## SQL的数据类型

我们知道不同的数据会划分为不同的数据类型，在数据库中也是一样，MySQL支持的数据类型有：数字类型，日期和时间类型，字符串（字符和字节）类型，空间类型和 JSON数 据类型。

### 数字类型

- 整数数字类型：INTEGER，INT，SMALLINT，TINYINT，MEDIUMINT，BIGINT；

![image-20220411200045385](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202204112000481.png)

- 浮点数字类型：FLOAT，DOUBLE（FLOAT是4个字节，DOUBLE是8个字节）；
- 精确数字类型：DECIMAL，NUMERIC（DECIMAL是NUMERIC的实现形式）；

### 日期类型

YEAR以YYYY格式显示值

- 范围 1901到2155，和 0000

DATE类型用于具有日期部分但没有时间部分的值

- DATE以格式YYYY-MM-DD显示值 ；
- 支持的范围是 '1000-01-01' 到 '9999-12-31'；

DATETIME类型用于包含日期和时间部分的值：

- DATETIME以格式'YYYY-MM-DD hh:mm:ss'显示值；
- 支持的范围是1000-01-01 00:00:00到9999-12-31 23:59:59;

TIMESTAMP数据类型被用于同时包含日期和时间部分的值：

- TIMESTAMP以格式'YYYY-MM-DD hh:mm:ss'显示值；
- 但是它的范围是UTC的时间范围：'1970-01-01 00:00:01'到'2038-01-19 03:14:07';

> DATETIME或TIMESTAMP 值可以包括在高达微秒（6位）精度的后小数秒一部分
>
> 比如DATETIME表示的范围可以是'1000-01-01 00:00:00.000000'到'9999-12-31 23:59:59.999999';

### 字符串类型

CHAR类型在创建表时为固定长度，长度可以是0到255之间的任何值；

- 在被查询时，会删除后面的空格；

VARCHAR类型的值是可变长度的字符串，长度可以指定为0到65535之间的值；

- VARCHAR类型的值是可变长度的字符串，长度可以指定为0到65535之间的值；

BLOB用于存储大的二进制类型；

TEXT用于存储大的字符串类型；

## 表约束

**主键：PRIMARY KEY**

**唯一：UNIQUE**

**不能为空：NOT NULL**

**默认值：DEFAULT**

**自动递增：AUTO_INCREMENT**

## DQL语句

**查询的格式如下：**

```sql
SELECT select_expr [, select_expr]...
	[FROM table_references]
	[WHERE where_condition]
	[ORDER BY expr [ASC | DESC]]
	[LIMIT {[offset,] row_count | row_count OFFSET offset}]
	[GROUP BY expr]
	[HAVING where_condition]
```

## 基本查询





### where查询条件

