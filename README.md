## JQ创建一个全局JQuery和$
> jQuery设计思想：返回值不再是元素，而是操作元素的一个对象，这是jQuery可以链式操作的本质

```js
window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  const api = Object.create(jQuery.prototype)
  return Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArray.oldApi,
  })
}
window.$ = window.jQuery
```

## 获取元素
```
$('#test')
$('#test .child')
```

## 链式操作
使用：
```
$('test').find('.child')
$('div').find('h3').eq(2).html('Hello');


```
部分源代码：
```
find(selector) {
    let array = []
    this.each((e) => {
      array = array.concat(Array.from(e.querySelectorAll(selector)))
    })
    array.oldApi = this
    return jQuery(array)
  }
```
> 设计思想：find函数返回值不是找到的元素，而是又使用jQuery创建了一个操作元素的对象

## 创建元素
```
$('<p>Hello</p>');
$('ul').append('<li>list item</li>');
```

## 移动
　　.insertAfter()和.after()：在现存元素的外部，从后面插入元素

　　.insertBefore()和.before()：在现存元素的外部，从前面插入元素

　　.appendTo()和.append()：在现存元素的内部，从后面插入元素

　　.prependTo()和.prepend()：在现存元素的内部，从前面插入元素
  
## 修改或设置元素的属性
```
.attr() 取出或设置某个属性的值
```