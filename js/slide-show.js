$(function(){
    fn(10 , 10);
    //参数1:行 参数2:列
    function fn( numX , numY ){
        var $ul = $('.pic ul');
        var $btn = $('.btn div');
        var ulW = $ul.width(), ulH = $ul.height();
        var $li;
        var liW = ulW / numX, liH = ulH / numY;
        //定义初始 ul为 第二个
        var ulIndex = 1;
        var onOff = true;
        //遍历ul在每个ul中根参数行和列生成li 并且添加到各个ul中
        $ul.each(function(){
            var s = '';
            for ( var i=0;i<numX*numY;i++ )
            {
                s += '<li></li>'
            }
            $(this).append(s);
        });
        //获取ul下的li
        $li = $('.pic ul li');
        //遍历li
        $li.each(function(i){
            //根据行和列确定每个li的位置
            i %= numX * numY;
            var iX = i % numX;
            var iY = parseInt( i/numX );
            //给每个li赋予属性 x y
            this.x = iX;
            this.y = iY;
            //根据x和y确定每个小图片li的位置和背景图片定位
            $(this).css({
                width : liW-2 + 'px',
                height : liH-2 + 'px',
                backgroundPosition : (-liW*iX) + 'px '+ (-liH*iY) +'px',
                left : liW*iX + 'px',
                top : liH*iY + 'px'
            });
        });
        //点击事件
        $btn.click(function(){
            if ( onOff )
            {
                onOff = !onOff;
                var index = $(this).index();
                var $ulLi;
                if ( index )
                {
                    zIndexNext();
                    var sum = numX + numY - 2; //sum是从1开始 我们的li下标是从0开始 所以-2
                    $ulLi = $ul.eq(ulIndex).find('li');
                    ulIndex ++;
                    //每过30毫秒
                    var timer = setInterval(function(){
                        $ulLi.each(function(){
                            //遍历所有li 如果他的 他的 x属性(行) + y属性(列) =sum 就执行动画
                            if ( this.x + this.y == sum )
                            {
                                $(this).removeClass('last move').addClass('on move');
                            }
                        });
                        sum --;
                        if ( sum < 0 )
                        {
                            clearInterval( timer );
                            setTimeout(function(){
                                onOff = !onOff;
                                if ( ulIndex == $ul.length - 1 )
                                {
                                    $li.removeClass('on last move');
                                    $ul.removeClass('next now');
                                    $ul.eq(1).addClass('next');
                                    ulIndex = 1;
                                }
                            },50);
                        };
                    },50);
                }
                else
                {
                    zIndexLast();
                    ulIndex --;
                    $ulLi = $ul.eq(ulIndex).find('li');
                    $ulLi.removeClass('move').addClass('on');
                    var sum = 0;
                    var timer = setInterval(function(){
                        $ulLi.each(function(){
                            if ( this.x + this.y == sum )
                            {
                                $(this).addClass('last move');
                            }
                        });
                        sum ++;
                        if ( sum > numX + numY - 2 )
                        {
                            clearInterval(timer);
                            setTimeout(function(){
                                onOff = !onOff;
                                if ( ulIndex == 0 )
                                {
                                    $li.removeClass('on last');
                                    $ul.removeClass('next now');
                                    $ul.eq($ul.length-2).addClass('next');
                                    ulIndex = $ul.length-2;
                                };
                            },50);
                        };
                    },50);
                };
            };
        });
        //左点击函数
        function zIndexNext(){
            var i = ulIndex + 1;
            $ul.eq(ulIndex).addClass('now').siblings().removeClass('now');
            $ul.eq(i).addClass('next').siblings().removeClass('next');
        }
        //右点击函数
        function zIndexLast(){
            var i = ulIndex - 1;
            $ul.eq(ulIndex).addClass('next').siblings().removeClass('next');
            $ul.eq(i).addClass('now').siblings().removeClass('now');
        }
    }
});