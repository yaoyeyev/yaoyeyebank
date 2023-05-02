// 1,根据原始的轮播图的图片数量,动态生成焦点按钮
// 原理:根据ul中li的数量,动态生成ol中li标签,并且写入到ol中
// 循环 ul,li 的伪数组,根据数组的单元个数,生成ol中的li
// for循环  for...in  forEach,都可以
// forEach中,item是ul,li标签,key是标签对应的索引

function setLi() {
    var str = '';
    oUllis.forEach(function (item, key) {

        if (key === 0) {
            // 给第一个标签添加样式
            str += `<li class="active" index="${key + 1}"></li>`;
        } else {
            // 给每个li标签,添加属性,属性值是索引+1
            str += `<li index="${key + 1}"></li>`;
        }
    })

    oOl.innerHTML = str;

}


// 2, 向页面写入标签
// 复制的标签是动态生成的,页面内的标签是什么,我们就复制
// 复制第一个ul中的li,复制最后一个ul中的li
// 将复制的最后一个,写入到一个之前
// 将复制的第一个,写入到最后一个之后

// 根据新的标签结构,定义新的ul的宽度
// 宽度是 li的个数 * li的宽度
// 新的li的个数: 是原始li个数 + 2

// 将ul整体左移一个li宽度

// 步骤:
// 1,获取li,第一个和最后一个
// 2,复制li
// 3,写入li
// 4,设定ul宽
// 5,ul左移一个宽度

function copyLi() {
    // 1,获取需要复制的标签
    var liF = oUllis[0];
    var liL = oUllis[oUllis.length - 1];

    // 2,复制克隆标签
    var first = liF.cloneNode(true);
    var last = liL.cloneNode(true);

    // 3,写入标签
    oUl.appendChild(first);
    oUl.insertBefore(last, liF);

    // 4,设定 ul的新宽度
    oUl.style.width = ((oUllis.length + 2) * liWidth) + 'px';

    // 5,当前ul显示的是最后一个轮播图
    // 需要左移一个li宽度
    oUl.style.left = -liWidth + 'px';
}


// 3, 轮播图轮序播放函数

function autoLoop() {

    // 定义一个定时器,来执行move()函数
    // 将定时器存储在全局itme变量中
    time = setInterval(function () {
        // 给变量++,也就是需要切换下一张图片了
        index++;

        move(oUl, { left: -index * liWidth }, moveEnd );
    }, 4000);

}

// move() 运动函数终止时执行的程序

function moveEnd(){
    if(index == oUllis.length + 1){
        index = 1;
        oUl.style.left = -index*liWidth + 'px';
    }
}


function stopLoop() {
    oUl.addEventListener('mouseover', function () {
        // 鼠标移入，清除定时器
        clearInterval(time);
    })

    oUl.addEventListener('mouseout', function () {
        // 鼠标移出, 重新定义定时器 , 也就是重新执行自动轮播函数
        autoLoop();
    })
}