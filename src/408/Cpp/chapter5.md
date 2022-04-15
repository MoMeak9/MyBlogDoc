---
title: C语言训练营Chaptrt04 指针
date: 2022-01-28
author: MoMeaks
sidebar: 'auto'
categories:
- 408
---

> 本节须参考C语言基础描述页

### 5.1 指针的本质

&取地址/取引用

```cpp
#include <stdio.h>

//&符号是取地址，指针变量的初始化一定是某个变量取地址
int main()
{
	int i = 5;
	int* p=&i;
	printf("i=%d\n", i);//直接访问
	printf("*p=%d\n", *p);//间接访问
	return 0;
}
```



### 5.2 指针的传递

*单独存在作为运算符，与基本量一起存在是指针标识（指针加了\*取得与一般量相同的表示值的方式）

```cpp
#include <stdio.h>

void change(int *j)//j称为形参，j=&i
{
	*j = 5;//指针的间接访问
}

int main()
{
	int i = 10;//i是局部变量
	printf("before change i=%d\n", i);
	change(&i);//函数调用时，把&i称为实参
	printf("after change i=%d\n", i);
	return 0;
}
```



### 5.3 指针的偏移

```cpp
#include <stdio.h>

int main()
{
	int a[5] = { 1,2,3,4,5 };

	int* p;//对一个指针变量进行取值，得到的类型是其基类型
	p = a;
	printf("*p=%d\n", *p);
	for (int i = 0; i < 5; i++)
	{
		printf("%d\n", *(p + i));
	}
	return 0;
}
```



### 5.4 自增自减运算符

老东西了，注意符号在前和后的区别

```cpp
#include <stdio.h>

//重要程度低一些,不理解直接放弃，不重要
int main()
{
	int a[3] = { 2,7,8 };
	int* p;
	int j;
	p = a;//让指针变量p，指向数组的开头
	j = *p++;//j=*p;(*p)++,第一步：任何时候都是把后加加去掉，第二步另外一个运算符看优先级是否高于++
	printf("a[0]=%d,j=%d,*p=%d\n", a[0], j, *p);//2 2 7
	j = p[0]++;//j=p[0];p[0]++;
	printf("a[0]=%d,j=%d,*p=%d\n", a[0], j, *p);//2,7,8
	return 0;
}
```



### 5.5 指针动态缓存和内存申请

`malloc`分配内存、存储器分配

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//malloc可以帮我们实现动态数组
int main()
{
	int i;//申请多大的空间
	scanf("%d", &i);
	char* p;
	p = (char*)malloc(i);//malloc申请空间的单位是字节
	strcpy(p, "malloc success");
	puts(p);
	free(p);//释放空间,p的值必须和最初malloc返回的值一致
	p = NULL;//如果不把p值为NULL，把p称为野指针，NULL就是0
	return 0;
}
```



### 5.6 指针与一位数组

```cpp
#include <stdio.h>

//数组名作为实参传递给子函数时，是弱化为指针的
//练习传递与偏移
void change(char *d)
{
	*d = 'H';
	d[1] = 'E';
	*(d + 2) = 'L';
}
int main()
{
	char c[10] = "hello";
	change(c);
	puts(c);
	return 0;
}
```



### 5.7 堆空间与栈空间的差异

1. 栈空间会随着函数的执行结束而释放
2. 堆空间不会随子函数的结束而释放，必须自己free

```cpp
#include <stdio.h>
char* print_stack()
{
	char c[17] = "I am print_stack";
	puts(c);//能正常打印
	return c;
}

char* print_malloc()
{
	char* p = (char*)malloc(30);
	strcpy(p, "I am print_malloc");
	puts(p);
	return p;
}

int main()
{
	char* p;
	p = print_stack();//栈空间会随着函数的执行结束而释放,相当于p=c
	//puts(p);//打印不出来
	p = print_malloc();//堆空间不会随子函数的结束而释放，必须自己free
	puts(p);
	free(p);
	return 0;
}
```



### 5.8 字符指针和字符数组的初始化

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char* p = "hello";  //把字符串型常量"hello"的首地址赋给p
	char c[10] = "hello";  //等价于strcpy(c,"hello");
	c[0] = 'H';
	//p[0]='H';  //不可以对常量区数据进行修改
	printf("c[0]=%c\n", c[0]);
	printf("p[0]=%c\n", p[0]);
	p = "world";  //将字符串world的地址赋给p
	//c="world";  //非法
	puts(p);
	return 0;
}
```



### 5.9 二级指针

不要求