
# Mango Editor for Markdown

![Mango](./img/Mango1_256.png)

## What is Mango?

**Mango** is a Markdown editor designed for Linux, also supports Windows and Mac OSX. It's not only supports Markdown, but also extends Markdown syntax with some nice features to help people conveniently write **mathematical formula** and **code**.

**Mango** is a open source project in [Github](https://github.com/egrcc/Mango), and uses many other open source projects. For detailed information, please see **Acknowlegements** in help menu.   


## What is Markdown?

> Markdown is a markup language with plain text formatting syntax designed so that it can be converted to HTML and many other formats using a tool by the same name.    —— [Wikipedia](http://en.wikipedia.org/wiki/Markdown)

**Markdown** was created by **John Gruber**, with substantial contributions from **Aaron Swartz** in 2004 with the goal of enabling people "to write using an easy-to-read, easy-to-write plain text format, and optionally convert it to structurally valid XHTML (or HTML)”.

For detailed Markdown syntax, please see **Markdown Syntax Help** in help menu.

## Main Features

#### 1. Cross Platform Support

**Mango** is powered by [NW.js](http://nwjs.io/), so it supports all three major operating systems: **Windows**, **Mac OS X**, and **Linux**. 

#### 2 . Live Preview with Scroll Sync

**Mango**’s Scroll Sync accurately binds the scrollbars of the editor panel and the preview panel to ensure that you always keep an eye on the output while writing.

#### 3 . Mathematics Expression

With **MathJax** support you can render beautiful **LaTeX** expressions. For inline formulas, enclose the formula in `$...$`. For displayed formulas, use `$$...$$`. For example:

**Pythagorean theorem**: $a^2 + b^2 = c^2$.

**Normal distribution**:
$$f(x, \mu, \sigma) = \frac{1}{\sigma \sqrt{2\pi} } e^{ -\frac{(x-\mu)^2}{2\sigma^2} } $$

**Maxwell's Equations**:

$$
\begin{gather}
\nabla \cdot \mathbf{D} = \rho_\text{f}\tag{1} \\
\nabla \cdot \mathbf{B} = 0\tag{2} \\
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}} {\partial t}\tag{3}  \\
\nabla \times \mathbf{H} = \mathbf{J}_\text{f} + \frac{\partial \mathbf{D}} {\partial t}\tag{4}
\end{gather}
$$
    
    
                            
#### 4. Syntax Highlighting 

You can write code like below, that will highlighted in the Live Preview:


``` python
# from zhihu-python(https://github.com/egrcc/zhihu-python)

from zhihu import Question

url = "http://www.zhihu.com/question/24269892"
question = Question(url)
answers = question.get_all_answers()
for answer in answers:
    answer.to_txt()
    answer.to_md()
```

#### 5. Export to Various Formats 

You can conveniently export your documents to PDF (shortcut: `Ctrl + E`) and HTML (shortcut: `Shift + Ctrl + E`) with beautiful theme.



## Feedback & Bug Report

You can contact me via:

- Twitter：[@egrcc](https://twitter.com/egrcc)
- Weibo：[@egrcc](http://weibo.com/u/2948739432)
- Email： [zhaolujun1994@gmail.com](mailto:zhaolujun1994@gmail.com)
