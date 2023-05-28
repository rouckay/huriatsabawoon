/**
 * @package Zo2Framework for Joomla! 2.5
 * @author http://www.ZooTemplate.com
 * @copyright(C) 2010- ZooTemplate.com
 * @license Javascript files are GNU/GPL
**/

if(typeof ($ZO2) != 'function') {
	var $ZO2 = jQuery.noConflict();
}

/* Mega Menu Block */
var ZTMenu = function(smartBoxSuffix, smartBoxClose, seffect, sduration, heffect, hduration, direction)
{	
	var smartBoxes = $ZO2("[id$=" + smartBoxSuffix + "]");
	var closeElem  = $ZO2("." + smartBoxClose);
	var lefOffset  = 0;
	
	$ZO2.each(smartBoxes, function(i, item)
	{
		var currentBox = $ZO2(item).attr("id");
		currentBox = currentBox.replace("" + smartBoxSuffix + "", "");
		
		$ZO2(item).children().css("display", "none");
		$ZO2(item).css({"display":"none", "position":"absolute", "z-index":"999"});
		
		$ZO2("#" + currentBox).mouseenter(function() { /* Mouse Enter */
			$ZO2.each(smartBoxes, function(i, value) {
				$ZO2(value).css({"display":"none", "overflow":"hidden"});
				$ZO2(value).children().css({"display":"none", "overflow":"hidden"});
			});
			
			/* Clear Queue */
			$ZO2(item).children().clearQueue();
			$ZO2(item).children().stop();
			$ZO2(item).css("display", "block");
			
			/* Reposition Menu */
			var WindowX  = window.getWidth();
			var boxX 	 = $ZO2(item).children().width();
			var boxY 	 = $ZO2(item).children().height();
			var inputPOS = $ZO2("#" + currentBox).position();
			var inputX 	 = $ZO2("#" + currentBox).width();
			var inputY 	 = $ZO2("#" + currentBox).height();

			/* Check direction */
			if(direction == 'ltr')
			{
				if($ZO2(item).attr("id").split("_")[2] == "sub0") {

					$ZO2(item).css("top", inputPOS.top + inputY);

                    var x1 = ((WindowX) - ($ZO2(item).parent().offset().left+boxX));
                    var x2 = (($ZO2(item).parent().offset().left + $ZO2(item).parent().width()) - boxX);
                    if (x1<0 && x2>0) {
                        //console.log();
                        //$ZO2(item).css("right", $ZO2("#menusys_mega").width()-$ZO2(item).parent().position().left-$ZO2(item).parent().width());
                    } else if (x2>0 && x1<0) {
                        $ZO2(item).css("left", $ZO2(item).parent().position().left);
                    }

                    var HeaderX  = $ZO2('#zt-header-inner').width();
					// Menu Turn Left
					if((inputPOS.left > boxX) && (WindowX - boxX < inputPOS.left)) {
						$ZO2(item).css("right", HeaderX-$ZO2(item).parent().position().left-$ZO2(item).parent().width());
					}
					// Menu Center
					else if((inputPOS.left < boxX) && (WindowX - inputPOS.left < boxX)) {
						$ZO2(item).css("left", (WindowX - boxX)/2);
					}

				}
				else {
					if(WindowX - boxX - inputPOS.left > 0) {
						$ZO2(item).css("left", inputX + inputPOS.left);
					}
					else if(inputPOS.left > boxX) {
						$ZO2(item).css("left", -inputX);
					}
					else {
						$ZO2(item).css("left", WindowX - boxX);
					}
				}
			}
			else
			{
				if($ZO2(item).attr('id').split("_")[2] == 'sub0') {
					$ZO2(item).css('top', inputPOS.top + inputY);

					/* Menu Turn Right */
					if((boxX > inputPOS.left + inputX) && (WindowX - inputPOS.left > boxX)) {
						$ZO2(item).css('left', inputPOS.left);
					}
					/* Menu Center */
					else if((boxX > inputPOS.left + inputX) && (WindowX - inputPOS.left < boxX)) {
						$ZO2(item).css("left", (WindowX - boxX)/2);
					}
				}
				else {
					if(WindowX - boxX - inputPOS.left > 0) {
						$ZO2(item).css('right', inputX + lefOffset);
					}
					else if(inputPOS.left > boxX) {
						$ZO2(item).css('right', -inputX);
					}
					else {
						$ZO2(item).css('right', WindowX - boxX);
					}
				}
			}
			
			/* Run Effect */
			switch(seffect) {
				case "slideDown":
					$ZO2(item).children().slideDown(sduration, function() {
						$ZO2(item).parent("li").addClass("arrow-top");
						$ZO2(item).css({"overflow":""});
					});
				break;
				case "show":
				default:
					$ZO2(item).children().show(sduration, function() {
						$ZO2(item).parent("li").addClass("arrow-top");
						$ZO2(item).css({"overflow":""});
					});
				break;
			}
		})
		.mouseleave(function() { /* Mouse Leave */
			
			$ZO2(item).css({"overflow":"hidden"});
			$ZO2(item).children().css({"overflow":"hidden"});
			
			$ZO2(item).children().clearQueue();
			$ZO2(item).children().stop();
			
			/* Remove class arrow-top */
			$ZO2(item).parent("li").delay(350).removeClass("arrow-top");
			
			/* Run Effect */
			switch(seffect) {
				case "slideUp":
					if ($ZO2(item).parent().parent().attr('id')=='menusys_mega') {
						$ZO2(item).children().delay(350).slideUp(hduration, function() {
							$ZO2(item).css({"display":"none", "overflow":""});
						});
					} else {
						$ZO2(item).children().delay(0).slideUp(hduration-hduration/2, function() {
							$ZO2(item).css({"display":"none", "overflow":""});
						});
					}
				break;
				case "hide":
				default:
					if ($ZO2(item).parent().parent().attr('id')=='menusys_mega') {
						$ZO2(item).children().delay(350).hide(hduration, function() {
							$ZO2(item).css({"display":"none", "overflow":""});
						});
					} else {
						$ZO2(item).children().delay(0).hide(hduration-hduration/2, function() {
							$ZO2(item).css({"display":"none", "overflow":""});
						});
					}
				break;
			}
		});
	});
};



/* Fancy Block */
(function($ZO2) {
$ZO2.fn.ZO2Fancy = function(o) {
	o = $ZO2.extend({ fx: "linear", speed: 500, click: function(){} }, o || {});
	
	return this.each(function() {
		var me = $ZO2(this), noop = function(){},
			$ZO2back = $ZO2('<li class="fancy"><div class="fancy-center"><div class="fancy-left"></div><div class="fancy-right"></div></div></li>').appendTo(me),
			$ZO2li   = $ZO2("li.item", this), curr = $ZO2("li.active", this)[0] || $ZO2($ZO2li[0]).addClass("active")[0];		
		
		$ZO2li.not(".fancy").hover(function() {
			move(this, 0);
		}, noop);
	
		$ZO2(this).hover(noop, function() {
			move(curr, 350);
		});        
	
		setCurr(curr);
	
		function setCurr(el) {
			$ZO2back.css({ "left": el.offsetLeft + "px", "width": el.offsetWidth + "px" });
			curr = el;
		};
	
		function move(el, dl) {
			$ZO2back.animate().stop();
			
			$ZO2back.delay(dl).animate({
				width: el.offsetWidth,
				left: el.offsetLeft
			}, o.speed);
		};
	
	});
};
})(jQuery);



/* ZO2 Popup Block */
(function($) {
    var ZO2Popup = function(element, options) {
		
		var settings = $.extend({}, $.fn.Zo2Popup.defaults, options);
		
		if(!$(element)) return;
		if(!$(settings.layout)) return;
		
		$(element).click(function(e) { e.stopPropagation(); toggle(settings); });
		$(document).click(function(e) { hide(settings); });
		$('#' + settings.layout).click(function(e) {e.stopPropagation();});
		
		var kids = $('#' + settings.layout).children();
		kids.each(function() {
			var child = $(this);
			if(child.is('div')) {
				child.click(function(e) {
					var old = $('#' + settings.key).attr('class');
					var arr = old.split(' ');
					
					$.each(arr, function(index) {
						var i = arr[index].indexOf('pattern');
   						if(i === 0) old = arr[index];
					});
					
					var nclass = $(this).attr('class').replace('lady_item ', '');
					
					$('#' + settings.key).removeClass(old);
					$('#' + settings.key).addClass(nclass);
					
					$(element).removeClass(old);
					$(element).addClass(nclass);
					
					$.cookies.set(settings.prefix + 'image_' + settings.key, nclass);
				});
			}
		});				
		
		var toggle = function(settings) {
			if(settings.visible) hide(settings);
			else 				 show(settings);
		};
		
		var hide = function(settings) {
			$('#' + settings.layout).css({'z-index': 0, 'position': 'relative'});
			$('#' + settings.layout).hide(settings.duration);
			settings.visible = false;
		};
		
		var show = function(settings) {
			$('#' + settings.layout).css({'z-index': 9999, 'position': 'relative'});
			$('#' + settings.layout).show(settings.duration);
			settings.visible = true;
		};
	};
	
	$.fn.Zo2Popup = function(options) {
		var Zo2Popup = new ZO2Popup(this, options);
	};
	
	$.fn.Zo2Popup.defaults = {
		layout: '',
		key: '',
		prefix: '',
		duration: 'normal',
		visible: false
	};
	
	$.fn._reverse = [].reverse;
	
})(jQuery);



/* ZO2 Overlay Block */
(function($) {
    var ZO2Overlay = function(element, options) {
		
		var settings = $.extend({}, $.fn.Zo2Overlay.defaults, options);
			
		if(!$(element)) return;
		if(!$(settings.layout)) return;
		if(!$(settings.xclose)) return;
		
		$(element).click(function(e) 		  { e.stopPropagation(); toggle(settings); });
		$('#' + settings.xclose).click(function(e)  { e.stopPropagation(); toggle(settings); });
		$(document).click(function(e) { hide(settings); });
		$('#' + settings.layout).click(function(e) {e.stopPropagation();});
		
		$('body').append($('<div id="' + element.attr('id') + '_overlay" class="zo2_overlay"></div>').css({
			'width': $(window).width() + 'px',
			'height': $(window).height() + 'px'
		}));
		
		settings.element = element;
		settings.layout	 = settings.layout;
		settings.xclose  = settings.xclose;
		settings.overlay = element.attr('id') + '_overlay';
		
		var toggle = function(settings) {
			if(settings.visible) hide(settings);
			else 				 show(settings);
		};
		
		var hide = function(settings) {
			$('#' + settings.layout).css({'z-index': 0, 'position': 'relative'});
			$('#' + settings.layout).hide(settings.duration);
			$('#' + settings.overlay).css('display', 'none');
			settings.visible = false;
		};
		
		var show = function(settings) {
			$('#' + settings.layout).css({'z-index': 9999, 'position': 'relative'});
			$('#' + settings.overlay).css({'display': 'block'});
			$('#' + settings.layout).css({'display': 'block'});
			$('#' + settings.layout).animate({'opacity': '1'}, settings.duration);
			$('#' + settings.overlay).animate({'opacity': '0.5'}, settings.duration);
			settings.visible = true;
		};
	};
	
	$.fn.Zo2Overlay = function(options) {
		var Zo2Overlay = new ZO2Overlay(this, options);
	};
	
	$.fn.Zo2Overlay.defaults = {
		layout: '',
		xclose: '',
		duration: 'normal',
		visible: false
	};
	
	$.fn._reverse = [].reverse;
	
})(jQuery);



/* Color Picker */
(function($){

  var $o, $i, i, $b,
      div = '<div>',
      img = '<img>',
      span = '<span>',
      $document = $(document),
      $mColorPicker = $(div),
      $mColorPickerBg = $(div),
      $mColorPickerTest = $(div),
      $mColorPickerInput = $('<input>'),
      rRGB = /^rgb[a]?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+\.\d+)*)?\)/,
      rHEX = /([a-f0-9])([a-f0-9])([a-f0-9])/,
      rHEX3 = /#[a-f0-9]{3}/,
      rHEX6 = /#[a-f0-9]{6}/;

  $.fn.mColorPicker = function(options) {

    var swatches = $.fn.mColorPicker.getCookie('swatches');

    $o = $.extend($.fn.mColorPicker.defaults, options);
    $.fn.mColorPicker.defaults.swatches.concat($o.swatches).slice(-10);

    if ($i.enhancedSwatches && swatches) $o.swatches = swatches.split('||').concat($o.swatches).slice(0, 10) || $o.swatches;

    if (!$("div#mColorPicker").length) $.fn.mColorPicker.drawPicker();
    if (!$('#css_disabled_color_picker').length) $('head').prepend('<meta data-remove-me="true"/><style id="css_disabled_color_picker" type="text/css">.mColorPicker[disabled] + span, .mColorPicker[disabled="disabled"] + span, .mColorPicker[disabled="true"] + span {filter:alpha(opacity=50);-moz-opacity:0.5;-webkit-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;cursor:default;}</style>');

    $('meta[data-remove-me=true]').remove();

    this.each($.fn.mColorPicker.drawPickerTriggers);

    return this;
  };

  $.fn.mColorPicker.init = {
    replace: '[type=color]',
    index: 0,
    enhancedSwatches: true,
    allowTransparency: false,
    slogan: 'Meta100 - Designing Fun',
    showLogo: false
  };

  $.fn.mColorPicker.defaults = {
    currentId: false,
    currentInput: false,
    currentColor: false,
    changeColor: false,
    color: false,
    imageFolder: '/media/com_zo2framework/images/mpicker/',
    swatches: [
      "#ffffff",
      "#ffff00",
      "#00ff00",
      "#00ffff",
      "#0000ff",
      "#ff00ff",
      "#ff0000",
      "#4c2b11",
      "#3b3b3b",
      "#000000"
    ]
  };

  $.fn.mColorPicker.start = function() {

    $('input[data-mcolorpicker!="true"]').filter(function() {
  
      return ($i.replace == '[type=color]')? this.getAttribute("type") == 'color': $(this).is($i.replace);
    }).mColorPicker();
  };

  $.fn.mColorPicker.events = function() {

    $("#mColorPickerBg").live('click', $.fn.mColorPicker.closePicker);

    $('.mColorPicker').live('keyup', function () {

      try {
  
        $(this).css({
          'background-color': $(this).val()
        }).css({
          'color': $.fn.mColorPicker.textColor($(this).css('background-color'))
        }).trigger('change');
      } catch (r) {}
    });

    $('.mColorPickerTrigger').live('click', $.fn.mColorPicker.colorShow);
	
    $('.mColor, .mPastColor').live('mousemove', function(e) {

      if (!$o.changeColor) return false;
  
      var $t = $(this),
          offset = $t.offset(),
          $e = $o.currentInput,
          hex = $e.attr('data-hex') || $e.attr('hex');

      $o.color = $t.css("background-color");

      if ($t.hasClass('mPastColor')) $o.color = $.fn.mColorPicker.setColor($o.color, hex);
      else if ($t.hasClass('mColorTransparent')) $o.color = 'transparent';
      else if (!$t.hasClass('mPastColor')) $o.color = $.fn.mColorPicker.whichColor(e.pageX - offset.left, e.pageY - offset.top, hex);

      $o.currentInput.mSetInputColor($o.color);
    }).live('click', $.fn.mColorPicker.colorPicked);
  
    $('#mColorPickerInput').live('keyup', function (e) {
  
      try {
  
        $o.color = $(this).val();
        $o.currentInput.mSetInputColor($o.color);
    
        if (e.which == 13) $.fn.mColorPicker.colorPicked();
      } catch (r) {}

    }).live('blur', function () {
  
      $o.currentInput.mSetInputColor($o.color);
    });
  
    $('#mColorPickerWrapper').live('mouseleave', function () {
  
      if (!$o.changeColor) return false;

      var $e = $o.currentInput; 

      $o.currentInput.mSetInputColor($.fn.mColorPicker.setColor($o.currentColor, ($e.attr('data-hex') || $e.attr('hex'))));
    });
  };

  $.fn.mColorPicker.drawPickerTriggers = function () {

    var $t = $(this),
        id = $t.attr('id') || 'color_' + $i.index++,
        hidden = $t.attr('text') == 'hidden' || $t.attr('data-text') == 'hidden'? true: false,
        color = $.fn.mColorPicker.setColor($t.val(), ($t.attr('data-hex') || $t.attr('hex'))),
        width = $t.width(),
        height = $t.height(),
        flt = $t.css('float'),
        $c = $(span),
        $trigger = $(span),
        colorPicker = '',
        $e;

    $c.attr({
      'id': 'color_work_area',
      'class': 'mColorPickerInput'
    }).appendTo($b)

    $trigger.attr({
      'id': 'mcp_' + id,
      'class': 'mColorPickerTrigger'
    }).css({
      'display': 'inline-block',
      'cursor': 'pointer'
    }).insertAfter($t)
    
    $(img).attr({
      'src': $o.imageFolder + 'color.png'
    }).css({
      'border': 0,
      'margin': '0 0 0 3px',
      'vertical-align': 'text-bottom'
    }).appendTo($trigger);

    $c.append($t);
    colorPicker = $c.html().replace(/type=[^a-z ]*color[^a-z //>]*/gi, 'type="' + (hidden? 'hidden': 'text') + '"');
    $c.html('').remove();
    $e = $(colorPicker).attr('id', id).addClass('mColorPicker').val(color).insertBefore($trigger);

    if (hidden) $trigger.css({
      'border': '1px solid black',
      'float': flt,
      'width': width,
      'height': height
    }).addClass($e.attr('class')).html('&nbsp;');

    $e.mSetInputColor(color);

    return $e;
  };

  $.fn.mColorPicker.drawPicker = function () {
  
    var $s = $(div),
        $l = $('<a>'),
        $f = $(div),
        $w = $(div);

    $mColorPickerBg.attr({
      'id': 'mColorPickerBg'
    }).css({
      'display': 'none',
      'background':'black',
      'opacity': .01,
      'position':'absolute',
      'top':0,
      'right':0,
      'bottom':0,
      'left':0
    }).appendTo($b);

    $mColorPicker.attr({
      'id': 'mColorPicker',
      'data-mcolorpicker': true
    }).css({
      'position':'absolute',
      'border':'1px solid #ccc',
      'color':'#fff',
      'width':'194px',
      'height':'184px',
      'font-size':'12px',
      'font-family':'times',
      'display': 'none',
	  'z-index':9999
    }).appendTo($b);

    $mColorPickerTest.attr({
      'id': 'mColorPickerTest'
    }).css({
      'display': 'none'
    }).appendTo($b);

    $w.attr({
      'id': 'mColorPickerWrapper'
    }).css({
      'position':'relative',
      'border':'solid 1px gray'
    }).appendTo($mColorPicker);

    $(div).attr({
      'id': 'mColorPickerImg',
      'class': 'mColor'
    }).css({
      'height': '136px',
      'width': '192px',
      'border': 0,
      'cursor': 'crosshair',
      'background-image': 'url(' + $o.imageFolder + 'picker.png)'
    }).appendTo($w);

    $s.attr({
      'id': 'mColorPickerSwatches'
    }).css({
      'border-right':'1px solid #000'
    }).appendTo($w);

    $(div).addClass(
      'mClear'
    ).css({
      'clear': 'both'
    }).appendTo($s);

    for (i = 9; i > -1; i--) {

      $(div).attr({
        'id': 'cell' + i,
        'class': "mPastColor" + ((i > 0)? ' mNoLeftBorder': '')
      }).css({
        'background-color': $o.swatches[i].toLowerCase(),
        'height':'18px',
        'width':'18px',
        'border':'1px solid #000',
        'float':'left'
      }).html(
        '&nbsp;'
      ).prependTo($s);
    }

    $f.attr({
      'id': 'mColorPickerFooter'
    }).css({
      'background-image': 'url(' + $o.imageFolder + 'grid.gif)',
      'position': 'relative',
      'height': '26px'
    }).appendTo($w);

    $mColorPickerInput.attr({
      'id': 'mColorPickerInput',
      'type': 'text'
    }).css({
      'border': 'solid 1px gray',
      'font-size': '10pt',
      'margin': '3px',
      'width': '80px'
    }).appendTo($f);

    if ($i.allowTransparency) $(span).attr({
      'id': 'mColorPickerTransparent',
      'class': 'mColor mColorTransparent'
    }).css({
      'font-size': '16px',
      'color': '#000',
      'padding-right': '30px',
      'padding-top': '3px',
      'cursor': 'pointer',
      'overflow': 'hidden',
      'float': 'right'
    }).text(
      'transparent'
    ).appendTo($f);

    if ($i.showLogo) $l.attr({
      'href': 'http://meta100.com/',
      'title': $i.slogan,
      'alt': $i.slogan,
      'target': '_blank'
    }).css({
      'float': 'right'
    }).appendTo($f);
    
    $(img).attr({
      'src': $o.imageFolder + 'meta100.png',
      'title': $i.slogan,
      'alt': $i.slogan
    }).css({
      'border': 0,
      'border-left': '1px solid #aaa',
      'right': 0,
      'position': 'absolute'
    }).appendTo($l);

    $('.mNoLeftBorder').css({
      'border-left':0
    });
  };

  $.fn.mColorPicker.closePicker = function () {

    $mColorPickerBg.hide();
    $mColorPicker.fadeOut()
  };

  $.fn.mColorPicker.colorShow = function () {

    var $t = $(this),
        id = $t.attr('id').replace('mcp_', ''),
        pos = $t.offset(),
        $i = $("#" + id),
        pickerTop = pos.top + $t.outerHeight(),
        pickerLeft = pos.left;

    if ($i.attr('disabled')) return false;

    $o.currentColor = $i.css('background-color')
    $o.changeColor = true;
    $o.currentInput = $i;
    $o.currentId = id;

    // KEEP COLOR PICKER IN VIEWPORT
    if (pickerTop + $mColorPicker.height() > $document.height()) pickerTop = pos.top - $mColorPicker.height();
    if (pickerLeft + $mColorPicker.width() > $document.width()) pickerLeft = pos.left - $mColorPicker.width() + $t.outerWidth();
  
    $mColorPicker.css({
      'top':(pickerTop) + "px",
      'left':(pickerLeft) + "px"
    }).fadeIn("fast");
  
    $mColorPickerBg.show();
  
    if ($('#' + id).attr('data-text')) $o.color = $t.css('background-color');
    else $o.color = $i.css('background-color');

    $o.color = $.fn.mColorPicker.setColor($o.color, $i.attr('data-hex') || $i.attr('hex'));

    $mColorPickerInput.val($o.color);
  };

  $.fn.mColorPicker.setInputColor = function (id, color) {

    $('#' + id).mSetInputColor(color);
  };

  $.fn.mSetInputColor = function (color) {
  
    var $t = $(this),
        css = {
          'background-color': color,
          'background-image': (color == 'transparent')? "url('" + $o.imageFolder + "grid.gif')": '',
          'color': $.fn.mColorPicker.textColor(color)
        };
  
    if ($t.attr('data-text') || $t.attr('text')) $t.next().css(css);

    $t.val(color).css(css).trigger('change');

    $mColorPickerInput.val(color);
  };

  $.fn.mColorPicker.textColor = function (val) {

    val = $.fn.mColorPicker.RGBtoHex(val);

    if (typeof val == 'undefined' || val == 'transparent') return "black";

    return (parseInt(val.substr(1, 2), 16) + parseInt(val.substr(3, 2), 16) + parseInt(val.substr(5, 2), 16) < 400)? 'white': 'black';
  };

  $.fn.mColorPicker.setCookie = function (name, value, days) {
  
    var cookie_string = name + "=" + escape(value),
      expires = new Date();
      expires.setDate(expires.getDate() + days);
    cookie_string += "; expires=" + expires.toGMTString();
   
    document.cookie = cookie_string;
  };

  $.fn.mColorPicker.getCookie = function (name) {
  
    var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
  
    if (results) return (unescape(results[2]));
    else return null;
  };

  $.fn.mColorPicker.colorPicked = function () {

    $o.changeColor = false;
  
    $.fn.mColorPicker.closePicker();
    $.fn.mColorPicker.addToSwatch();
  
    $o.currentInput.trigger('colorpicked');
  };

  $.fn.mColorPicker.addToSwatch = function (color) {
  
    if (!$i.enhancedSwatches) return false;

    var swatch = []
        i = 0;
 
    if (typeof color == 'string') $o.color = color;
    if ($o.color != 'transparent') swatch[0] = $.fn.mColorPicker.hexToRGB($o.color);
  
    $('.mPastColor').each(function() {
  
      var $t = $(this);

      $o.color = $.fn.mColorPicker.hexToRGB($t.css('background-color'));

      if ($o.color != swatch[0] && swatch.length < 10) swatch[swatch.length] = $o.color;
  
      $t.css('background-color', swatch[i++])
    });

    if ($i.enhancedSwatches) $.fn.mColorPicker.setCookie('swatches', swatch.join('||'), 365);
  };

  $.fn.mColorPicker.whichColor = function (x, y, hex) {

    var color = [255, 255, 255];

    if (x < 32) {
  
      color[1] = x * 8;
      color[2] = 0;
    } else if (x < 64) {
  
      color[0] = 256 - (x - 32 ) * 8;
      color[2] = 0;
    } else if (x < 96) {
  
      color[0] = 0;
      color[2] = (x - 64) * 8;
    } else if (x < 128) {
  
      color[0] = 0;
      color[1] = 256 - (x - 96) * 8;
    } else if (x < 160) {
  
      color[0] = (x - 128) * 8;
      color[1] = 0;
    } else {
  
      color[1] = 0;
      color[2] = 256 - (x - 160) * 8;
    }

    for (var n = 0; n < 3; n++) {

      if (y < 64) color[n] += (256 - color[n]) * (64 - y) / 64;
      else if (y <= 128) color[n] -= color[n] * (y - 64) / 64;
      else if (y > 128) color[n] = 256 - ( x / 192 * 256 );
  
      color[n] = Math.round(Math.min(color[n], 255));

      if (hex == 'true') color[n] = $.fn.mColorPicker.decToHex(color[n]);
    }

    if (hex == 'true') return "#" + color.join('');
    
    return "rgb(" + color.join(', ') + ')';
  };

  $.fn.mColorPicker.setColor = function (color, hex) {

    if (hex == 'true') return $.fn.mColorPicker.RGBtoHex(color);

    return $.fn.mColorPicker.hexToRGB(color);
  }

  $.fn.mColorPicker.colorTest = function (color) {

    $mColorPickerTest.css('background-color', color);

    return $mColorPickerTest.css('background-color');
  }

  $.fn.mColorPicker.decToHex = function (color) {

    var hex_char = "0123456789ABCDEF";

    color = parseInt(color);

    return String(hex_char.charAt(Math.floor(color / 16))) + String(hex_char.charAt(color - (Math.floor(color / 16) * 16)));
  }

  $.fn.mColorPicker.RGBtoHex = function (color) {

    var decToHex = "#",
        rgb;

    color = color? color.toLowerCase(): false;

    if (!color) return '';
    if (rHEX6.test(color)) return color.substr(0, 7);
    if (rHEX3.test(color)) return color.replace(rHEX, "$1$1$2$2$3$3").substr(0, 7);

    if (rgb = color.match(rRGB)) {

      for (var n = 1; n < 4; n++) decToHex += $.fn.mColorPicker.decToHex(rgb[n]);
    
      return decToHex;
    }

    return $.fn.mColorPicker.colorTest(color);
  };

  $.fn.mColorPicker.hexToRGB = function (color) {

    color = color? color.toLowerCase(): false;

    if (!color) return '';
    if (rRGB.test(color)) return color;

    if (rHEX3.test(color)) {

      if (!rHEX6.test(color)) color = color.replace(rHEX, "$1$1$2$2$3$3");
  
      return 'rgb(' + parseInt(color.substr(1, 2), 16) + ', ' + parseInt(color.substr(3, 2), 16) + ', ' + parseInt(color.substr(5, 2), 16) + ')';
    }

    return $.fn.mColorPicker.colorTest(color);
  };

  $i = $.fn.mColorPicker.init;

  $document.ready(function () {

    $b = $('body');

    $.fn.mColorPicker.events();

    if ($i.replace) {

      if (typeof $.fn.mDOMupdate == "function") {
  
        $('input').mDOMupdate($.fn.mColorPicker.start);
      } else if (typeof $.fn.livequery == "function") {
  
        $('input').livequery($.fn.mColorPicker.start);
      } else {
  
        $.fn.mColorPicker.start();
        $document.live('ajaxSuccess.mColorPicker', $.fn.mColorPicker.start);
      }
    }
	
	$(window).scroll(function() {
		$mColorPickerBg.hide();
    	$mColorPicker.fadeOut();
	});
	
  });
})(jQuery);


/* Accordion Menu */
(function($){
    $.fn.extend({ 
		mtAccordionMenu: function(options) { 
			var defaults = {
				accordion: 'true',
				speed: 300,
				closedSign: 'collapse',
				openedSign: 'expand'
			}; 
			var opts = $.extend(defaults, options); 
			var $this = $(this);
			$this.find("li").each(function() {
				if($(this).find("ul").size() != 0){ 
					$(this).find("a:first").after("<span class='arrow "+ opts.closedSign +"'>"+ opts.closedSign +"</span>"); 
					if($(this).find("a:first").attr('href') == "#"){
						$(this).find("a:first").click(function(){return false;});
					}
				}
			}); 
			$this.find("li.active").each(function() {
				$(this).parents("ul").slideDown(opts.speed);
				$(this).parents("ul").parent("li").find("span.arrow:first").html(opts.openedSign).removeClass(opts.closedSign);
			});
			if(opts.mouseType==0){
				$this.find("li span.arrow").click(function() {
					if($(this).parent().find("ul").size() != 0){
						if(opts.accordion){
							//Do nothing when the list is open
							if(!$(this).parent().find("ul").is(':visible')){
								parents = $(this).parent().parents("ul");
								visible = $this.find("ul:visible");
								visible.each(function(visibleIndex){
									var close = true;
									parents.each(function(parentIndex){
										if(parents[parentIndex] == visible[visibleIndex]){
											close = false;
											return false;
										}
									});
									if(close){
										if($(this).parent().find("ul") != visible[visibleIndex]){
											$(visible[visibleIndex]).slideUp(opts.speed, function(){
												$(this).parent("li").find("span.arrow:first").html(opts.closedSign).addClass(opts.closedSign);
											});
											
										}
									}
								});
							}
						}
						if($(this).parent().find("ul:first").is(":visible")){
							$(this).parent().find("ul:first").slideUp(opts.speed, function(){
								$(this).parent("li").find("span.arrow:first").delay(opts.speed+1000).html(opts.closedSign).addClass(opts.closedSign).removeClass(opts.openedSign);
							});
							
							
						}else{
							$(this).parent().find("ul:first").slideDown(opts.speed, function(){
								$(this).parent("li").find("span.arrow:first").delay(opts.speed+1000).html(opts.openedSign).removeClass(opts.closedSign).addClass(opts.openedSign);
							});
						}
					}
				});
			}
			if(opts.mouseType>0){
				$this.find("li a").mouseenter(function() { 
					if($(this).parent().find("ul").size() != 0){
						if(opts.accordion){ 
							if(!$(this).parent().find("ul").is(':visible')){
								parents = $(this).parent().parents("ul");
								visible = $this.find("ul:visible");
								visible.each(function(visibleIndex){
									var close = true;
									parents.each(function(parentIndex){
										if(parents[parentIndex] == visible[visibleIndex]){
											close = false;
											return false;
										}
									});
									if(close){
										if($(this).parent().find("ul") != visible[visibleIndex]){
											$(visible[visibleIndex]).slideUp(opts.speed, function(){
												$(this).parent("li").find("span.arrow:first").html(opts.closedSign).addClass(opts.closedSign);
											});
											
										}
									}
								});
							}
						}
						if($(this).parent().find("ul:first").is(":visible")){
							$(this).parent().find("ul:first").slideUp(opts.speed, function(){
								$(this).parent("li").find("span.arrow:first").delay(opts.speed+1000).html(opts.closedSign).addClass(opts.closedSign);
							});						
						}else{
							$(this).parent().find("ul:first").slideDown(opts.speed, function(){
								$(this).parent("li").find("span.arrow:first").delay(opts.speed+1000).html(opts.openedSign).removeClass(opts.closedSign);
							});
						}
					}
				});
			}
		}
	});
})(jQuery);



/* Other Script */
$ZO2(document).ready(function() {
	var i = 0;
	$ZO2('#control').click(function() {
		if(i%2 == 0) {
			$ZO2('#zt-userwrap1').show('slow');
			$ZO2('#control').removeClass('bkg-control-down').addClass('bkg-control-up');
		}
		else {
			$ZO2('#zt-userwrap1').hide('slow');
			$ZO2('#control').removeClass('bkg-control-up').addClass('bkg-control-down');
		}
		i++;
	});
});