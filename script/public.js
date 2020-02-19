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
    $('body').on('click','.popup .btn_box .cancle',sureFunction);
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