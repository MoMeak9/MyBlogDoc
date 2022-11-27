# LaTeX 数学公式语法手册

> [手册地址](http://www.uinio.com/Math/LaTex/)

## 保留字符

LaTeX 环境中具有特殊含义的保留字符，不能直接使用，必须通过指定的语法实现：

| 序号  | 符号 |   LaTeX   | 序号  | 符号 |    LaTeX     |
| :---: | :--: | :-------: | :---: | :--: | :----------: |
| **1** |  #   |   `\#`    | **6** |  {   |     `\{`     |
| **2** |  %   |   `\%`    | **7** |  }   |     `\}`     |
| **3** |  ∧   | `^\wedge` | **8** |  ∼   |    `\sim`    |
| **4** |  &   |   `\&`    | **9** |  ∖   | `\backslash` |
| **5** |  _   |   `\_`    |       |      |              |

## 希腊字母

|  序号  | 标准符号 |   LaTeX    | 首字母大写 |   LaTeX    | 使用 `var` 前缀 |          LaTeX           |    读音     |
| :----: | :------: | :--------: | :--------: | :--------: | :-------------: | :----------------------: | :---------: |
| **1**  |    α     |  `\alpha`  |            |            |                 |                          |   /ˈælfə/   |
| **2**  |    β     |  `\beta`   |            |            |                 |                          |  /ˈbeɪtə/   |
| **3**  |    γ     |  `\gamma`  |     Γ      |  `\Gamma`  |        Γ        |       `\varGamma`        |   /ˈɡæmə/   |
| **4**  |    δ     |  `\delta`  |     Δ      |  `\Delta`  |        Δ        |       `\varDelta`        |  /ˈdɛltə/   |
| **5**  |    ϵ     | `\epsilon` |            |            |        ε        |      `\varepsilon`       | /ˈɛpsɪlɒn/  |
| **6**  |    ζ     |  `\zeta`   |            |            |                 |                          |  /ˈzeɪtə/   |
| **7**  |    η     |   `\eta`   |            |            |                 |                          |   /ˈeɪtə/   |
| **8**  |    θ     |  `\theta`  |     Θ      |  `\Theta`  |      ϑ、Θ       | `\vartheta`、`\varTheta` |  /ˈθiːtə/   |
| **9**  |    ι     |  `\iota`   |            |            |                 |                          |  /aɪˈoʊtə/  |
| **10** |    κ     |  `\kappa`  |            |            |        ϰ        |       `\varkappa`        |   /ˈkæpə/   |
| **11** |    λ     | `\lambda`  |     Λ      | `\Lambda`  |        Λ        |       `\varLambda`       |  /ˈlæmdə/   |
| **12** |    μ     |   `\mu`    |            |            |                 |                          |   /mjuː/    |
| **13** |    ν     |   `\nu`    |            |            |                 |                          |   /njuː/    |
| **14** |    ξ     |   `\xi`    |     Ξ      |   `\Xi`    |        Ξ        |         `\varXi`         | /zaɪ, ksaɪ/ |
| **15** |    o     |    `o`     |     O      |    `O`     |                 |                          | /ˈɒmɪkrɒn/  |
| **16** |    π     |   `\pi`    |     Π      |   `\Pi`    |      ϖ、Π       |    `\varpi`、`\varPi`    |    /paɪ/    |
| **17** |    ρ     |   `\rho`   |            |            |        ϱ        |        `\varrho`         |    /roʊ/    |
| **18** |    σ     |  `\sigma`  |     Σ      |  `\Sigma`  |      ς、Σ       | `\varsigma`、`\varSigma` |  /ˈsɪɡmə/   |
| **19** |    τ     |   `\tau`   |            |            |                 |                          | /taʊ, tɔː/  |
| **20** |    υ     | `\upsilon` |     Υ      | `\Upsilon` |        Υ        |      `\varUpsilon`       | /ˈʌpsɪlɒn/  |
| **21** |    ϕ     |   `\phi`   |     Φ      |   `\Phi`   |      φ、Φ       |   `\varphi`、`\varPhi`   |    /faɪ/    |
| **22** |    χ     |   `\chi`   |            |            |                 |                          |    /kaɪ/    |
| **23** |    ψ     |   `\psi`   |     Ψ      |   `\Psi`   |        Ψ        |        `\varPsi`         |   /psaɪ/    |
| **24** |    ω     |  `\omega`  |     Ω      |  `\Omega`  |        Ω        |       `\varOmega`        | /oʊˈmeɪɡə/  |
| **25** |    ϝ     | `\digamma` |            |            |                 |                          | /daɪ'gæmə/  |

## 希伯来字母

| 序号  | 符号 |  LaTeX   | 英文  | 序号  | 符号 |   LaTeX   |  英文  |
| :---: | :--: | :------: | :---: | :---: | :--: | :-------: | :----: |
| **1** |  ℵ   | `\aleph` | aleph | **3** |  ℷ   | `\gimel`  | gimel  |
| **2** |  ℶ   | `\beth`  | beth  | **4** |  ℸ   | `\daleth` | daleth |

## 二元运算符

|  序号  | 符号 |      LaTeX       |  序号  | 符号 |       LaTeX        |
| :----: | :--: | :--------------: | :----: | :--: | :----------------: |
| **1**  |  +   |       `+`        | **20** |  ∙   |     `\bullet`      |
| **2**  |  −   |       `-`        | **21** |  ⊕   |      `\oplus`      |
| **3**  |  ×   |     `\times`     | **22** |  ⊖   |     `\ominus`      |
| **4**  |  ÷   |      `\div`      | **23** |  ⊙   |      `\odot`       |
| **5**  |  ±   |      `\pm`       | **24** |  ⊘   |     `\oslash`      |
| **6**  |  ∓   |      `\mp`       | **25** |  ⊗   |     `\otimes`      |
| **7**  |  ◃   | `\triangleleft`  | **26** |  ◯   |     `\bigcirc`     |
| **8**  |  ▹   | `\triangleright` | **27** |  ⋄   |     `\diamond`     |
| **9**  |  ⋅   |     `\cdot`      | **28** |  ⊎   |      `\uplus`      |
| **10** |  ∖   |   `\setminus`    | **29** |  △   |  `\bigtriangleup`  |
| **11** |  ⋆   |     `\star`      | **30** |  ▽   | `\bigtriangledown` |
| **12** |  ∗   |      `\ast`      | **31** |  ⊲   |       `\lhd`       |
| **13** |  ∪   |      `\cup`      | **32** |  ⊳   |       `\rhd`       |
| **14** |  ∩   |      `\cap`      | **33** |  ⊴   |      `\unlhd`      |
| **15** |  ⊔   |     `\sqcup`     | **34** |  ⊵   |      `\unrhd`      |
| **16** |  ⊓   |     `\sqcap`     | **35** |  ⨿   |      `\amalg`      |
| **17** |  ∨   |      `\vee`      | **36** |  ≀   |       `\wr`        |
| **18** |  ∧   |     `\wedge`     | **37** |  †   |     `\dagger`      |
| **19** |  ∘   |     `\circ`      | **38** |  ‡   |     `\ddagger`     |

## 二元关系符

|  序号  | 符号 |                  LaTeX                   |  序号  | 符号 |     LaTeX      |
| :----: | :--: | :--------------------------------------: | :----: | :--: | :------------: |
| **1**  |  =   |                   `=`                    | **49** |  ⪈   |    `\gneq`     |
| **2**  |  ≠   |                  `\ne`                   | **50** |  ≧   |    `\geqq`     |
| **3**  |  ≠   |                  `\neq`                  | **51** |  ≱   |    `\ngeq`     |
| **4**  |  ≡   |                 `\equiv`                 | **52** |  ≱   |    `\ngeqq`    |
| **5**  |  ≢   |               `\not\equiv`               | **53** |  ≩   |    `\gneqq`    |
| **6**  |  ≐   |                 `\doteq`                 | **54** |  ≩   |  `\gvertneqq`  |
| **7**  |  ≑   |               `\doteqdot`                | **55** |  ≶   |   `\lessgtr`   |
| **8**  | =def | `\overset{\underset{\mathrm{def}}{}}{=}` | **56** |  ⋚   |  `\lesseqgtr`  |
| **9**  |  :=  |                   `:=`                   | **57** |  ⪋   | `\lesseqqgtr`  |
| **10** |  ∼   |                  `\sim`                  | **58** |  ≷   |   `\gtrless`   |
| **11** |  ≁   |                 `\nsim`                  | **59** |  ⋛   |  `\gtreqless`  |
| **12** |  ∽   |                `\backsim`                | **60** |  ⪌   | `\gtreqqless`  |
| **13** |  ∼   |               `\thicksim`                | **61** |  ⩽   |  `\leqslant`   |
| **14** |  ≃   |                 `\simeq`                 | **62** |  ⪇   |  `\nleqslant`  |
| **15** |  ⋍   |               `\backsimeq`               | **63** |  ⪕   | `\eqslantless` |
| **16** |  ≂   |                 `\eqsim`                 | **64** |  ⩾   |  `\geqslant`   |
| **17** |  ≅   |                 `\cong`                  | **65** |  ⪈   |  `\ngeqslant`  |
| **18** |  ≇   |                 `\ncong`                 | **66** |  ⪖   | `\eqslantgtr`  |
| **19** |  ≈   |                `\approx`                 | **67** |  ≲   |   `\lesssim`   |
| **20** |  ≈   |              `\thickapprox`              | **68** |  ⋦   |    `\lnsim`    |
| **21** |  ≊   |               `\approxeq`                | **69** |  ⪅   | `\lessapprox`  |
| **22** |  ≍   |                 `\asymp`                 | **70** |  ⪉   |  `\lnapprox`   |
| **23** |  ∝   |                `\propto`                 | **71** |  ≳   |   `\gtrsim`    |
| **24** |  ∝   |               `\varpropto`               | **72** |  ⋧   |    `\gnsim`    |
| **25** |  <   |                   `<`                    | **73** |  ⪆   |  `\gtrapprox`  |
| **26** |  ≮   |                 `\nless`                 | **74** |  ⪊   |  `\gnapprox`   |
| **27** |  ≪   |                  `\ll`                   | **75** |  ≺   |    `\prec`     |
| **28** |  ≪̸   |                `\not\ll`                 | **76** |  ⊀   |    `\nprec`    |
| **29** |  ⋘   |                  `\lll`                  | **77** |  ⪯   |   `\preceq`    |
| **30** |  ⋘̸   |                `\not\lll`                | **78** |  ⋠   |   `\npreceq`   |
| **31** |  ⋖   |                `\lessdot`                | **79** |  ⪵   |  `\precneqq`   |
| **32** |  >   |                   `>`                    | **80** |  ≻   |    `\succ`     |
| **33** |  ≯   |                 `\ngtr`                  | **81** |  ⊁   |    `\nsucc`    |
| **34** |  ≫   |                  `\gg`                   | **82** |  ⪰   |   `\succeq`    |
| **35** |  ≫̸   |                `\not\gg`                 | **83** |  ⋡   |   `\nsucceq`   |
| **36** |  ⋙   |                  `\ggg`                  | **84** |  ⪶   |  `\succneqq`   |
| **37** |  ⋙̸   |                `\not\ggg`                | **85** |  ≼   | `\preccurlyeq` |
| **38** |  ⋗   |                `\gtrdot`                 | **86** |  ⋞   | `\curlyeqprec` |
| **39** |  ≤   |                  `\le`                   | **87** |  ≽   | `\succcurlyeq` |
| **40** |  ≤   |                  `\leq`                  | **88** |  ⋟   | `\curlyeqsucc` |
| **41** |  ⪇   |                 `\lneq`                  | **89** |  ≾   |   `\precsim`   |
| **42** |  ≦   |                 `\leqq`                  | **90** |  ⋨   |  `\precnsim`   |
| **43** |  ≰   |                 `\nleq`                  | **91** |  ⪷   | `\precapprox`  |
| **44** |  ≰   |                 `\nleqq`                 | **92** |  ⪹   | `\precnapprox` |
| **45** |  ≨   |                 `\lneqq`                 | **93** |  ≿   |   `\succsim`   |
| **46** |  ≨   |               `\lvertneqq`               | **94** |  ⋩   |  `\succnsim`   |
| **47** |  ≥   |                  `\ge`                   | **95** |  ⪸   | `\succapprox`  |
| **48** |  ≥   |                  `\geq`                  | **96** |  ⪺   | `\succnapprox` |

## 几何符号

|  序号  | 符号 |        LaTeX        |  序号  | 符号 |         LaTeX         |
| :----: | :--: | :-----------------: | :----: | :--: | :-------------------: |
| **1**  |  ∥   |     `\parallel`     | **14** |  ◊   |      `\lozenge`       |
| **2**  |  ∦   |    `\nparallel`     | **15** |  ⧫   |    `\blacklozenge`    |
| **3**  |  ∥   |  `\shortparallel`   | **16** |  ★   |      `\bigstar`       |
| **4**  |  ∦   |  `\nshortparallel`  | **17** |  ◯   |      `\bigcirc`       |
| **5**  |  ⊥   |       `\perp`       | **18** |  △   |      `\triangle`      |
| **6**  |  ∠   |      `\angle`       | **19** |  △   |   `\bigtriangleup`    |
| **7**  |  ∢   |  `\sphericalangle`  | **20** |  ▽   |  `\bigtriangledown`   |
| **8**  |  ∡   |  `\measuredangle`   | **21** |  △   |    `\vartriangle`     |
| **9**  | 45∘  |     `45^\circ`      | **22** |  ▽   |    `\triangledown`    |
| **10** |  ◻   |       `\Box`        | **23** |  ▴   |   `\blacktriangle`    |
| **11** |  ◼   |   `\blacksquare`    | **24** |  ▾   | `\blacktriangledown`  |
| **12** |  ⋄   |     `\diamond`      | **25** |  ◂   | `\blacktriangleleft`  |
| **13** |  ◊◊  | `\Diamond \lozenge` | **26** |  ▸   | `\blacktriangleright` |

## 逻辑符号

|  序号  | 符号 |      LaTeX       |  序号  | 符号 |         LaTeX          |
| :----: | :--: | :--------------: | :----: | :--: | :--------------------: |
| **1**  |  ∀   |    `\forall`     | **20** |  ¬   |         `\neg`         |
| **2**  |  ∃   |    `\exists`     | **21** |  ⧸R  | `\not\operatorname{R}` |
| **3**  |  ∄   |    `\nexists`    | **22** |  ⊥   |         `\bot`         |
| **4**  |  ∴   |   `\therefore`   | **23** |  ⊤   |         `\top`         |
| **5**  |  ∵   |    `\because`    | **24** |  ⊢   |        `\vdash`        |
| **6**  |  &   |      `\And`      | **25** |  ⊣   |        `\dashv`        |
| **7**  |  ∨   |      `\lor`      | **26** |  ⊨   |        `\vDash`        |
| **8**  |  ∨   |      `\vee`      | **27** |  ⊩   |        `\Vdash`        |
| **9**  |  ⋎   |   `\curlyvee`    | **28** |  ⊨   |       `\models`        |
| **10** |  ⋁   |    `\bigvee`     | **29** |  ⊪   |       `\Vvdash`        |
| **11** |  ∧   |     `\land`      | **30** |  ⊬   |       `\nvdash`        |
| **12** |  ∧   |     `\wedge`     | **31** |  ⊮   |       `\nVdash`        |
| **13** |  ⋏   |  `\curlywedge`   | **32** |  ⊭   |       `\nvDash`        |
| **14** |  ⋀   |   `\bigwedge`    | **33** |  ⊯   |       `\nVDash`        |
| **15** |  q¯  |    `\bar{q}`     | **34** |  ⌜   |      `\ulcorner`       |
| **16** | abc¯ |   `\bar{abc}`    | **35** |  ⌝   |      `\urcorner`       |
| **17** |  q―  |  `\overline{q}`  | **36** |  ⌞   |      `\llcorner`       |
| **18** | abc― | `\overline{abc}` | **37** |  ⌟   |      `\lrcorner`       |
| **19** |  ¬   |     `\lnot`      |        |      |                        |

## 集合符号

|  序号  | 符号 |      LaTeX       |  序号  | 符号 |      LaTeX       |
| :----: | :--: | :--------------: | :----: | :--: | :--------------: |
| **1**  |  {}  |     `\{ \}`      | **23** |  ⊏   |   `\sqsubset`    |
| **2**  |  ∅   |   `\emptyset`    | **24** |  ⊃   |    `\supset`     |
| **3**  |  ∅   |  `\varnothing`   | **25** |  ⋑   |    `\Supset`     |
| **4**  |  ∈   |      `\in`       | **26** |  ⊐   |   `\sqsupset`    |
| **5**  |  ∉   |     `\notin`     | **27** |  ⊆   |   `\subseteq`    |
| **6**  |  ∋   |      `\ni`       | **28** |  ⊈   |   `\nsubseteq`   |
| **7**  |  ∩   |      `\cap`      | **29** |  ⊊   |   `\subsetneq`   |
| **8**  |  ⋒   |      `\Cap`      | **30** |  ⊊   | `\varsubsetneq`  |
| **9**  |  ⊓   |     `\sqcap`     | **31** |  ⊑   |  `\sqsubseteq`   |
| **10** |  ⋂   |    `\bigcap`     | **32** |  ⊇   |   `\supseteq`    |
| **11** |  ∪   |      `\cup`      | **33** |  ⊉   |   `\nsupseteq`   |
| **12** |  ⋓   |      `\Cup`      | **34** |  ⊋   |   `\supsetneq`   |
| **13** |  ⊔   |     `\sqcup`     | **35** |  ⊋   | `\varsupsetneq`  |
| **14** |  ⋃   |    `\bigcup`     | **36** |  ⊒   |  `\sqsupseteq`   |
| **15** |  ⨆   |   `\bigsqcup`    | **37** |  ⫅   |   `\subseteqq`   |
| **16** |  ⊎   |     `\uplus`     | **38** |  ⊈   |  `\nsubseteqq`   |
| **17** |  ⨄   |   `\biguplus`    | **39** |  ⫋   |  `\subsetneqq`   |
| **18** |  ∖   |   `\setminus`    | **40** |  ⫋   | `\varsubsetneqq` |
| **19** |  ∖   | `\smallsetminus` | **41** |  ⫆   |   `\supseteqq`   |
| **20** |  ×   |     `\times`     | **42** |  ⊉   |  `\nsupseteqq`   |
| **21** |  ⊂   |    `\subset`     | **43** |  ⫌   |  `\supsetneqq`   |
| **22** |  ⋐   |    `\Subset`     | **44** |  ⫌   | `\varsupsetneqq` |

## 箭头符号

|  序号  | 符号 |         LaTeX         |  序号  | 符号 |         LaTeX          |
| :----: | :--: | :-------------------: | :----: | :--: | :--------------------: |
| **1**  |  ⇛   |    `\Rrightarrow`     | **36** |  ⟼   |     `\longmapsto`      |
| **2**  |  ⇚   |     `\Lleftarrow`     | **37** |  ⇀   |   `\rightharpoonup`    |
| **3**  |  ⇒   |     `\Rightarrow`     | **38** |  ⇁   |  `\rightharpoondown`   |
| **4**  |  ⇏   |    `\nRightarrow`     | **39** |  ↼   |    `\leftharpoonup`    |
| **5**  |  ⟹   |   `\Longrightarrow`   | **40** |  ↽   |   `\leftharpoondown`   |
| **6**  |  ⟹   |      `\implies`       | **41** |  ↿   |    `\upharpoonleft`    |
| **7**  |  ⇐   |     `\Leftarrow`      | **42** |  ↾   |   `\upharpoonright`    |
| **8**  |  ⇍   |     `\nLeftarrow`     | **43** |  ⇃   |   `\downharpoonleft`   |
| **9**  |  ⟸   |   `\Longleftarrow`    | **44** |  ⇂   |  `\downharpoonright`   |
| **10** |  ⇔   |   `\Leftrightarrow`   | **45** |  ⇌   |  `\rightleftharpoons`  |
| **11** |  ⇎   |  `\nLeftrightarrow`   | **46** |  ⇋   |  `\leftrightharpoons`  |
| **12** |  ⟺   | `\Longleftrightarrow` | **47** |  ↶   |   `\curvearrowleft`    |
| **13** |  ⟺   |        `\iff`         | **48** |  ↺   |   `\circlearrowleft`   |
| **14** |  ⇑   |      `\Uparrow`       | **49** |  ↰   |         `\Lsh`         |
| **15** |  ⇓   |     `\Downarrow`      | **50** |  ⇈   |     `\upuparrows`      |
| **16** |  ⇕   |    `\Updownarrow`     | **51** |  ⇉   |  `\rightrightarrows`   |
| **17** |  →   |     `\rightarrow`     | **52** |  ⇄   |   `\rightleftarrows`   |
| **18** |  →   |         `\to`         | **53** |  ↣   |   `\rightarrowtail`    |
| **19** |  ↛   |    `\nrightarrow`     | **54** |  ↬   |   `\looparrowright`    |
| **20** |  ⟶   |   `\longrightarrow`   | **55** |  ↷   |   `\curvearrowright`   |
| **21** |  ←   |     `\leftarrow`      | **56** |  ↻   |  `\circlearrowright`   |
| **22** |  ←   |        `\gets`        | **57** |  ↱   |         `\Rsh`         |
| **23** |  ↚   |     `\nleftarrow`     | **58** |  ⇊   |   `\downdownarrows`    |
| **24** |  ⟵   |   `\longleftarrow`    | **59** |  ⇇   |   `\leftleftarrows`    |
| **25** |  ↔   |   `\leftrightarrow`   | **60** |  ⇆   |   `\leftrightarrows`   |
| **26** |  ↮   |  `\nleftrightarrow`   | **61** |  ↢   |    `\leftarrowtail`    |
| **27** |  ⟷   | `\longleftrightarrow` | **62** |  ↫   |    `\looparrowleft`    |
| **28** |  ↑   |      `\uparrow`       | **63** |  ↪   |   `\hookrightarrow`    |
| **29** |  ↓   |     `\downarrow`      | **64** |  ↩   |    `\hookleftarrow`    |
| **30** |  ↕   |    `\updownarrow`     | **65** |  ⊸   |      `\multimap`       |
| **31** |  ↗   |      `\nearrow`       | **66** |  ↭   | `\leftrightsquigarrow` |
| **32** |  ↙   |      `\swarrow`       | **67** |  ⇝   |   `\rightsquigarrow`   |
| **33** |  ↖   |      `\nwarrow`       | **68** |  ↠   |  `\twoheadrightarrow`  |
| **34** |  ↘   |      `\searrow`       | **69** |  ↞   |  `\twoheadleftarrow`   |
| **35** |  ↦   |       `\mapsto`       |        |      |                        |

## 特殊符号

|  序号  | 符号 |      LaTeX       |  序号  | 符号 |        LaTeX        |
| :----: | :--: | :--------------: | :----: | :--: | :-----------------: |
| **1**  |  ∞   |     `\infty`     | **33** |  ♭   |       `\flat`       |
| **2**  |  ℵ   |     `\aleph`     | **34** |  ♮   |     `\natural`      |
| **3**  |  ∁   |  `\complement`   | **35** |  ♯   |      `\sharp`       |
| **4**  |  ∍   |  `\backepsilon`  | **36** |  ╱   |      `\diagup`      |
| **5**  |  ð   |      `\eth`      | **37** |  ╲   |     `\diagdown`     |
| **6**  |  Ⅎ   |     `\Finv`      | **38** |  ⋅   |    `\centerdot`     |
| **7**  |  ℏ   |     `\hbar`      | **39** |  ⋉   |      `\ltimes`      |
| **8**  |  ℑ   |      `\Im`       | **40** |  ⋊   |      `\rtimes`      |
| **9**  |  ı   |     `\imath`     | **41** |  ⋋   |  `\leftthreetimes`  |
| **10** |  ȷ   |     `\jmath`     | **42** |  ⋌   | `\rightthreetimes`  |
| **11** |  𝕜k  |     `\Bbbk`      | **43** |  ≖   |      `\eqcirc`      |
| **12** |  ℓ   |      `\ell`      | **44** |  ≗   |      `\circeq`      |
| **13** |  ℧   |      `\mho`      | **45** |  ≜   |    `\triangleq`     |
| **14** |  ℘   |      `\wp`       | **46** |  ≏   |      `\bumpeq`      |
| **15** |  ℜ   |      `\Re`       | **47** |  ≎   |      `\Bumpeq`      |
| **16** |  Ⓢ   |   `\circledS`    | **48** |  ≑   |     `\doteqdot`     |
| **17** |  ⨿   |     `\amalg`     | **49** |  ≓   |   `\risingdotseq`   |
| **18** |  %   |       `\%`       | **50** |  ≒   |  `\fallingdotseq`   |
| **19** |  †   |    `\dagger`     | **51** |  ⊺   |     `\intercal`     |
| **20** |  ‡   |    `\ddagger`    | **52** |  ⊼   |     `\barwedge`     |
| **21** |  …   |     `\ldots`     | **53** |  ⊻   |      `\veebar`      |
| **22** |  ⋯   |     `\cdots`     | **54** |  ⩞   |  `\doublebarwedge`  |
| **23** |  ⌣   |     `\smile`     | **55** |  ≬   |     `\between`      |
| **24** |  ⌢   |     `\frown`     | **56** |  ⋔   |    `\pitchfork`     |
| **25** |  ≀   |      `\wr`       | **57** |  ⊲   | `\vartriangleleft`  |
| **26** |  ◃   | `\triangleleft`  | **58** |  ⋪   |  `\ntriangleleft`   |
| **27** |  ▹   | `\triangleright` | **59** |  ⊳   | `\vartriangleright` |
| **28** |  ♢   |  `\diamondsuit`  | **60** |  ⋫   |  `\ntriangleright`  |
| **29** |  ♡   |   `\heartsuit`   | **61** |  ⊴   |  `\trianglelefteq`  |
| **30** |  ♣   |   `\clubsuit`    | **62** |  ⋬   | `\ntrianglelefteq`  |
| **31** |  ♠   |   `\spadesuit`   | **63** |  ⊵   | `\trianglerighteq`  |
| **32** |  ⅁   |     `\Game`      | **64** |  ⋭   | `\ntrianglerighteq` |

## 分数

| 类型                    | 符号               | LaTeX                                                        |
| :---------------------- | :----------------- | :----------------------------------------------------------- |
| **分数**                | 24x=0.5xor24x=0.5x | `\frac{2}{4}x=0.5x or {2 \over 4}x=0.5x`                     |
| **小型分数**            | 24x=0.5x           | `\tfrac{2}{4}x = 0.5x`                                       |
| **大型分数** （不嵌套） | 24=0.52c+2d+24=a   | `\dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \dfrac{2}{d + \dfrac{2}{4}}} = a` |
| **大型分数** （嵌套）   | 2c+2d+24=a         | `\cfrac{2}{c + \cfrac{2}{d + \cfrac{2}{4}}} = a`             |

## 数值函数

| 符号                          | LaTeX                                                        |
| :---------------------------- | :----------------------------------------------------------- |
| expa⁡b=ab,exp⁡b=eb,10m          | `\exp_a b = a^b, \exp b = e^b, 10^m`                         |
| ln⁡c,lg⁡d=log⁡e,log10⁡f           | `\ln c, \lg d = \log e, \log_{10} f`                         |
| sin⁡a,cos⁡b,tan⁡c,cot⁡d,sec⁡e,csc⁡f | `\sin a, \cos b, \tan c, \cot d, \sec e, \csc f`             |
| arcsin⁡a,arccos⁡b,arctan⁡c       | `\arcsin a, \arccos b, \arctan c`                            |
| arccot⁡d,arcsec⁡e,arccsc⁡f       | `\operatorname{arccot} d, \operatorname{arcsec} e, \operatorname{arccsc} f` |
| sinh⁡a,cosh⁡b,tanh⁡c,coth⁡d       | `\sinh a, \cosh b, \tanh c, \coth d`                         |
| sh⁡k,ch⁡l,th⁡m,coth⁡n             | `\operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n` |
| argsh⁡o,argch⁡p,argth⁡q          | `\operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q` |
| sgn⁡r,\|s\|                    | `\operatorname{sgn}r, \left\vert s \right\vert`              |
| min(x,y),max(x,y)             | `\min(x,y), \max(x,y)`                                       |

如果需要使用特殊的函数符号，那么可以采用 `\operatorname{}` 命令进行自定义：

| 符号      | LaTeX                      |
| :-------- | :------------------------- |
| mydefine⁡x | `\operatorname{mydefine}x` |

## 根式

| 符号 | LaTeX        | 符号    | LaTeX                           |
| :--- | :----------- | :------ | :------------------------------ |
| √    | `\surd`      | πn      | `\sqrt[n]{\pi}`                 |
| π    | `\sqrt{\pi}` | x3+y323 | `\sqrt[3]{\frac{x^3+y^3}{2}}*`_ |

## 微分与导数

| 符号                            | LaTeX                                                        |
| :------------------------------ | :----------------------------------------------------------- |
| dt,dt,∂t,∇ψ                     | `dt, \mathrm{d}t, \partial t, \nabla\psi`                    |
| dy/dx,dy/dx,dydx,dydx,∂2∂x1∂x2y | `dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y` |
| ′,‵,f′,f′,f″,f(3),y˙,y¨         | `\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y` |

## 模运算

| 符号              | LaTeX                                  |
| :---------------- | :------------------------------------- |
| sk≡0(modm)        | `s_k \equiv 0 \pmod{m}`                |
| amodb             | `a \bmod b`                            |
| gcd(m,n),lcm⁡(m,n) | `\gcd(m, n), \operatorname{lcm}(m, n)` |
| ∣,∤,∣,∤           | `\mid, \nmid, \shortmid, \nshortmid`   |

## 极限

| 符号     | LaTeX                               |
| :------- | :---------------------------------- |
| limn→∞xn | `\lim_{n \to \infty}x_n`            |
| limn→∞xn | `\textstyle \lim_{n \to \infty}x_n` |

## 范围与预测

| 符号                   | LaTeX                                    |
| :--------------------- | :--------------------------------------- |
| minx,maxy,infs,supt    | `\min x, \max y, \inf s, \sup t`         |
| limu,lim infv,lim supw | `\lim u, \liminf v, \limsup w`           |
| dim⁡p,deg⁡q,detm,ker⁡ϕ    | `\dim p, \deg q, \det m, \ker\phi`       |
| Prj,hom⁡l,‖z‖,arg⁡z      | `\Pr j, \hom l, \lVert z \rVert, \arg z` |

## 积分

| 符号               | LaTeX                                       |
| :----------------- | :------------------------------------------ |
| ∫13e3/xx2dx        | `\int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx` |
| ∫13e3/xx2dx        | `\int_{1}^{3}\frac{e^3/x}{x^2}\, dx`        |
| ∫−NNexdx           | `\textstyle \int\limits_{-N}^{N} e^x dx`    |
| ∫−NNexdx           | `\textstyle \int_{-N}^{N} e^x dx`           |
| ∬Ddxdy             | `\iint\limits_D dx\,dy`                     |
| ∭Edxdydz           | `\iiint\limits_E dx\,dy\,dz`                |
| ⨌Fdxdydzdt         | `\iiiint\limits_F dx\,dy\,dz\,dt`           |
| ∫(x,y)∈Cx3dx+4y2dy | `\int_{(x,y)\in C} x^3\, dx + 4y^2\, dy`    |
| ∮(x,y)∈Cx3dx+4y2dy | `\oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy`   |

> **注意**：积分符号采用 `\int\_{}^{}` 命令调用，双重积分符号采用 `\iint\_{}^{}`，以此类推，最高可以支持四重积分。

曲线积分可以使用 `\oint` 命令调用，但是 MathJax 并不支持该语法，因此在开启了 Unicode 扩展的前提下，可以改为采用 `\unicode{}` 命令调用：

| 符号            | LaTeX                                                        | 描述                                                         |
| :-------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| ∯∯∯∯C           | `\unicode{8751} \unicode{x222F}_C`                           | 曲面积分符号的 Unicode 码十进制为 `8751`,十六进制为 `x222F`； |
| ∰∰∰∰C           | `\unicode{8752} \unicode{x2230}_C`                           | 三维曲面积分符号的 Unicode 码十进制为 `8752`,十六进制为 `x2230`； |
| ∱∱∲∲∳∳∱∱c∲∲c∳∳c | `\unicode{8753} \unicode{x2231}_c \unicode{8754} \unicode{x2232}_c \unicode{8755} \unicode{x2233}_c` | 其它积分符号；                                               |

## 大型运算符

| 分类       | 符号 | LaTeX               | 符号 | LaTeX                          |
| :--------- | :--: | :------------------ | :--: | :----------------------------- |
| **求和**   | ∑ab  | `\sum_{a}^{b}`      | ∑ab  | `\textstyle \sum_{a}^{b}`      |
| **连乘积** | ∏ab  | `\prod_{a}^{b}`     | ∏ab  | `\textstyle \prod_{a}^{b}`     |
| **余积**   | ∐ab  | `\coprod_{a}^{b}`   | ∐ab  | `\textstyle \coprod_{a}^{b}`   |
| **并集**   | ⋃ab  | `\bigcup_{a}^{b}`   | ⋃ab  | `\textstyle \bigcup_{a}^{b}`   |
| **交集**   | ⋂ab  | `\bigcap_{a}^{b}`   | ⋂ab  | `\textstyle \bigcap_{a}^{b}`   |
| **析取**   | ⋁ab  | `\bigvee_{a}^{b}`   | ⋁ab  | `\textstyle \bigvee_{a}^{b}`   |
| **合取**   | ⋀ab  | `\bigwedge_{a}^{b}` | ⋀ab  | `\textstyle \bigwedge_{a}^{b}` |

## 上下标

|           类型           |              符号               | 代码                                                         |
| :----------------------: | :-----------------------------: | :----------------------------------------------------------- |
|         **上标**         |             a2 ax+3             | `a^2` `a^{x+3}`                                              |
|         **下标**         |               a2                | `a_2`                                                        |
|         **组合**         |        1030a2+2 ai,jbf′         | `10^{30} a^{2+2}` `a{i,j} b{f'}`                             |
|      **上下标混合**      |             x23 x23             | `x_2^3` `{x_2}^3`                                            |
|      **上标的上标**      |              10108              | `10^{10^{8}}`                                                |
|       **混合标识**       |         X⁡12X⁡34ab 12!Ω34         | `\sideset{1^2}{3^4}X_a^b` `{}_1^2!\Omega_3^4`                |
|       **顶标底标**       |          ωα ωα ωγα ωα           | `\overset{\alpha}{\omega}` `\underset{\alpha}{\omega}` `\overset{\alpha}{\underset{\gamma}{\omega}}` `\stackrel{\alpha}{\omega}` |
|         **导数**         |       x′,y″,f′,f″ x′,y′′        | `x', y'', f', f''` `x^\prime, y^{\prime\prime}`              |
|        **导数点**        |              x˙,x¨              | `\dot{x}, \ddot{x}`                                          |
|    **上下划线与向量**    | a^ b¯ c→ ab→ cd← def^ ghi― jkl― | `\hat a \ \bar b \ \vec c` `\overrightarrow{a b} \ \overleftarrow{c d} \ \widehat{d e f}` `\overline{g h i} \ \underline{j k l}` |
|         **弧度**         |               AB⌢               | `\overset{\frown} {AB}`                                      |
|         **箭头**         |        A←n+μ−1B→Tn±i−1C         | `A \xleftarrow{n+\mu-1} B \xrightarrow[T]{n\pm i-1} C`       |
|        **大括号**        |         1+2+⋯+100⏞5050          | `\overbrace{ 1+2+\cdots+100 }^{5050}`                        |
|      **底部大括号**      |           a+b+⋯+z⏟26            | `\underbrace{ a+b+\cdots+z }_{26}`                           |
|       **求和运算**       |             ∑k=1Nk2             | `\sum_{k=1}^N k^2`                                           |
| **文本模式下的求和运算** |             ∑k=1Nk2             | `\textstyle \sum_{k=1}^N k^2`                                |
|   **分式中的求和运算**   |            ∑k=1Nk2a             | `\frac{\sum_{k=1}^N k^2}{a}`                                 |
|   **分式中的求和运算**   |            ∑k=1Nk2a             | `\frac{\displaystyle \sum_{k=1}^N k^2}{a}`                   |
|   **分式中的求和运算**   |            ∑k=1Nk2a             | `\frac{\sum\limits^{^N}_{k=1} k^2}{a}`                       |
|       **乘积运算**       |             ∏i=1Nxi             | `\prod_{i=1}^N x_i`                                          |
|       **乘积运算**       |             ∏i=1Nxi             | `\textstyle \prod_{i=1}^N x_i`                               |
|       **副乘运算**       |             ∐i=1Nxi             | `\coprod_{i=1}^N x_i`                                        |
|       **副乘运算**       |             ∐i=1Nxi             | `\textstyle \coprod_{i=1}^N x_i`                             |
|         **极限**         |            limn→∞xn             | `\lim_{n \to \infty}x_n`                                     |
|         **极限**         |            limn→∞xn             | `\textstyle \lim_{n \to \infty}x_n`                          |
|         **积分**         |           ∫13e3/xx2dx           | `\int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx`                  |
|         **积分**         |           ∫13e3/xx2dx           | `\int_{1}^{3}\frac{e^3/x}{x^2}\, dx`                         |
|         **积分**         |            ∫−NNexdx             | `\textstyle \int\limits_{-N}^{N} e^x dx`                     |
|         **积分**         |            ∫−NNexdx             | `\textstyle \int_{-N}^{N} e^x dx`                            |
|       **双重积分**       |             ∬Ddxdy              | `\iint\limits_D dx\,dy`                                      |
|       **三重积分**       |            ∭Edxdydz             | `\iiint\limits_E dx\,dy\,dz`                                 |
|       **四重积分**       |           ⨌Fdxdydzdt            | `\iiiint\limits_F dx\,dy\,dz\,dt`                            |
|       **路径积分**       |       ∫(x,y)∈Cx3dx+4y2dy        | `\int_{(x,y)\in C} x^3\, dx + 4y^2\, dy`                     |
|       **环路积分**       |       ∮(x,y)∈Cx3dx+4y2dy        | `\oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy`                    |
|         **交集**         |             ⋂i=1nEi             | `\bigcap_{i=1}^n E_i`                                        |
|         **并集**         |             ⋃i=1nEi             | `\bigcup_{i=1}^n E_i`                                        |

## 二项式系数

| 类型           | 符号 | LaTeX           |
| :------------- | :--- | :-------------- |
| 二项式系数     | (nk) | `\binom{n}{k}`  |
| 小型二项式系数 | (nk) | `\tbinom{n}{k}` |
| 大型二项式系数 | (nk) | `\dbinom{n}{k}` |

## 矩阵

$$
\begin{matrix}
x & y \\
z & v
\end{matrix}
$$

```latex
\begin{matrix}
x & y \\
z & v
\end{matrix}
```

$$
\begin{vmatrix}
x & y \\
z & v
\end{vmatrix}

$$

```latex
\begin{vmatrix}
x & y \\
z & v
\end{vmatrix}
```

