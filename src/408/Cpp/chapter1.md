---
title: C语言训练营Chaptrt01
date: 2022-01-28
author: MoMeaks
sidebar: 'auto'
categories:
- 408
---


### 1.1 常量与变量

```c
#include <stdio.h>  //引用头文件

#define PI 3  //PI就是符号常量
int main()
{
	int a=3;//a就是一个变量
	a = 5;
	//PI = 10;//符号常量不可以赋值
	printf("%d\n", PI);
}
```

### 1.2 scanf使用

- “%d”表示按十进制整型输出；
- “%ld”表示按十进制长整型输出；
- “%c”表示按字符型输出。

```c
#define _CRT_SECURE_NO_WARNINGS  //解决scanf编译报错问题
#include <stdio.h>

int main()
{
	int a,b;
	printf("请输出a和b\n");
	scanf("%d%d", &a,&b);//一定要在变量前加入&符号
	printf("%d\n", a+b);
}
```

### 1.3 进制变换

```c
#include <stdio.h>

int main()
{
	int i = 123;
	//int i = 0x7b;
	//int i = 0173;
	printf("%d\n", i);//%d以十进制方式去输出某一个整型数
}
```

### 1.4 浮点型与字符型

```c
#include <stdio.h>

int main()
{
	float f = 3e-3;//e代表10的幂次
	printf("输出浮点数 %f\n", f);//%f就是以浮点形式输出对应数据
	char c = 'a';//定义一个字符型变量，并赋值为 'a'
	printf("%c\n", c);
	printf("%d\n", c);
}
```

### 1.5 字符串大小写转换

依据阿斯克嘛ACISS

```c
#include <stdio.h>

int main()
{
	char c = 'a';//现在是小写字母a，要变为大写字母A
	c = c - 32;
	printf("%c\n", c);//以字符形式来输出c
}
```

### 1.6 混合运算

%f 输出浮点数 （）转型

```c
#include <stdio.h>

int main()
{
	int i = 5;
	float j = i / 2;//j输出的是2
	float k = (float)i/2 ;//k输出的是2.5
	printf("j=%f,k=%f\n", j,k);
}
```

### 1.7 scanf读取深入缓冲区的原理

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//原理对于初试不重要，机试很重要
//缓冲区为空的时候，scanf才会卡主（阻塞）
int main()
{
	int i;
	char c;
	float f;
	scanf("%d", &i);
	printf("i=%d\n", i);
	//scanf("%c", &c);
	//printf("c=%c\n", c);
	scanf("%f", &f);
	printf("f=%f\n", f);
}
```

### 1.8 scanf读取两个整型数

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>


int main()
{
	int a, b;
	scanf("%d%d", &a, &b);
	printf("%d\n", a + b);
}
```

### 1.9  判断闰年

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>


int main()
{
	int year;
	scanf("%d", &year);
	if (year % 400 == 0 || year % 100 != 0 && year % 4 == 0)
	{
		printf("yes\n");
	}
	else {
		printf("no\n");
	}
}
```

### 1.10 循环输入

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//清空缓冲区，VS2012 fflush(stdin)
//stdin是标准输入
//VS2013-VS2019清空标准输入缓冲区，用rewind
int main()
{
	int i,ret;
	while (rewind(stdin),(ret=scanf("%d", &i))!=EOF) //while是实现循环，后面要有一个小括号（可以为scanf("%d", &i))!=EOF）
	{
		printf("i=%d\n", i);
	}
	return 0;
}
```

### 1.11 循环读取字符串

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
	char c;
	while (scanf("%c", &c) != EOF)
	{
		if (c != '\n')//判断，后面有一个小括号,小括号里边是一个表达式
		{
			printf("%c", c - 32);
		}
		else {//else就是否则
			printf("\n");
		}
	}
}
```

### 1.12 混合输入

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//一个scanf读多种类型的数据
//混合输入时每次在%c之前需要加入一个空格!!否则读取空串
int main()
{
	int i;
	char c;
	float f;
	int ret;
	ret=scanf("%d %c%f", &i, &c, &f);
	printf("i=%d,c=%c,f=%f\n", i, c, f);
	return 0;
}
```

### 1.13 输出样式控制

%s 输出string

```c
#include <stdio.h>

//printf控制输出格式
int main()
{
	printf("name=%s,age=%-3d,sex=%c,score=%5.2f\n", "longge", 34, 'm', 98.5);
}
```

### 1.15 关系运算符和逻辑运算符

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//关系运算符和逻辑运算符
int main()
{
	int a = 8;
	if (3 < a && a < 10) //如果要判断 3<a 同时 a<10,要用逻辑运算符
	{
		printf("a is right\n");
	}
	else {
		printf("a is wrong");
	}
	//判断两个浮点数是否相等,必须用下面的方法,不太重要
    //二进制浮点数的尾数问题
	float f = 234.56;
	if (f - 234.56>-0.0001 && f-234.56<0.0001)
	{
		printf("f is equal to 234.56\n");
	}
	else {
		printf("f is not equal to 234.56\n");
	}
}
```

### 1.16 赋值运算

```c
#include <stdio.h>

//赋值运算符的左边只能放变量
int main()
{
	int a = 5;
	//a + 3 = 10;//如果报出做操作数必须为左值，这时说明等号左边必须是变量
    a = 10 - 3;
    a += 3
}
```

### 1.17 自增自减

```c
#include <stdio.h>

//i++代表的是i=i+1;,比较难理解的是后加加和后减减
//++i直接按优先级进行正常运算即可
int main()
{
	int i = -1;
	int j;
	j=i++>-1;//后加加拆成两步，j=i>-1;i++
	printf("i=%d，j=%d\n", i,j);
	printf("i的字节数=%d\n", sizeof(i));
}
```

### 1.18 输出作业

```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>


int main()
{
	int a;
	scanf("%d", &a);
	printf("%c\n", a);//整型数在0-128之间可以用%c输出
}
```

### C 语言运算符优先级

![image-20220128144756621](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201281447752.png)

![image-20220128144806843](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201281448904.png)

![image-20220128144855469](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202201281448535.png)



内存展示

```cpp
#include <stdio.h>

void show_memory(void *start,int memory_len)
{
	int i;
	char* p = (char*)start;
	for (i = 0; i < memory_len; i++)
	{
		printf("%x ",p[i]);
		if ((i + 1) % 4 == 0)
		{
			printf("\n");
		}
	}
}
int main()
{
	float f = 1.456;
	int arr[3] = { 1,2,3 };
	//show_memory(&f,sizeof(f));
	show_memory(arr, sizeof(arr));
	return 0;
}
```



**浮点数精度丢失**

```cpp
#include <stdio.h>

int main()
{
    // float
	double a = 1.23456789e10;//赋值的一瞬间发生 精度丢失
	double b;
	b = a + 20;//精度丢失
	printf("b=%f\n", b);//%f即可以输出float，也可以输出double类型
	return 0;
}
```



**转义字符**

![image-20220225192440192](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202202251924298.png)

```cpp
#include <stdio.h>

int main()
{
	printf("abc\rd\n");//dbc
	printf("abc\bd\n");//abd
	printf("\123\n");
	return 0;
}
```

参照 shell 输入方式



### 位运算（不同于JS）

![image-20220225193932422](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202202251939500.png)

0x7385

0111 0011 1000 0101

左移时，正数可能变为负数，负数可能变为正数

0x8011

1000 0000 0001 0001 

0000 0000 0010 0010



### 大端/小端

大小端模式介绍**大端（存储）模式**：是指一个数据的低位字节序的内容放在高地址处，高位字节序存的内容放在低地址处。 **小端（存储）模式**：是指一个数据的低位字节序内容存放在低地址处，高位字节序的内容存放在高地址处。

![img](https://mc-web-1259409954.cos.ap-guangzhou.myqcloud.com/MyImages/202202251948600.png)



### const

两种指针修饰：

- `char* const ptr = str`ptr指针指向不可变，指针空间内容可以改变
- `const char* ptr = str;`ptr指针所指空间内容不可变，可以重新指向新的地址

```cpp
#include <stdio.h>
#include <stdlib.h>

void const_two()
{
	char str[] = "hello world";
	char str1[] = "how do you do";
	char* const ptr = str;//和普通变量一致，代表ptr被修改
	str[0] = 'H';
	puts(ptr);
	ptr[0] = 'n';  //合法
	puts(ptr);
	//ptr = "world";  //非法，编译错误，error C2166: 左值指定const对象

}

int main()
{
	const int i = 5;//i在下面的代码中不能修改，是常量
	char str[] = "hello world";
	const char* ptr = str;//这里代表ptr指向的空间不能被修改
	str[0] = 'H';  //操作合法
	puts(ptr);
	ptr = "world";
	//ptr[0] = 'n';  //操作非法，编译错误，提示error C2166: 左值指定const对象
	puts(ptr);
	//const修饰指针的第二种情况
	const_two();
	return 0;
}
```



## 汇编语言

[文档asm](./408/asm)

1、机器码中所有的变量名都不在了

2、任何一个函数都是自己独立的栈空间，运行这个函数时就有自己的栈基指针
