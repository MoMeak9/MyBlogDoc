### 8.2 插入排序

1. **直接插入排序**

```cpp
//插入排序，从小到大排序，升序 有哨兵的
void InsertSort(ElemType A[],int n)
{
	int i,j;
	//24 66 94  2 15 74 28 51 22 18  2
	for(i=2;i<=n;i++)//第零个元素是哨兵，从第二个元素开始拿，往前面插入
	{
		if(A[i]<A[i-1])
		{
			A[0]=A[i];//放到暂存位置，A[0]即是暂存，也是哨兵
			for(j=i-1;A[0]<A[j];--j)//移动元素，内层循环控制有序序列中的每一个元素和要插入的元素比较
				A[j+1]=A[j];
			A[j+1]=A[0];//把暂存元素插入到对应位置
		}
	}
}
```

2. **折半插入排序**

```cpp
//折半查找 插入排序，考的很少
void MidInsertSort(ElemType A[],int n)
{
	int i,j,low,high,mid;
	for(i=2;i<=n;i++)
	{
		A[0]=A[i];
		low=1;high=i-1;//low有序序列的开始，high有序序列的最后
		while(low<=high)//先通过二分查找找到待插入位置
		{
			mid=(low+high)/2;
			if(A[mid]>A[0])
				high=mid-1;
			else
				low=mid+1;
		}
		for(j=i-1;j>=high+1;--j)
			A[j+1]=A[j];
		A[high+1]=A[0];
	}
}
```

3. **希尔排序**

```cpp
//希尔排序  
//多轮插入排序，考大题的概率约等于零，因为编写起来复杂，同时效率并不如快排，堆排
//小题主要考步长的变化是如何的
void ShellSort(ElemType A[],int n)
{
	int dk,i,j;
	// 73 29 74 51 29 90 37 48 72 54 83
	for(dk=n/2;dk>=1;dk=dk/2)//步长变化，步长变化
	{
		for(i=dk+1;i<=n;++i)//以dk为步长进行插入排序
		{
			if(A[i]<A[i-dk])
			{
				A[0]=A[i];
				for(j=i-dk;j>0&&A[0]<A[j];j=j-dk)
					A[j+dk]=A[j];
				A[j+dk]=A[0];
			}
		}
	}
}

```



### 8.3 交换排序（冒泡排序）

```cpp
void BubbleSort(ElemType A[],int n)
{
	int i,j;
	bool flag;
	for(i=0;i<n-1;i++)//i最多访问到8
	{
		flag=false;
		for(j=n-1;j>i;j--)//把最小值就放在最前面
		{
			if(A[j-1]>A[j])
			{
				swap(A[j-1],A[j]);
				flag=true;
			}
		}
		if(false==flag)
			return;
	}
}

void swap(ElemType &a,ElemType &b)
{
	ElemType tmp;
	tmp=a;
	a=b;
	b=tmp;
}
```



### 8.4 选择排序

```cpp
void SelectSort(ElemType A[],int n)
{
	int i,j,min;//min记录最小的元素的下标
	for(i=0;i<n-1;i++)//最多可以为8
	{
		min=i;
		for(j=i+1;j<n;j++)//j最多可以为9
		{
			if(A[j]<A[min])
				min=j;
		}
		if(min!=i)
		{
			swap(A[i],A[min]);
		}
	}
}

void swap(ElemType &a,ElemType &b)
{
	ElemType tmp;
	tmp=a;
	a=b;
	b=tmp;
}
```

#### 堆排序

```cpp
//调整某个父亲节点
void AdjustDown(ElemType A[],int k,int len)
{
	int i;
	A[0]=A[k]; // 作为临时变量
	for(i=2*k;i<=len;i*=2)
	{
		if(i<len&&A[i]<A[i+1])//左子节点与右子节点比较大小
			i++;
		if(A[0]>=A[i])
			break;
		else{
			A[k]=A[i];
			k=i;
		}
	}
	A[k]=A[0];
}
//用数组去表示树   层次建树
void BuildMaxHeap(ElemType A[],int len)
{
	for(int i=len/2;i>0;i--)
	{
		AdjustDown(A,i,len);
	}
}
void HeapSort(ElemType A[],int len)
{
	int i;
	BuildMaxHeap(A,len);//建立大顶堆
	for(i=len;i>1;i--)
	{
		swap(A[i],A[1]);
		AdjustDown(A,1,i-1);
	}
}


//调整子树
void AdjustDown1(ElemType A[], int k, int len)
{
	int dad = k;
	int son = 2 * dad + 1; //左孩子下标
	while (son<=len)
	{
		if (son + 1 <= len && A[son] < A[son + 1])//看下有没有右孩子，比较左右孩子选大的
		{
			son++;
		}
		if (A[son] > A[dad])//比较孩子和父亲
		{
			swap(A[son], A[dad]);
			dad = son;
			son = 2 * dad + 1;
		}
		else {
			break;
		}
	}
}
void HeapSort1(ElemType A[], int len)
{
	int i;
	//建立大顶堆
	for (i = len / 2; i >= 0; i--)
	{
		AdjustDown1(A, i, len);
	}
	swap(A[0], A[len]);//交换顶部和数组最后一个元素
	for (i = len - 1; i > 0; i--)
	{
		AdjustDown1(A, 0, i);//剩下元素调整为大根堆
		swap(A[0], A[i]);
	}
}

//《王道C督学营》课程
//选择排序与堆排序
int main()
{
	SSTable ST;
	ElemType A[10]={ 64, 94, 95, 79, 69, 84, 18, 22, 12 ,99};
	ST_Init(ST,10);//初始化
	memcpy(ST.elem,A,sizeof(A));
	ST_print(ST);
	//SelectSort(ST.elem,10);
	HeapSort(ST.elem, 9);//王道书零号元素不参与排序
	//HeapSort1(ST.elem,9);//所有元素参与排序
	ST_print(ST);
	system("pause");
}
```



### 8.5 归并排序

```cpp
typedef int ElemType;
//49,38,65,97,76,13,27
void Merge(ElemType A[],int low,int mid,int high)
{
	ElemType B[N];//为了降低操作次数
	int i,j,k;
	for(k=low;k<=high;k++)//复制元素到B中
		B[k]=A[k];
	for(i=low,j=mid+1,k=i;i<=mid&&j<=high;k++)//合并两个有序数组
	{
		if(B[i]<=B[j])
			A[k]=B[i++];
		else
			A[k]=B[j++];
	}
	while(i<=mid)//如果有剩余元素，接着放入即可
		A[k++]=B[i++];
	while(j<=high)
		A[k++]=B[j++];
}
//归并排序不限制是两两归并，还是多个归并
// 1 3 5 7 9
// 2 4
// 1 2 3 4 5 7 9  主要的代码逻辑
void MergeSort(ElemType A[],int low,int high)//递归分割
{
	if(low<high)
	{
		int mid=(low+high)/2;
		MergeSort(A,low,mid);
		MergeSort(A,mid+1,high);
		Merge(A,low,mid,high);
	}
}

int main()
{
	int A[7]={49,38,65,97,76,13,27};//数组，7个元素
	MergeSort(A,0,6);
	print(A);
	system("pause");
}
```



### 快速排序





### 

