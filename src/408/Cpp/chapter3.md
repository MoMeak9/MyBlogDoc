---
date: 2022-01-28
category:
- 计算机408
---
# C语言训练营Chaptrt02 选择与循环

### 3.1 栈

```cpp
#include <stdio.h>
#include <stdlib.h>

#define MaxSize 50
typedef int ElemType;
typedef struct{
	ElemType data[MaxSize];//数组
	int top;
}SqStack;
void InitStack(SqStack &S)
{
	S.top=-1;//代表栈为空
}

bool StackEmpty(SqStack &S)
{
	if(S.top==-1)
		return true;
	else
		return false;
}
//入栈
bool Push(SqStack &S,ElemType x)
{
	if(S.top==MaxSize-1)//数组的大小不能改变，避免访问越界
	{
		return false;
	}
	S.data[++S.top]=x;
	return true;
}
//出栈
bool Pop(SqStack &S,ElemType &x)
{
	if(-1==S.top)
		return false;
	x=S.data[S.top--];//后减减，x=S.data[S.top];S.top=S.top-1;
	return true;
}
//读取栈顶元素
bool GetTop(SqStack &S,ElemType &x)
{
	if(-1==S.top)//说明栈为空
		return false;
	x=S.data[S.top];
	return true;
}
//《王道C督学营》课程
//王道数据结构 3.1 栈
//实现栈 可以用数组，也可以用链表，我们这里使用数组
int main()
{
	SqStack S;//先进后出 FILO  LIFO
	bool flag;
	ElemType m;//用来存放拿出的元素
	InitStack(S);//初始化
	flag=StackEmpty(S);
	if(flag)
	{
		printf("栈是空的\n");
	}
	Push(S,3);//入栈元素3
	Push(S,4);//入栈元素4
	Push(S,5);
	flag=GetTop(S,m);//获取栈顶元素
	if(flag)
	{
		printf("获取栈顶元素为 %d\n",m);
	}
	flag=Pop(S,m);//弹出栈顶元素
	if(flag)
	{
		printf("弹出元素为 %d\n",m);
	}
	system("pause");
}
```



### 3.2 循环队列

> 循环队列就是将队列存储空间的最后一个位置绕到第一个位置，形成逻辑上的环状空间，供队列循环使用。 在循环队列结构中，当存储空间的最后一个位置已被使用而再要进入队运算时，只需要存储空间的第一个位置空闲，便可将元素加入到第一个位置，即将存储空间的第一个位置作为队尾。 循环队列可以更简单防止伪溢出的发生，但队列大小是固定的。

```cpp
#include <stdio.h>
#include <stdlib.h>

#define MaxSize 5
typedef int ElemType;
typedef struct{
	ElemType data[MaxSize];//数组,存储MaxSize-1个元素
	int front,rear;//队列头 队列尾
}SqQueue;

void InitQueue(SqQueue &Q)
{
	Q.rear=Q.front=0;
}
//判空
bool isEmpty(SqQueue &Q)
{
	if(Q.rear==Q.front)//不需要为零
		return true;
	else
		return false;
}
//入队
bool EnQueue(SqQueue &Q,ElemType x)
{
	if((Q.rear+1)%MaxSize==Q.front) //判断是否队满
		return false;
	Q.data[Q.rear]=x;//3 4 5 6
	Q.rear=(Q.rear+1)%MaxSize;
	return true;
}
//出队
bool DeQueue(SqQueue &Q,ElemType &x)
{
	if(Q.rear==Q.front)
		return false;
	x=Q.data[Q.front];//先进先出
	Q.front=(Q.front+1)%MaxSize;
	return true;
}
//《王道C督学营》课程
//王道数据结构 3.2 循环队列
int main()
{
	SqQueue Q;
	bool ret;//存储返回值
	ElemType element;//存储出队元素
	InitQueue(Q);
	ret=isEmpty(Q);
	if(ret)
	{
		printf("队列为空\n");
	}else{
		printf("队列不为空\n");
	}
	EnQueue(Q,3);
	EnQueue(Q,4);
	EnQueue(Q,5);
	ret=EnQueue(Q,6);
	ret=EnQueue(Q,7);
	if(ret)
	{
		printf("入队成功\n");
	}else{
		printf("入队失败\n");
	}
	ret=DeQueue(Q,element);
	if(ret)
	{
		printf("出队成功,元素值为 %d\n",element);
	}else{
		printf("出队失败\n");
	}
	ret=DeQueue(Q,element);
	if(ret)
	{
		printf("出队成功,元素值为 %d\n",element);
	}else{
		printf("出队失败\n");
	}
	ret=EnQueue(Q,8);
	if(ret)
	{
		printf("入队成功\n");
	}else{
		printf("入队失败\n");
	}
	system("pause");
}
```



### 3.2.3 队列的链式存储

```cpp
#include <stdio.h>
#include <stdlib.h>

typedef int ElemType;

typedef struct LinkNode{
	ElemType data;
	struct LinkNode *next;
}LinkNode;

typedef struct{
	LinkNode *front,*rear;//链表头 链表尾
}LinkQueue;//先进先出

void InitQueue(LinkQueue &Q)
{
	Q.front=Q.rear=(LinkNode*)malloc(sizeof(LinkNode));//头和尾指向同一个结点
	Q.front->next=NULL;
}

bool IsEmpty(LinkQueue Q)
{
	if(Q.front==Q.rear)
		return true;
	else
		return false;
}
//入队，尾部插入法
void EnQueue(LinkQueue &Q,ElemType x)
{
	LinkNode *s=(LinkNode *)malloc(sizeof(LinkNode));
	s->data=x;s->next=NULL;
	Q.rear->next=s;//rear始终指向尾部
	Q.rear=s;
}
//出队  头部删除法
bool DeQueue(LinkQueue &Q,ElemType &x)
{
	if(Q.front==Q.rear) return false;//队列为空
	LinkNode *p=Q.front->next;//头结点什么都没存，所以头结点的下一个节点才有数据
	x=p->data;
	Q.front->next=p->next;//断链
	if(Q.rear==p)//删除的是最后一个元素
		Q.rear=Q.front;//队列置为空
	free(p);
	return true;
}
//《王道C督学营》课程
//王道考研数据结构 3.2.3 队列的链式存储
//头部删除法，尾部插入法
int main()
{
	LinkQueue Q;
	bool ret;
	ElemType element;//存储出队元素
	InitQueue(Q);
	EnQueue(Q,3);
	EnQueue(Q,4);
	EnQueue(Q,5);
	EnQueue(Q,6);
	EnQueue(Q,7);
	ret=DeQueue(Q,element);
	if(ret)
	{
		printf("出队成功,元素值为 %d\n",element);
	}else{
		printf("出队失败\n");
	}
	system("pause");
}
```



### 3.3.3 斐波那契数列

```cpp
#include <stdio.h>
#include <stdlib.h>
//Fib是递归函数
int Fib(int n)
{
	if(n==0)
		return 0;
	else if(n==1)
		return 1;
	else
		return Fib(n-1)+Fib(n-2);
}
//王道数据结构 斐波那契数列
//递归  函数调用自身
//0  1  1  2  3   5 
//f(n)=f(n-1)+f(n-2)
//考研不是很重要，了解即可

int main()
{
	int num;
	while(scanf("%d",&num)!=EOF)
	{
		printf("Fib(%d) = %d\n",num,Fib(num));
	}
	system("pause");
}
//题目  n个台阶，每次只能上1个台阶，或者2个台阶，n个台阶，有多少种走法
```

