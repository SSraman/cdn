/*! Custom - Theia Sticky Sidebar | v1.7.0 - https://github.com/WeCodePixels/theia-sticky-sidebar */
!function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){return!0===t.initialized||!(i("body").width()<t.minWidth)&&(function(t,e){t.initialized=!0,0===i("#theia-sticky-sidebar-stylesheet-"+t.namespace).length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));e.each(function(){var e={};if(e.sidebar=i(this),e.options=t||{},e.container=i(e.options.containerSelector),0==e.container.length&&(e.container=e.sidebar.parent()),e.sidebar.parents().css("-webkit-transform","none"),e.sidebar.css({position:e.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),e.stickySidebar=e.sidebar.find(".theiaStickySidebar"),0==e.stickySidebar.length){var a=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;e.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(a)}).remove(),e.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(e.sidebar.children()),e.sidebar.append(e.stickySidebar)}e.marginBottom=parseInt(e.sidebar.css("margin-bottom")),e.paddingTop=parseInt(e.sidebar.css("padding-top")),e.paddingBottom=parseInt(e.sidebar.css("padding-bottom"));var n=e.stickySidebar.offset().top,s=e.stickySidebar.outerHeight();function d(){e.fixedScrollTop=0,e.sidebar.css({"min-height":"1px"}),e.stickySidebar.css({position:"static",width:"",transform:"none"})}e.stickySidebar.css("padding-top",1),e.stickySidebar.css("padding-bottom",1),n-=e.stickySidebar.offset().top,s=e.stickySidebar.outerHeight()-s-n,0==n?(e.stickySidebar.css("padding-top",0),e.stickySidebarPaddingTop=0):e.stickySidebarPaddingTop=1,0==s?(e.stickySidebar.css("padding-bottom",0),e.stickySidebarPaddingBottom=0):e.stickySidebarPaddingBottom=1,e.previousScrollTop=null,e.fixedScrollTop=0,d(),e.onScroll=function(e){if(e.stickySidebar.is(":visible"))if(i("body").width()<e.options.minWidth)d();else{if(e.options.disableOnResponsiveLayouts){var a=e.sidebar.outerWidth("none"==e.sidebar.css("float"));if(a+50>e.container.width())return void d()}var n,s,r=i(document).scrollTop(),c="static";if(r>=e.sidebar.offset().top+(e.paddingTop-e.options.additionalMarginTop)){var p,b=e.paddingTop+t.additionalMarginTop,l=e.paddingBottom+e.marginBottom+t.additionalMarginBottom,f=e.sidebar.offset().top,h=e.sidebar.offset().top+(n=e.container,s=n.height(),n.children().each(function(){s=Math.max(s,i(this).height())}),s),g=0+t.additionalMarginTop,S=e.stickySidebar.outerHeight()+b+l<i(window).height();p=S?g+e.stickySidebar.outerHeight():i(window).height()-e.marginBottom-e.paddingBottom-t.additionalMarginBottom;var u=f-r+e.paddingTop,m=h-r-e.paddingBottom-e.marginBottom,y=e.stickySidebar.offset().top-r,k=e.previousScrollTop-r;"fixed"==e.stickySidebar.css("position")&&"modern"==e.options.sidebarBehavior&&(y+=k),"stick-to-top"==e.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==e.options.sidebarBehavior&&(y=p-e.stickySidebar.outerHeight()),y=k>0?Math.min(y,g):Math.max(y,p-e.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,m-e.stickySidebar.outerHeight());var v=e.container.height()==e.stickySidebar.outerHeight();c=(v||y!=g)&&(v||y!=p-e.stickySidebar.outerHeight())?r+y-e.sidebar.offset().top-e.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==c){var x=i(document).scrollLeft();e.stickySidebar.css({position:"fixed",width:o(e.stickySidebar)+"px",transform:"translateY("+y+"px)",left:e.sidebar.offset().left+parseInt(e.sidebar.css("padding-left"))-x+"px",top:"0px"})}else if("absolute"==c){var T={};"absolute"!=e.stickySidebar.css("position")&&(T.position="absolute",T.transform="translateY("+(r+y-e.sidebar.offset().top-e.stickySidebarPaddingTop-e.stickySidebarPaddingBottom)+"px)",T.top="0px"),T.width=o(e.stickySidebar)+"px",T.left="",e.stickySidebar.css(T)}else"static"==c&&d();"static"!=c&&1==e.options.updateSidebarHeight&&e.sidebar.css({"min-height":e.stickySidebar.outerHeight()+e.stickySidebar.offset().top-e.sidebar.offset().top+e.paddingBottom}),e.previousScrollTop=r}},e.onScroll(e),i(document).on("scroll."+e.options.namespace,function(i){return function(){i.onScroll(i)}}(e)),i(window).on("resize."+e.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(e)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(e.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(e))})}(t,e),!0)}function o(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return void 0===t&&(t=i.width()),t}return(t=i.extend({containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"},t)).additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,function(t,o){e(t,o)||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)),i(window).on("resize."+t.namespace,function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)))}(t,this),this}}(jQuery);

/*! MenuIfy by Templateify | v1.0.0 - https://www.templateify.com */
!function(a){a.fn.menuify=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);

/*! ResizeIfy - LazyIfy on Scroll by Templateify | v1.5.0 - https://www.templateify.com */
!function(o){o.fn.lazyify=function(){return this.each(function(){var t=o(this),a=o(window),n=t.attr("data-image"),e="w"+Math.round(t.width()+t.width()/10)+"-h"+Math.round(t.height()+t.height()/10)+"-p-k-no-nu",r="";n.match("resources.blogblog.com")&&(n=noThumbnail),r=n.match("/s72-c")?n.replace("/s72-c","/"+e):n.match("/w72-h")?n.replace("/w172-h172-p-k-rw-e100-v1-no-nu","/"+e):n.match("=w72-h")?n.replace("=w172-h172-p-k-rw-v1-no-nu","="+e):n,t.is(":hidden")||a.on("load resize scroll",function o(){if(a.scrollTop()+a.height()>=t.offset().top){a.off("load resize scroll",o);var n=new Image;n.onload=function(){t.attr("style","background-image:url("+this.src+")").addClass("lazy-ify")},n.src=r}}).trigger("scroll")})}}(jQuery);

/*! jQuery replaceText | v1.1.0 - http://benalman.com/projects/jquery-replacetext-plugin/ */
!function(e){e.fn.replaceText=function(n,t,i){return this.each(function(){var o,r,l=this.firstChild,u=[];if(l)do{3===l.nodeType&&(r=(o=l.nodeValue).replace(n,t))!==o&&(!i&&/</.test(r)?(e(l).before(r),u.push(l)):l.nodeValue=r)}while(l=l.nextSibling);u.length&&e(u).remove()})}}(jQuery);
function shortCodeIfy(e,t,a){for(var r=e.split("$"),s=/[^{\}]+(?=})/g,o=0;o<r.length;o++){var i=r[o].split("=");if(i[0].trim()==t)return null!=(a=i[1]).match(s)&&String(a.match(s)).trim()}return!1}function getFeedUrl(e,t,a,r){switch(a){case"recent":r="/feeds/posts/default?alt=json&max-results="+t;break;case"comments":r="list1"==e?"/feeds/comments/default?alt=json&max-results="+t:"/feeds/posts/default/-/"+a+"?alt=json&max-results="+t;break;default:r="/feeds/posts/default/-/"+a+"?alt=json&max-results="+t}return r}function getPostLink(e,t){for(var a=0;a<e[t].link.length;a++)if("alternate"==e[t].link[a].rel){var r=e[t].link[a].href;break}return r}function getPostTitle(e,t,a){return e[t].title.$t?e[t].title.$t:exportify.noTitle}function getFirstImage(e,t){var a=$("<div>").html(e).find("img:first").attr("src"),r=a.lastIndexOf("/")||0,s=a.lastIndexOf("/",r-1)||0,o=a.substring(0,s),i=a.substring(s,r),n=a.substring(r);return(i.match(/\/s[0-9]+/g)||i.match(/\/w[0-9]+/g)||"/d"==i)&&(i="/w72-h72-p-k-rw-v1-e100-no-nu"),o+i+n}function getPostImage(e,t,a,r){var s=e[t].content.$t;return a=e[t].media$thumbnail?e[t].media$thumbnail.url:"https://resources.blogblog.com/img/blank.gif",s.indexOf(s.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))>-1?s.indexOf("<img")>-1?s.indexOf(s.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g))<s.indexOf("<img")?a.replace("img.youtube.com","i.ytimg.com").replace("/default.","/maxresdefault."):getFirstImage(s):a.replace("img.youtube.com","i.ytimg.com").replace("/default.","/maxresdefault."):s.indexOf("<img")>-1?getFirstImage(s):"https://resources.blogblog.com/img/blank.gif"}function getPostImageType(e,t){return e.match("i.ytimg.com")?"is-video":"is-image"}function getPostTag(e,t,a){return e[t].category?'<span class="entry-category">'+e[t].category[0].term+"</span>":""}function getAjax(e,t,a,r){switch(t){case"featured":case"related":0==r&&(r="geterror404");var s=getFeedUrl(t,a,r);$.ajax({url:s,type:"GET",dataType:"json",cache:!0,beforeSend:function(a){switch(t){case"featured":case"related":e.html('<div class="loader"></div>').parent().addClass("show-ify")}},success:function(a){var r="";switch(t){case"featured":r='<div class="featured-items">';break;case"related":r='<div class="related-posts">'}var s=a.feed.entry;if(null!=s)for(var o=0,i=s;o<i.length;o++){var n=getPostLink(i,o),l=getPostTitle(i,o),c=getPostImage(i,o),d=getPostTag(i,o),m=getPostImageType(c,o),f="";switch(t){case"featured":switch(o){case 0:f=f+'<div class="featured-left"><div class="featured-item item-'+o+'"><a title="'+l+'" class="entry-image-wrap '+m+'" href="'+n+'"><span class="entry-thumb" data-image="'+c+'"></span></a><div class="entry-header">'+d+'<h2 class="entry-title"><a title="'+l+'" href="'+n+'">'+l+'</a></h2></div></div></div><div class="featured-right">';break;default:f=f+'<div class="featured-item item-'+o+'"><a title="'+l+'" class="entry-image-wrap '+m+'" href="'+n+'"><span class="entry-thumb" data-image="'+c+'"></span></a><div class="entry-header">'+d+'<h2 class="entry-title"><a title="'+l+'" href="'+n+'">'+l+"</a></h2></div></div>"}break;case"related":f=f+'<div class="related-item post item-'+o+'"><a title="'+l+'" class="entry-image-wrap '+m+'" href="'+n+'"><span class="entry-thumb" data-image="'+c+'"></span></a><div class="entry-header"><h2 class="entry-title"><a href="'+n+'" title="'+l+'">'+l+"</a></h2></div></div>"}r+=f}else switch(t){case"msimple":r='<div class="ul mega-items no-items"><span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span></div>';break;default:r='<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>'}switch(t){case"msimple":r+="</div>",e.append(r).addClass("msimple"),e.find("a:first").attr("href",function(e,t){switch(n){case"recent":t=t.replace(t,"/search");break;default:t=t.replace(t,"/search/label/"+n)}return t});break;default:r+="</div>",e.html(r)}e.find("span.entry-thumb").lazyify()},error:function(){switch(t){case"msimple":e.append('<div class="ul mega-items no-items"><span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span></div>');break;default:e.html('<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>')}}})}}function ajaxFeatured(e,t,a,r,s){if(s.match("getfeatured")){if("featured"==t)return getAjax(e,t,a,r);e.html('<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>').parent().addClass("show-ify")}}function ajaxRelated(e,t,a,r,s){if(s.match("getrelated"))return getAjax(e,t,a,r)}function fixedSidebarIfy(){$("#main-wrapper, #sidebar-wrapper").each(function(){1==fixedSidebar&&$(this).theiaStickySidebar({containerSelector:"#content-wrapper > .container",additionalMarginTop:20,additionalMarginBottom:20})})}function beautiAvatar(e){$(e).attr("src",function(e,t){return(t=(t=t.replace("//resources.blogblog.com/img/blank.gif","//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35","//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("/s35","/s39")})}$("#supermag-free-main-nav").menuify(),$("#supermag-free-main-nav .widget").addClass("show-menu"),$(".show-search").on("click",function(){$("body").addClass("search-active"),$("#main-search-wrap").fadeIn(170).find("input").focus()}),$(".hide-search").on("click",function(){$("body").removeClass("search-active"),$("#main-search-wrap").fadeOut(170).find("input").val("").blur()}),$(".sidebar .social-icons li a").each(function(e){var t=$(this),a=t.attr("href").trim().split("#");e=a[0],null!=a[1]&&t.append('<span class="text">'+a[1]+"</span>"),t.attr("href",e)}),$(".FollowByEmail .widget-content").each(function(e,t){var a=$(this),r=a.data("shortcode");null!=r&&(e=shortCodeIfy(r,"title"),t=shortCodeIfy(r,"text"),0!=e&&a.find(".follow-by-email-title").text(e),0!=t&&a.find(".follow-by-email-text").text(t))}),$(".post-body a").each(function(){var e=$(this),t=e.html(),a=t.toLowerCase(),r=shortCodeIfy(t,"text"),s=shortCodeIfy(t,"icon"),o=shortCodeIfy(t,"color");a.match("getbutton")&&0!=r&&(e.addClass("button btn").text(r),0!=s&&e.addClass(s),0!=o&&e.addClass("colored-button").attr("style","background-color:"+o+";"))}),$(".post-body b").each(function(){var e=$(this),t=e.text().toLowerCase().trim();t.match("{contactform}")&&(e.replaceWith('<div class="contact-form"/>'),$(".contact-form").append($("#ContactForm1"))),t.match("{leftsidebar}")&&e.replaceWith("<style>#main-wrapper,.is-left #main-wrapper{float:right}#sidebar-wrapper,.is-left #sidebar-wrapper{float:left}</style>"),t.match("{rightsidebar}")&&e.replaceWith("<style>#main-wrapper,.is-left #main-wrapper{float:left}#sidebar-wrapper,.is-left #sidebar-wrapper{float:right}</style>"),t.match("{fullwidth}")&&e.replaceWith("<style>.is-single #main-wrapper{width:100%}.is-single #sidebar-wrapper{display:none}</style>")}),$(".post-body blockquote").each(function(){var e=$(this),t=e.text().toLowerCase().trim(),a=e.html();if(t.match("{alertsuccess}")){const t=a.replace("{alertSuccess}","");e.replaceWith('<div class="alert-message alert-success">'+t+"</div>")}if(t.match("{alertinfo}")){const t=a.replace("{alertInfo}","");e.replaceWith('<div class="alert-message alert-info">'+t+"</div>")}if(t.match("{alertwarning}")){const t=a.replace("{alertWarning}","");e.replaceWith('<div class="alert-message alert-warning">'+t+"</div>")}if(t.match("{alerterror}")){const t=a.replace("{alertError}","");e.replaceWith('<div class="alert-message alert-error">'+t+"</div>")}if(t.match("{codebox}")){const t=a.replace("{codeBox}","");e.replaceWith('<pre class="code-box">'+t+"</pre>")}}),$(".supermag-free-share-links .window-ify").on("click",function(){var e=$(this),t=e.data("url"),a=e.data("width"),r=e.data("height"),s=window.screen.width,o=window.screen.height,i=Math.round(s/2-a/2),n=Math.round(o/2-r/2);window.open(t,"_blank","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width="+a+",height="+r+",left="+i+",top="+n).focus()}),$(".supermag-free-share-links").each(function(){var e=$(this);e.find(".show-hid a").on("click",function(){e.toggleClass("show-hidden")})}),$(".about-author .author-text").each(function(){var e=$(this),t=e.find("a");t.each(function(){var e=$(this),t=e.text().trim(),a=e.attr("href");e.replaceWith('<li class="'+t+'"><a href="'+a+'" title="'+t+'" rel="noopener noreferrer" target="_blank"/></li>')}),t.length&&e.parent().append('<ul class="author-links social social-color"></ul>'),e.find("li").appendTo(".author-links")}),$("#featured .HTML .widget-content").each(function(e){var t=$(this),a=$(window),r=t.data("shortcode");null!=r&&(mtc=r.toLowerCase(),e=shortCodeIfy(r,"label"),a.on("scroll",function r(){a.scrollTop()+a.height()>=t.offset().top&&(a.off("scroll",r),ajaxFeatured(t,"featured",4,e,mtc))}).trigger("scroll"))}),$("#supermag-free-related-posts .HTML").each(function(e,t){var a=$(this).data("shortcode");null!=a&&$("#related-wrap").each(function(r,s){var o=$(this),i=$(window),n=o.find(".supermag-free-related-content"),l=(e=shortCodeIfy(a,"title"),t=shortCodeIfy(a,"results"),[e,t]);r=0!=l[1]?l[1]:3,0!=l[0]&&o.find(".related-title .title").text(l[0]),s=o.find(".related-tag").data("label"),i.on("scroll",function e(){i.scrollTop()+i.height()>=n.offset().top&&(i.off("scroll",e),ajaxRelated(n,"related",r,s,"getrelated"))}).trigger("scroll")})}),$(".supermag-free-blog-post-comments").each(function(){var e=$(this),t=shortCodeIfy(e.data("shortcode"),"type"),a=e.find("#top-continue .comment-reply");switch(t){case"blogger":case"disqus":case"facebook":e.addClass("comments-system-blogger").show(),$(".entry-meta .entry-comments-link").addClass("show"),a.addClass("btn"),beautiAvatar(".avatar-image-container img");break;case"hide":e.hide();break;default:e.addClass("comments-system-blogger").show(),$(".entry-meta .entry-comments-link").addClass("show"),a.addClass("btn"),beautiAvatar(".avatar-image-container img")}var r=e.find(".comments .comment-reply"),s=e.find(".comments #top-continue"),o=e.find("#show-comment-form");r.on("click",function(){s.show(),e.addClass("comment-form-visible"),o.remove()}),s.on("click",function(){s.hide()}),o.on("click",function(){e.addClass("comment-form-visible"),o.remove(),fixedSidebarIfy()})}),$(function(){$(".index-post .entry-image-wrap .entry-thumb, .PopularPosts .entry-image-wrap .entry-thumb, .FeaturedPost .entry-image-wrap .entry-thumb,.entry-author .author-avatar,.about-author .author-avatar").lazyify(),$("#supermag-free-mobile-menu").each(function(){var e=$(this),t=$("#supermag-free-main-nav-menu").clone();t.attr("id","main-mobile-nav"),t.find(".mega-items").remove(),t.find(".mega-menu > a").each(function(e,t){var a=$(this),r=a.data("shortcode");null!=r&&(t="recent"==(e=shortCodeIfy(r.trim(),"label"))?"/search":"/search/label/"+e,a.attr("href",t))}),t.appendTo(e),$(".mobile-menu-toggle, .hide-supermag-free-mobile-menu, .overlay").on("click",function(){$("body").toggleClass("nav-active")}),$(".supermag-free-mobile-menu .has-sub").append('<div class="submenu-toggle"/>'),$(".supermag-free-mobile-menu .mega-menu").find(".submenu-toggle").remove(),$(".supermag-free-mobile-menu ul li .submenu-toggle").on("click",function(e){$(this).parent().hasClass("has-sub")&&(e.preventDefault(),$(this).parent().hasClass("show")?$(this).parent().removeClass("show").find("> .m-sub").slideToggle(170):$(this).parent().addClass("show").children(".m-sub").slideToggle(170))})}),$(".mobile-topbar-social").each(function(){var e=$(this),t=$("#topbar-social ul.social").clone();t.find("a").addClass("btn"),t.appendTo(e)}),$(".mobile-topbar-menu").each(function(){var e=$(this);$("#topbar-menu ul.link-list").clone().appendTo(e)}),$(".header-inner").each(function(){var e=$(this);if(1==fixedMenu&&e.length>0){var t=$(document).scrollTop(),a=e.offset().top,r=e.height(),s=a+r+r;$(window).scroll(function(){var r=$(document).scrollTop();r>s?e.addClass("is-fixed"):(r<a||r<=0)&&e.removeClass("is-fixed"),r>t?e.removeClass("show"):e.addClass("show"),t=r})}}),fixedSidebarIfy(),$("#post-body iframe").each(function(){var e=$(this);e.attr("src").match("www.youtube.com")&&e.wrap('<div class="responsive-video-wrap"/>')}),$("p.comment-content").each(function(){var e=$(this);e.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g,'<img src="$1"/>'),e.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g,'<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')}),$("#supermag-free-load-more-link").each(function(){var e=$(this).data("load");e&&$("#supermag-free-load-more-link").show(),$("#supermag-free-load-more-link").on("click",function(t){$("#supermag-free-load-more-link").hide(),$.ajax({url:e,success:function(t){var a=$(t).find(".blog-posts");a.find(".index-post").addClass("post-animated post-fadeInUp"),$(".blog-posts").append(a.html()),(e=$(t).find("#supermag-free-load-more-link").data("load"))?$("#supermag-free-load-more-link").show():($("#supermag-free-load-more-link").hide(),$("#blog-pager .no-more").addClass("show"))},beforeSend:function(){$("#blog-pager .loading").show()},complete:function(){$("#blog-pager .loading").hide(),fixedSidebarIfy(),$(".index-post .entry-image-wrap .entry-thumb").lazyify()}}),t.preventDefault()})}),$("#back-top").each(function(){var e=$(this);$(window).on("scroll",function(){$(this).scrollTop()>=100?e.fadeIn(170):e.fadeOut(170),e.offset().top>=$("#footer-wrapper").offset().top-34?e.addClass("on-footer"):e.removeClass("on-footer")}),e.on("click",function(){$("html, body").animate({scrollTop:0},500)})})});
