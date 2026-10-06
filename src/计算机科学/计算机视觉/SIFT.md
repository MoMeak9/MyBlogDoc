# [译] SIFT(Scale-invariant feature transform) 尺度不变特征变换

>来源文章：[SIFT(Scale-invariant feature transform) | by Minghao Ning | Towards Data Science](https://towardsdatascience.com/sift-scale-invariant-feature-transform-c7233dc60f37)
>
>作者：[Minghao Ning – Medium](https://medium.com/@MinghaoNing)

在本文中，我将详细解释SIFT算法及其数学原理。

希望大家阅读🤔后能理解这些：

1. SIFT的主要步骤
   - Extreme value detection in scale space 尺度空间极值检测
   - Feature point localization (sub-pixel localization) 特征点定位（亚像素定位）/ 关键点定位
   - Orientation Assignment 定向分配 / 方向确定（为特征点分配方向值）
   - Feature descriptor generation 特征描述生成 / 关键点描述
2. 为什么我们需要将 LoG 乘以 σ² 才能得到尺度不变性
3. 使用 DoG 分配混合 LoG
4. 为什么我们使用 Hessian 来拒绝位于边缘的某些特征。

# 特征点检测

顾名思义，**SIFT**具有**尺度不变**性的特性，这使得它比[Harris](https://en.wikipedia.org/wiki/Harris_Corner_Detector)更好。Harris 不是比例不变的，如果比例发生变化，**拐角**可能会变成**边**，如下图所示。

<img src="https://cdn.yihuiblog.top/images/202212071724217.png" alt="image-20221207172457149" style="zoom:67%;" />

那么什么是尺度，尺度不变性是什么意思呢？
[托尼·林德伯格（Tony Lindeberg）的论文](https://people.kth.se/~tony/papers/scsptheory-review.jas94.pdf)给出了一个很好的解释:

> *世界上物体的一个固有属性是它们只作为有意义的实体存在于一定的尺度范围内。* *一个简单的例子是一棵树的树枝的概念，它只有在几厘米到最多几米的规模上才有意义。在纳米或公里级别讨论树的概念是没有意义的。在这些尺度上，谈论形成树叶的分子或树生长的森林更相关。同样，只有在一定范围的粗尺度上谈论云才有意义。在更精细的尺度上，考虑单个液滴更为合适，而水液滴又由水分子组成，水分子由原子组成，原子由质子和电子等组成。*

图像landmarks的比例是其在图像中的（粗略）直径。它用σ表示，以像素为单位，您可以认为尺度不变性，因为即使它们的比例不同，我们也可以检测到类似的landmarks。

![image-20221207172708914](https://cdn.yihuiblog.top/images/202212071727140.png)

那么SIFT是如何实现尺度不变性的呢？
你还记得**金字塔**吗?

![image-20221207172745225](https://cdn.yihuiblog.top/images/202212071727374.png)

我们可以找到各种图像尺寸下的特征。

此外，我们还可以使用不同σ的Laplacian of Gaussian(LoG)来实现这一点。

我们先来看看LoG。

正如[李寅的文章](https://medium.com/lis-computer-vision-blogs/scale-invariant-feature-transform-sift-detector-and-descriptor-14165624a11)所指出的，LoG操作是这样的。你拍摄一个图像，然后稍微模糊一下（使用高斯核 Gaussian kernel）

然后，你计算它的二阶导数的总和（或“拉普拉斯”）。这将定位图像上的边缘和角落。这些边和角有利于查找关键点（请注意，我们想要一个**关键点**检测器，这意味着我们将执行一些额外的操作来抑制边缘）。LoG 通常用于**Blob detection 斑点检测**（我将在后面解释）。

记住卷积和微分之间的关系。

![image-20221207173306735](https://cdn.yihuiblog.top/images/202212071733773.png)

我们可以将图像与**高斯的二阶导数卷积，并将它们相加**（或者只是使用 LoG 进行卷积）。

![1__GLMkdxuGZOq4BrYvXbj3A](https://cdn.yihuiblog.top/images/202212071748576.webp)

以一维为例，**f**是图像的扫描线（即图像一行的像素数组）。

![image-20221207174923904](https://cdn.yihuiblog.top/images/202212071749997.png)

![image-20221207174929463](https://cdn.yihuiblog.top/images/202212071749563.png)

可以看到，如果我们使用 LoG 来检测边缘，我们需要找到穿过 LoG 响应的零点。如上所述，我们可以像上面说的那样使用LoG来检测blob，而不是求零点。

![1_Li6T7E-NB4CrcamoadfqUQ](https://cdn.yihuiblog.top/images/202212071752810.webp)

啊哈！我们不再需要找到过零点，我们可以找到极值（最大值和最小值）。

然而，LoG并不是***真正的***尺度不变的，你可以发现： **Laplacian response 拉普拉斯响应**随着尺度的增加而衰减：

![1_7eIi6OB6XYuXXKrBJvZ0fg](https://cdn.yihuiblog.top/images/202212071754782.webp)

那么为什么会这样呢？

我将给你两种解释方式：

![1_7FQKZ6au20qO2pFm3Ej31Q](https://cdn.yihuiblog.top/images/202212071758843.webp)

- 高斯滤波器导数对完美阶跃边沿的响应随着σ的增加而减小。
- 为了保持响应相同（尺度不变），必须将高斯导数乘以σ。
- 拉普拉斯是第二个高斯导数，因此必须乘以 σ2。

**如果您对上述解释感到满意，并且厌倦了为一些数学概念而苦苦挣扎，请随时跳过以下解释。**

另一个解释来自[本教程pdf](http://www.cim.mcgill.ca/~langer/558/2009/lecture11.pdf).

****

考虑一个无噪声图像边 I（x） = u（x − x0），u 是**单位阶跃函数（unit step function）**。为了检测边缘，我们用高斯的导数卷积它们，然后在响应中寻找峰值。假设我们通过卷积 I（x） 与高斯滤波器的一阶导数族来定义一个尺度空间，其中**族**意味着我们有一个σ族。

<img src="https://cdn.yihuiblog.top/images/202212071802969.png" alt="image-20221207180218914" style="zoom:50%;" />

在边 x = x0 的位置，我们有

<img src="https://cdn.yihuiblog.top/images/202212071802096.png" alt="image-20221207180229017" style="zoom:50%;" />

这取决于σ。

![image-20221207180252705](https://cdn.yihuiblog.top/images/202212071802770.png)

如果我们有一个 2D 图像，那么我们以相同的方式定义归一化导数滤波器，即

<img src="https://cdn.yihuiblog.top/images/202212071803864.png" alt="image-20221207180302828" style="zoom:50%;" />

Y也是如此。与上面完全相同的参数用于表明，水平边或垂直边处的值将与σ无关。使用这些滤波器，人们以明显的方式定义归一化的梯度尺度空间，并且会发现任意方向边缘处的梯度将独立于σ。

**现在第二个导数来了**

我们知道，如果我们用高斯的一阶导数滤除一个（无噪声）边，I（x） = u（x − x0），那么我们在边的位置得到一个峰值响应。紧接着，如果我们用高斯的二阶导数过滤边缘

<img src="https://cdn.yihuiblog.top/images/202212071803401.png" alt="image-20221207180333367" style="zoom:50%;" />

则在边缘位置的响应将为零。高斯滤波器的二阶导数及其2D等价物在计算机视觉和人类视觉建模中非常重要，并且是有影响力的早期边缘检测理论的基础。此过滤器对边缘图像的响应为：

<img src="https://cdn.yihuiblog.top/images/202212071837317.png" alt="image-20221207183744259" style="zoom:50%;" />

请注意，正如我们所期望的那样，当 x = x0 时，响应确实为 0。峰值发生在哪里？取出我们得到的导数

<img src="https://cdn.yihuiblog.top/images/202212071839319.png" alt="image-20221207183912280" style="zoom: 50%;" />

并将其设置为 0。因此，峰值发生在以下情况下

<img src="https://cdn.yihuiblog.top/images/202212071839390.png" alt="image-20221207183932356" style="zoom:50%;" />

也就是说，x=x0±σ。代入，我们看到峰值的值为

<img src="https://cdn.yihuiblog.top/images/202212071839124.png" alt="image-20221207183953079" style="zoom:50%;" />

正如我们对一阶导数滤波器所做的那样，我们可以通过乘以 σ2 来归一化二阶导数滤波器，因此定义了归一化的二阶导数滤波器。

<img src="https://cdn.yihuiblog.top/images/202212071840154.png" alt="image-20221207184010116" style="zoom:50%;" />



这消除了峰高度对σ^（−2）的依赖性。因此，我们看到，如果我们用高斯的归一化二阶导数（如上所述）过滤边，那么在边的位置有一个过零点，并且在距离边±σ远的地方有峰值（正和负），但峰值的高度不取决于σ。

总之，我们需要**将 LoG 乘以 σ2** 以获得真正的尺度不变性。结果如下：

![1_ht0Wp28yWGMXd-Zwa7QL7A](https://cdn.yihuiblog.top/images/202212071841226.webp)

现在我们可以在适当的比例下检测地标，这真的很重要，因为我们需要在后面的步骤中描述这个区域，我们需要根据这个比例选择它的周围区域，如下所示：

![1_7p5Q_MlzGa3cxfx212UVtA](https://cdn.yihuiblog.top/images/202212071841451.webp)

在实践中，**拉普拉斯算子Laplacian**是使用高斯差值 （DoG） 近似的。

<img src="https://cdn.yihuiblog.top/images/202212071842146.png" alt="image-20221207184236034" style="zoom:50%;" />

**DoG** 和 **σ2LoG** 之间的关系可以从热扩散方程（参数化为σ而不是更常见的 t = σ2）中理解，更多详细信息可以查看[第 11 页](https://people.kth.se/~tony/papers/scsptheory-review.jas94.pdf)：

<img src="https://cdn.yihuiblog.top/images/202212071843324.png" alt="image-20221207184304286" style="zoom:50%;" />

由此，我们可以看到 LoG 可以从有限差分近似到 ∂G/∂σ 计算，使用 kσ 和 σ 处附近尺度的差值：

<img src="https://cdn.yihuiblog.top/images/202212071843671.png" alt="image-20221207184336600" style="zoom:50%;" />

这表明，当 DoG 函数的尺度相差一个常因子时，它已经包含了尺度不变拉普拉斯所需的 σ2 尺度归一化。方程中的因子 （k − 1） 是所有尺度上的常数，因此不会影响极值位置。

最重要的是，SIFT结合了金字塔和不同的σ空间来检测不同尺度下的斑点。

![1_FgIvcdMirRCZr80IxDjEVg](https://cdn.yihuiblog.top/images/202212071844660.webp)

![1_qjWuosImhajfJLtlUy_IJA](https://cdn.yihuiblog.top/images/202212071844428.webp)

请注意，极值是围绕 3 维（即 x，y，σ）的最大值或最小值。

# 特征点定位（亚像素定位）

这部分主要来自[N Campbell的文章](https://mi.eng.cam.ac.uk/~cipolla/lectures/PartIB/IB-SIFT-extra-material.pdf)。

在步骤 1 之后，我们检测到一些粗略定位的关键点，充其量是最近的像素，具体取决于特征在比例空间中的位置。它们在尺度上也很难定位，因为σ在尺度空间中被量化为相对较少的步骤。SIFT算法的第二阶段将这些特征点的位置细化为亚像素精度，同时删除任何不良特征。子像素定位通过拟合泰勒展开以将 3D 二次曲面（x、y 和 σ）拟合到局部区域来插值最大值或最小值。忽略二次项以上的项，DoG 的展开如下给出，其中导数在提议的点 z0=[x0，y0，σ0]T 处计算，z=[δx，δy，δσ]T 是该点的偏移量。



> *最后，对特征向量进行修改，以减少光照变化的影响。首先，将向量归一化为单位长度。图像对比度的变化（其中每个像素值乘以一个常数）将使梯度乘以相同的常数，因此这种对比度变化将通过矢量归一化来抵消。向每个图像像素添加一个常量的亮度变化不会影响梯度值，因为它们是根据像素差异计算得出的。因此，描述符对于照明中的仿射变化是不变的。但是，由于相机饱和或照明变化，也会发生非线性照明变化，这些变化会影响具有不同方向的 3D 表面。这些效应可能会导致某些渐变的相对幅度发生较大变化，但不太可能影响渐变方向。因此，我们通过将单位特征向量中的值阈值设置为每个值不大于 0.2，然后重新规范化为单位长度来减少大梯度幅度的影响。这意味着匹配大梯度的幅度不再那么重要，并且方向的分布更加强调。0.2的值是使用包含相同3D对象不同照明的图像通过实验确定的。*