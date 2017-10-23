function setDataImages(){
	$('#slider .mainslider img').each(function(){$(this).attr('data-width',$(this).width()).attr('data-height',$(this).height());});
}

function alignImages(){
	var vw = $(window).width();
	var vh = $(window).height();
	$('#slider .mainslider img').each(function(){
		if(!$(this).attr('data-width')){return false;}
		$(this).css({'width':'auto','height':'auto'});
		var w = $(this).attr('data-width');
		var h = $(this).attr('data-height');
		var dw = vw / w;
		var dh = vh / h;
		if(dw>dh){$(this).css({'width':vw+'px','height':'auto','left':'0','top':'-'+(h*dw-vh)/2+'px'});}
		else{$(this).css({'width':'auto','height':vh+'px','left':'-'+(w*dh-vw)/2+'px','top':'0'});}
	});
}

function setDone(selector,timeout){
	$(selector).each(function(){
		setTimeout(function(n){$(n).addClass('done');},$(this).index()*timeout,this);
	});
}

function contactMap(){
	$('#map').each(function(){
		var bottom=0;
		if($('#contacts').length>0){bottom=$('#contacts').outerHeight();}
		$(this).css('bottom',bottom+'px');
	});
}

function resizeActions(){
	alignImages();
	contactMap();
	gal_navHeight();
	gal_checkLastThumb()
};

$(function() {

	$('aside.left menu li a').prepend('<span></span>');

	/* day/night */
	$('.daynight span').on('click',function(){$('#slider').toggleClass('night');});
	
	/* arguments */
	$('.plaha_args .label').on('click',function(){$('.plaha_args').toggleClass('active');});
	
	/* nice scroll */
	$('#mainbar .article_wrap').niceScroll({cursorcolor:"#282c4d",cursoropacitymin:0.5,horizrailenabled:false});
	
});

/* when loaded all images */
$(window).load(function(){

	setDataImages();
	resizeActions();

	/* sliders */
	var mainslider = $('#slider .mainslider').cycle();	
	$('.gallery_nav li a').click(function(){
    var index = $(this).parent('.gallery_nav li').index();
    mainslider.cycle('goto', index);
		$('.gallery_nav li').removeClass('active');
		$(this).parent('.gallery_nav li').addClass('active');
		return false;
	});
	startGallery();

	/* animation */
	setDone('aside.left menu li',100);
	setDone('#mainbar .subpath_nav .subpath_item',200);
	setDone('#mainbar nav.for_articles li',200);
	
});

$(window).resize(function(){
	resizeActions();
});


/* Gallery */
function div(x,y){return (x-x%y)/y;}

function gal_navHeight(){
	if($('.gallery_nav').length==0){return false;}
	if($('.gallery_nav li').length==0){return false;}
	var h=$(window).height()-$('footer').outerHeight()-168;	/* - footer.height, - top-bottom indents (24+24), - vertical paddings (60+60) */
	var h_img=$('.gallery_nav li').eq(0).outerHeight();
	var h_new=(div(h,h_img))*h_img;
	if(h_new==0){h_new=h_img;}
	$('.gallery_nav, .gallery_nav nav').css('height',h_new+'px');
	var t=($(window).height()-$('.gallery_nav').outerHeight()-55)/2;
	$('.gallery_nav').css({'bottom':'auto','top':t+'px'});
	gal_checkThumbNav();
}

function gal_setNewCurrent(o){
	var c=parseInt($('.gallery_nav menu').attr('data-index'));
	c=o.hasClass('thumb_next')?c+1:c-1;
	$('.gallery_nav menu').attr('data-index',c);
	return c;
};

function gal_checkThumbNav(){
	if($('.gallery_nav').length==0){return false;}
	if($('.gallery_nav li').length==0){return false;}
	var prev=$('.gallery_nav .thumb_nav.thumb_prev');
	var next=$('.gallery_nav .thumb_nav.thumb_next');
	var current=parseInt($('.gallery_nav menu').attr('data-index'));
	var li_count=$('.gallery_nav li').length;
	var li_height=$('.gallery_nav li').eq(0).outerHeight();
	var nav_height=$('.gallery_nav nav').outerHeight();
	if(current<1){prev.addClass('disabled');}else{prev.removeClass('disabled');}
	if((li_count-current)*li_height<=nav_height){next.addClass('disabled');}else{next.removeClass('disabled');}
}

function gal_checkLastThumb(){
	if($('.gallery_nav').length==0){return false;}
	if($('.gallery_nav li').length==0){return false;}
	var current=parseInt($('.gallery_nav menu').attr('data-index'));
	var li_count=$('.gallery_nav li').length;
	var li_height=$('.gallery_nav li').eq(0).outerHeight();
	var nav_height=$('.gallery_nav nav').outerHeight();
	while((li_count-current)*li_height<nav_height){current--;if(current<0){current=0;break;}}
	$('.gallery_nav menu').attr('data-index',current).css('top',(-1*current*li_height)+'px');
}

function startGallery(){
	if($('.gallery_nav').length==0){return false;}
	if($('.gallery_nav li').length==0){return false;}
	console.log('gallery_nav found');
	$('.gallery_nav li').eq(0).addClass('active');
	$('.gallery_nav menu').attr('data-index','0');
	gal_checkThumbNav();
	$('.gallery_nav .thumb_nav').on('click',function(){
		if($(this).hasClass('disabled')){return false;}
		var li_height=$('.gallery_nav li').eq(0).outerHeight();
		var current=gal_setNewCurrent($(this));
		gal_checkThumbNav();
		$('.gallery_nav menu').css('top',(-1*current*li_height)+'px');
		return false;
	});
}










