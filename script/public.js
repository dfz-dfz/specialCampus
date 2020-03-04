//当有弹窗时禁止滑动页面
var bodyScroll = function(event){
    event.preventDefault();
}
var scrollHeight;
// 禁止滑动
var stopScroll = function() {
    document.body.addEventListener('touchmove',bodyScroll,false);
    scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    $('body').css({'position':'fixed',"width":"100%",'top':'-'+scrollHeight+'px'});
}
//恢复滑动
var starScroll = function() {
    document.body.removeEventListener('touchmove',bodyScroll,false);
    $("body").css({"position":"initial","height":"auto",'top':'auto'});
    $(window).scrollTop(scrollHeight)
}

//解决iOS端软键盘弹出后input输入框焦点实际触发位置偏上
var inputHandle = function() {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isIOS){
        let inputs =  document.getElementsByTagName("input");
        for(let i = 0;i<inputs.length;i++){
            let item = inputs[i];
            item.addEventListener('blur',function(){
                setTimeout(function(){
                    window.scrollTo(0, 0)
                },100)
            })
        }
    }else{
        return;
    }
}

/**选择按钮弹窗
 * 
 * text : 提示的文字
 * cancle : 左边按钮的文字
 * sure : 右边按钮的文字
 * cancleFunction ：点击左边按钮的事件，可以为空，当为空时默认关闭弹窗
 * sureFunction : 点击右边按钮的事件
 * 
 */
var choicePopup = function(text,cancle,sure,cancleFunction,sureFunction) {
    var html = '';
        html += '<div class="popup">';
            html += '<div class="masked"></div>';
            html += '<div class="content">';
                html += '<p class="text">'+text+'</p>';
                html += '<div class="btn_box">';
                    html += '<span class="cancle">'+cancle+'</span>';
                    html += '<span class="sure">'+sure+'</span>';
                html += '</div>';
            html += '</div>';
        html += '</div>';
        $html = $(html);

    if(cancleFunction == '') {
        $('body').on('click','.popup .btn_box .cancle',function() {
            $html.remove();    
        });
    }else {
        $('body').on('click','.popup .btn_box .cancle',cancleFunction);
    }
    $('body').on('click','.popup .btn_box .sure',sureFunction);
    $("body").append($html);
    $('body').on('click','.popup .masked',function() {
        $html.remove();
    })
}

/*
 * 自定义提示框弹窗
 *
 * content: 提示的文字内容
 */
var tipsPopup = function(content){
    var htm = "<div class='tips_popup'><div class='masked'><div class='tips'>"+content+"</div></div></div>";
    $htm = $(htm);
    $("body").append($htm);
    setTimeout(function() {
        $htm.remove();
    },2000);
}

// 加入购物车飞入特效
var addCart = function(obj) {
    var url_src = '../images'
    var offset = $("footer .cart").offset();
    var flyer = $('<img class="flyer-img" src="'+url_src+'/add.png">'); //抛物体对象
    flyer.fly({   
        start: {   
            left: event.pageX,//抛物体起点横坐标   
            top: event.pageY //抛物体起点纵坐标   
        },   
        end: {   
            left: offset.left + 10,//抛物体终点横坐标   
            top: offset.top + 10, //抛物体终点纵坐标   
        },   
        onEnd: function() {
            $('.flyer-img').remove(); //销毁抛物体   
        }   
    });
}

//获取url查询参数
var getUrlParams = function() {
    var href="",params;
    return function(key,url) {
        if(url) {
            href = url;
            params =null;
        } else if(!url && !href) href = window.location;
        // console.log(href);
        if(!params) {
            params = {};
            var search = href.search.slice(1),
                searchArr = search.split('&');
            for(var i =searchArr.length;i--;) {
                var temp = searchArr[i].split('=');
                params[temp[0]] = temp[1];
            }
        } 
        return key == undefined ? params : params[key];
    }
}();