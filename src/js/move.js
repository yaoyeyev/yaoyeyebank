// 将 move函数定义为外部js文件
// 任何html文件,通过外部加载,都可以调用这个文件中的move函数

function move(ele , obj , callback ){

    for(var type in obj){
        // 获取原始位置
        var oldVal = parseInt(window.getComputedStyle(ele)[type]) ;
        // 定时器
        var time = setInterval( function(){
            // 获取需要改变数值,并且计算步长
            var val = ( obj[type] - oldVal )  / 5 ;
            // 取整,如果是正数,向上取整,如果是负数,向下取整
            // 确保,最后每次改变的最小值是1
            val = val > 0 ? Math.ceil(val) : Math.floor(val) ;
            // 每次改变的是计算出来的数值
            oldVal += val;
            // 将改变后的数值,作为属性值,赋值给css样式,实现位置的改变
            ele.style[type] = oldVal + 'px';
            // 判断,如果当前位置,也就是改变后,数值是目标位置
            if( oldVal == obj[type] ){
                // 清除定时器,终止定时器的执行,运动停止
                clearInterval(time);
                // 当清除了定时器,也就是运动终止了
                // 来调用参数3赋值的函数
                callback();
            }
        } , 100)
    }
    console.log(111111111);
}
