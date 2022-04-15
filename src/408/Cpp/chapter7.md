---
title: C语言训练营Chaptrt07 结构体
date: 2022-01-28
author: MoMeaks
sidebar: 'auto'
categories:
- 408
---

### 7.1 结构体

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
//结构体所占用空间是68个字节，因为存在对齐，对齐的目的是
//为了提高cpu访问内存的效率
struct student {
	int num;//num是结构体成员
	char name[20];
	char sex;
	int age;
	float score;
	char addr[30];
};  //结构体类型声明，注意最后一定要加分号

int main()
{
	struct student s = {1001,"lele",'m',20,98.5,"Shenzhen"};
	struct student sarr[3]; // 结构体数组
	int i;
	printf("%d %s %c %d %5.2f %s\n", s.num,s.name,s.sex,s.age,s.score,s.addr);
	for (i = 0; i < 3; i++)
	{
		scanf("%d%s %c%d%f%s", &sarr[i].num, sarr[i].name, &sarr[i].sex, &sarr[i].age, &sarr[i].score, sarr[i].addr);
	}
	for (i = 0; i < 3; i++)
	{
		printf("%d %s %c %d %f %s\n", sarr[i].num, sarr[i].name, sarr[i].sex, sarr[i].age, sarr[i].score, sarr[i].addr);
	}

	return 0;
}
```

### 7.1.2 结构体指针

```cpp
#include <stdio.h>
#include <stdlib.h>

//结构体指针
struct student {
	int num;
	char name[20];
	char sex;
};

int main()
{
	struct student s = { 1001,"wangle",'M' };
	struct student* p;
	p = &s;
	printf("%d %s %c\n", (*p).num, (*p).name, (*p).sex);
	printf("%d %s %c\n", p->num,p->name,p->sex);//指针的成员选择，很重要
	//结构体初始化
	struct student sarr[3] = { 1001,"lilei",'M',1005,"zhangsan",'M',1007,"lili",'F' };
	int num;
	p = sarr;
	printf("------------------------------\n");//下面一部分不重要
	num = p->num++;//num=p->num;p->num++
	printf("num=%d,p->num=%d\n", num, p->num);//1001,1002
	num = p++->num;//num=p->num;p++;
	printf("num=%d,p->num=%d\n", num, p->num);//1002,1005
	return 0;
}
```



### 7.1.3 typedef 的使用

```cpp
#include <stdio.h>

//给结构体类型起别名，叫stu，起了结构体指针类型的别名，叫pstu，不用带*
typedef struct student {
	int num;
	char name[20];
	char sex;
}stu, * pstu;

typedef int INTEGER;
int main()
{
	stu s= { 1001,"wangle",'M' };
	pstu p;//stu* p1,那么p1也是一个结构体指针
	INTEGER i = 10;
	p = &s;
	printf("i=%d,p->num=%d\n", i, p->num);
	return 0;
}
```



### 7.1.4 C++的引用

```cpp
#include <stdio.h>
#include <stdlib.h>
//把&写到形参的位置是C++的语法，称为引用,这个时候操作b和在主函数里边使用a等价的
void modify_num(int& b)
{
	++b;
}

void modify_pointer(int*& p)//在子函数内操作p和主函数操作p手法一致
{
	p = (int*)malloc(20);
	p[0] = 5;
}
int main()
{
	int a = 10;
	modify_num(a);
	printf("a=%d\n", a);
	int* p = NULL;
	modify_pointer(p);
	printf("p[0]=%d\n", p[0]);
	return 0;
}
```



### 7.2 顺序查找与折半查找

**顺序查找**

```c
// 顺序查找，其中长度+1，0位置为哨兵
int Search_Seq(SSTable ST,ElemType key)
{
	ST.elem[0]=key;//让零号元素作为哨兵
	int i;
	for(i=ST.TableLen-1;ST.elem[i]!=key;--i);
	return i;
}
```

**二分查找实现（折半查找）**

```c
//时间复杂度  logn
int Binary_Search(SSTable L,ElemType key)
{
	int low=0,high=L.TableLen-1,mid;
	while(low<=high)
	{
		mid=(low+high)/2;
		if(L.elem[mid]==key)
			return mid;//等于就找到了
		else if(L.elem[mid]>key)
			high=mid-1;
		else
			low=mid+1;
	}
	return -1;
}
```

**完整代码**

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
typedef int ElemType;
typedef struct{
	ElemType *elem;//整型指针
	int TableLen;//存储动态数组里边元素的个数
}SSTable;

// 顺序查找，其中长度+1，0位置为哨兵
int Search_Seq(SSTable ST,ElemType key)
{
	ST.elem[0]=key;//让零号元素作为哨兵
	int i;
	for(i=ST.TableLen-1;ST.elem[i]!=key;--i);
	return i;
}
//init进行了随机数生成
void ST_Init(SSTable &ST,int len)
{
	ST.TableLen=len+1;//多申请了一个位置,为了存哨兵
	ST.elem=(ElemType *)malloc(sizeof(ElemType)*ST.TableLen);
	int i;
	srand(time(NULL));//随机数生成
	for(i=0;i<ST.TableLen;i++)//为啥这里零号位置也随机了数据，为折半查找服务
	{
		ST.elem[i]=rand()%100;
	}
}

void ST_print(SSTable ST)
{
	for(int i=0;i<ST.TableLen;i++)
	{
		printf("%3d",ST.elem[i]);
	}
	printf("\n");
}

//时间复杂度  log(n)
int Binary_Search(SSTable L,ElemType key)
{
	int low=0,high=L.TableLen-1,mid;
	while(low<=high)
	{
		mid=(low+high)/2;
		if(L.elem[mid]==key)
			return mid;//等于就找到了
		else if(L.elem[mid]>key)
			high=mid-1;
		else
			low=mid+1;
	}
	return -1;
}
int compare(const void *left,const void *right)//left，right是任意两个元素的地址值
{
	return *(ElemType*)left-*(ElemType*)right;
	//return *(ElemType*)right - *(ElemType*)left;//从大到小
}
```

### 7.5 字符串模式匹配

