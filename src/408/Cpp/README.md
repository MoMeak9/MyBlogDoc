---
date: 2022-01-30
category:
- 计算机408
---

# C/C++基础纪要

### 关于取值与取地址运算符（&和*）
C++ 提供了两种指针运算符，一种是取地址运算符 &，一种是间接寻址运算符 *。

指针是一个包含了另一个变量地址的变量，您可以把一个包含了另一个变量地址的变量说成是"指向"另一个变量。变量可以是任意的数据类型，包括对象、结构或者指针。

取地址运算符 &
& 是一元运算符，返回操作数的内存地址。例如，如果 var 是一个整型变量，则 &var 是它的地址。该运算符与其他一元运算符具有相同的优先级，在运算时它是从右向左顺序进行的。

您可以把 & 运算符读作"取地址运算符"，这意味着，&var 读作"var 的地址"。

间接寻址运算符 *
第二个运算符是间接寻址运算符 *，它是 & 运算符的补充。* 是一元运算符，返回操作数所指定地址的变量的值。

请看下面的实例，理解这两种运算符的用法。

### 3.1 if 与 if-else

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

int main()
{
	int i;
    // 文件结束符（end of file）
	while (scanf("%d", &i) != EOF)
	{
		if (i > 0)//在if的括号后面不可以加;，会造成表达式无论是真还是假，都会执行后面的语句
		{ 
			printf("i is bigger than 0\n");
		}
		else {//上面的条件为假时，走else
			printf("i is not bigger than 0\n");
		}
	}
}
```



### 3.2 while

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//从1加到100
int main()
{
	int i = 1;
	int total = 0;//存储最终的和
	while (i <= 100)//while后面不能够加分号，否则会死循环
	{
		total = total + i;
		i++;
	}
	printf("total=%d\n", total);
}
```



### 3.3 for 循环

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//从1加到100
int main()
{
	int i, total;
	//for语句中只能有两个分号
	for (i = 1, total = 0; i <= 100; i++)//for循环后不能加分号
	{
		total = total + i;
	}
	printf("total=%d\n", total);
}
```



### 3.4 continue

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//从1加到100
int main()
{
	int i, total;
	//for语句中只能有两个分号
	for (i = 1, total = 0; i <= 100; i++)//for循环后不能加分号
	{
		total = total + i;
	}
	printf("total=%d\n", total);
}
```



### 3.5 Break

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

//从1加到100,当和大于2000,就终止循环
int main()
{
	int i, total;
	//for语句中只能有两个分号
	for (i = 1, total = 0; i <= 100; i++)//for循环后不能加分号
	{
		if (total > 2000)
		{
			break;//当求和大于2000，就终止循环
		}
		total = total + i;
	}
	printf("total=%d,i=%d\n", total,i);
}
```



### 3.6 day6作业

回文数判定

12321

12321

1234

4321

把最初输入的整型数a，反过来后，再存到另外一个整型数b，判断a和b是否相等，如果相等就输出yes，不相等no

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>


int main()
{
	int a,b,c,tmp;
	while (scanf("%d", &a) != EOF)
	{
		b = 0;
		c = a;
		while (a)
		{
			tmp = a % 10;
			b = b*10+tmp;
			a = a / 10;
		}
		if (c == b)
		{
			printf("yes\n");
		}
		else {
			printf("no\n");
		}
	}
	return 0;
}
```

### 6.1 函数嵌套调用

一个工程当中多个文件中函数的使用

```cpp
#include "func.h"

int main()
{
	int a = 10;
	a = printstar(a);//printstar(a)函数调用，a是一个实参
	print_message();//调用print_message
	printstar(a);
	return 0;

}
```

func.h 头文件

```cpp
#include <stdio.h> //头文件中放的是函数声明

int printstar(int i);//函数声明
void print_message();//函数声明
```

func.c

```cpp
#include "func.h"

//printstar函数定义，就是函数实现
int printstar(int i)  //i即为形式参数，也叫形参
{
	printf("**********************\n");
	printf("printstar %d\n", i);
	return i + 3;
}
//print_message函数定义
void print_message()  //可以调用printstar
{
	printf("how do you do\n");
	printstar(3);
}
```



### 6.2 全局变量

```cpp
#include <stdio.h>

int i = 10;  //全局变量,在函数外定义的变量叫全局变量
void print(int a)//自定义的print函数
{
	printf("print i=%d\n", i);
}
int main()
{
	printf("main i=%d\n", i);
	int i = 5;//当这里加了int后，就是在main定义了一个名为i的局部变量
	printf("main i=%d\n", i);
	print(i);
	return 0;
}
```



### 6.3 递归

```cpp
#include <stdio.h>
//函数自己调用自己就是递归,初试考的概率极低的，机试有用到
int f(int n)
{
	if (1 == n)
	{
		return 1;//一定写结束条件
	}
	return n * f(n - 1);//第一步是写好公式
}

int main()
{
	int n = 5;
	int result = f(n);
	printf("result=%d\n", result);
}
```

## C语言高级部分

```cpp
#include <stdio.h>

//long long 32位的程序是8个字节，64位的是8个字节
int main()
{
	int i=10;
	short a=32767;
	short b=0;
	long c;//32位的程序是4个字节，64位的是8个字节
	b = a + 1;//发生了溢出,解决溢出的办法是用更大的空间来存
	//printf("%d\n", b);
	//下面是无符号数
	unsigned int m = 3;
	unsigned short n = 0x8056;
	unsigned long k = 5;
	b = 0x8056;
	printf("%d\n", b);
	//printf("i=%d\n", i);
	printf("n=%u\n", n);//无符号类型要用%u
	return 0;
}
```

