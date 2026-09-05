/*---- Document Ready function ------------------------------------*/
jQuery(function($) { 

	/*----Defining Main style color for JS ----*/
	//var style_color = $('.style-color-element').css('color');
	var project_opacity = 0.9;
	var projects_border_color = '#FFF';
	var style_color = '#FFF';
	/*----Defining menu object variables----*/
	var menu = {
		main : $('.nav'),
		items : $('.nav li a:not(.nav .sub-menu li a, .nav .children li a )'),
		subtitles : $('.nav li a span'),
		submenu : $('.sub-menu, .nav .children'),
		isopen : false,
		selector : $('.menu-selector'),
		easing : 'easeOutBack',
		anim_time: 500
	}
	
	/*----Defining other variables----*/
	if($('#header').length > 0)
	{
		var destination = $('#header').position().top + $('#header').height() - 65;
	}
	var timeout
	
	/* horizontal menu functionality */
	
	if( $('.nav-horizontal').length > 0 )
	{
		_selector = $('.horizontal-menu-selector');
		_current = $('.nav-horizontal li.current-menu-item').not('.sub-menu .current-menu-item, .nav .children .current-menu-item');
		trace(_current)
		
		$(window).resize(function()
		{

			if( _current.length > 0 )
			{
				_selector.stop(true, false).animate({
					left: _current.position().left,
					width: _current.width(),
				}, 'fast');
			}else{
				_selector.stop(true, false).animate({
					left: $('.nav-horizontal li').eq(0).position().left,
					width: $('.nav-horizontal li').eq(0).width(),
				}, 'fast');
			}

		})

		if( _current.length > 0 )
		{
			_selector.stop(true, false).animate({
				left: _current.position().left,
				width: _current.width(),
			}, 'fast');
		}
			
		trace('found horizontal menu');
		$('.nav-horizontal li a').not('.sub-menu li a, .nav-horizontal .children li a').hover(function()
		{
			_this = $(this);
			_parent = _this.parent('li');
			
			_selector.stop(true, false).animate({
				left: _parent.position().left,
				width: _parent.width(),
			}, 'fast');
			
			$('.sub-menu, .nav-horizontal .children').not( _parent.find('.sub-menu, .nav-horizontal .children') ).fadeOut('fast');
			
			if(_parent.find('ul.sub-menu, .nav-horizontal ul.children').length > 0 )
			{
				
				trace('does have sub-menu');
				_parent.find('ul.sub-menu, .nav-horizontal ul.children').stop(true, true).fadeIn('fast');
			}
			
		}, null);
		
$('.nav-horizontal').hover(null, function()
		{
			trace('mouse is out');
			$('.sub-menu, .nav-horizontal .children').stop(true, true).fadeOut('fast');
			
			if( _current.length > 0 )
			{
				_selector.stop(true, false).animate({
					left: _current.position().left,
					width: _current.width(),
				}, 'fast');
			}else{
				_selector.stop(true, false).animate({
					left: $('.nav-horizontal li:first-child').position().left,
					width: $('.nav-horizontal li:first-child').width(),
				}, 'fast');
			}
		});



		/*  create select menu */
		$('<select class="select-nav"><select />').prependTo('#horizontal-menu-container');

		$(".nav-horizontal a").each(function() 
		{
			var el = $(this),
				_clone = $(this).clone();

			_clone.find('span').remove();

			var text = _clone.text();


			if( el.parent().parent('ul.sub-menu, ul.children').length > 0 )
			{
				$("<option />", 
				{
					"value"   : el.attr("href"),
					"html"    : '&nbsp; &nbsp; &nbsp;' + text,
					"class"   : 'select-sub-menu'
				}).css('color', '#666').appendTo("#horizontal-menu-container select");
			}
			else
			{
				$("<option />", 
				{
					"value"   : el.attr("href"),
					"text"    : text
				}).appendTo("#horizontal-menu-container select");
			}

			if( el.parent('li.current, li.current_page_item').length > 0 )
			{
				$('.select-nav option').attr( 'selected', 'selected' );
				//trace( $('.select-nav option').index() )
			}
		});

		$("#horizontal-menu-container select").change(function() 
		{
			window.location = $(this).find("option:selected").val();
		});
	}
	
	/*----Initializing vertical menu functionality----*/
	
	menu.init = function()
	{
		var nav = this;
		
		//trace($('.current').not('.sub-menu .current', nav) );

		nav.items.each(function(i){
			$(this).parent('li').data( 'pos', i )
			$(this).parent('li').data( 'pos-top', $(this).parent('li').position().top )
		});
		
		if($('#nav-header-container').length <= 0)
		{
			if( $('.current').not('.sub-menu .current', nav).length > 0 )
			{
				nav.selector.css({
					'top' : $('.current').position().top + nav.main.position().top,
				});
			}else{
				nav.selector.css({
					'top' :nav.items.eq(0).position().top + nav.main.position().top,
				});
				
			}
		}
		else
		{
			$(window).resize(function()
			{

				nav.selector.css({
					'top' : nav.items.eq(0).position().top + nav.main.position().top
				});
				//trace(nav.selector)
				if( $('.current').not('.sub-menu .current', nav).length > 0 )
				{
					nav.selector.css({
						'top' : $('.current').position().top + nav.main.position().top
						
					})
				}else{
					nav.selector.css({
						'top' : nav.items.eq(0).position().top + nav.main.position().top
						
					})
				}

			});

			setTimeout(function()
			{
				nav.selector.css({
					'top' : nav.items.eq(0).position().top + nav.main.position().top
				});
				//trace(nav.selector)
				if( $('.current').not('.sub-menu .current', nav).length > 0 )
				{
					nav.selector.stop(true, false).animate({
						'top' : $('.current').position().top + nav.main.position().top
						
					}, nav.anim_time, nav.easing)
				}else{
					nav.selector.stop(true, false).animate({
						'top' : nav.items.eq(0).position().top + nav.main.position().top
						
					}, nav.anim_time, nav.easing)
				}
			}, 100);
		}
		/*----Menu hover handler----*/
		
		nav.items.hover(function()
		{
			nav.selector.stop(true, false).animate({
				'top' : $(this).parent('li').position().top + nav.main.position().top
				
			}, nav.anim_time, nav.easing)
			
		});

		nav.main.mouseover(function()
		{
			clearTimeout(is_opening_timeout);
		});
		
		var nav_is_open = false;
		var nav_is_opening = false;
		var is_opening_timeout;

		nav.items.click(function(event)
		{
			if(!nav_is_open)
			{
				//trace($(this));
				var the_li = $(this).parent('li');
				
				//trace(nav.isopen)
				/*$('.nav li a').each(function(){
					$(this).animate({'margin-right': 0}, nav.anim_time)
				});
				if( the_li.children('.sub-menu').length > 0 && !nav.isopen)
				{
					the_li.find('a').animate({'margin-right': -10}, nav.anim_time)
				}*/
				
				/*----Submenu opening handler----*/
				if( the_li.children('.sub-menu').length > 0 || the_li.children('.nav .children').length > 0 )
				{
					event.preventDefault();
				}
				//
				
				function openSubMenu()
				{
					
					if( the_li.children('.sub-menu').length > 0 || the_li.children('.nav .children').length > 0 )
					{
						
						var current_parent = the_li;
						var this_submenu = the_li.children('.sub-menu, .nav .children');
						nav_is_open = true;
						if(!nav.isopen)
						{
							nav.items.parent('li').each(function(i)
							{
								if( i != current_parent.data('pos') )
								{
									$(this).stop(true,true).delay(i * 50).animate({
										'left': -450
									}, nav.anim_time )
								}
								else
								{
									$(this).stop(true,true).delay(i * 50).animate({
										'top': 0 - $(this).position().top
									}, nav.anim_time, function()
									{
										nav.selector.stop(true, false).animate({
											'top' : current_parent.position().top + nav.main.position().top
										}, nav.anim_time, nav.easing);
									})
								}
							});
							nav.isopen = true;
							nav_is_opening = true;
							this_submenu.delay(500).fadeIn(nav.anim_time, function()
							{
								//$('.nav li a').animate({'margin-right': 0}, nav.anim_time)
								nav_is_opening = false;
							});

							var sub_li_count = the_li.find('.sub-menu li, .nav .children li');
							trace(sub_li_count.length)
							if( sub_li_count.length > 4 )
							{

								menu.main.stop(true, false).animate(
								{
									'padding-bottom' : 20 * (sub_li_count.length - 4)

								}, 'fast');

							}

						}else{
							
						}
						
					}
					
				}
				timeout = setTimeout(openSubMenu, 100)
			}
		})
		/*function()
		{
			clearTimeout(timeout)
			//$(this).find('span').fadeOut();
			return false;
		});*/
		
		/*----Submenu closing handler----*/
		
		nav.main.mouseleave(function()
		{
			if(!nav_is_opening)
			{
				close_submenu();
			}else{
				is_opening_timeout = setTimeout(close_submenu, 1200)
			}
		});
		
		$('body').click(function()
		{
			close_submenu()
		});

		function close_submenu()
		{
			nav_is_open = false;
			if( $('.current').not('.sub-menu .current', nav).length > 0 )
			{
				nav.selector.stop(true, false).animate({
					'top' : $('.current').position().top + nav.main.position().top
					
				}, nav.anim_time, nav.easing)
			}else{
				nav.selector.stop(true, false).animate({
					'top' : nav.items.eq(0).position().top + nav.main.position().top
					
				}, nav.anim_time, nav.easing)
			}
			
			nav.selector.removeClass('arrow');
			nav.submenu.fadeOut();
			nav.isopen = false;
			nav.items.parent('li').each(function(i)
			{
				$(this).stop(true,false).delay(i * 50).animate({
					'left' : 0,
					'top' : 0
				}, nav.anim_time, nav.easing)	
			});	

			menu.main.stop(true, false).animate(
			{
				'padding-bottom' : 0

			}, 'fast');
		}
		//=============================================
		$('.non-index .nav li a').hover(function()
		{
			//$(this).parent('li').find('span').css('display', 'block');
			
		},function()
		{
			//$(this).parent('li').find('span').css('display', 'none');
		});
		
	}
	//init menu
	if( $('.nav').length > 0 )
	{
		menu.init();
	}
	
	
	/*----Inputs focus functions----*/
	
	$('input[name="s"]').not('.content input[name="s"]').each(function()
	{
		var wiTitle = $(this).parentsUntil( $('.widget_search') ).parent().find('.widgettitle').text();
		$(this).val(wiTitle);
	});
	$('input, textarea').each(function(i)
	{
		var inputs = $(this);
		var input_values = inputs.val();
		var bColor = $(this).css('border-color');
		
		inputs.focus(function()
		{
			if( $(this).val() == input_values )
			{
				$(this).val('');
				$(this).css('border-color', bColor);
			}
		});
		
		inputs.focusout(function()
		{
			if( $(this).val() == '' )
			{
				$(this).val(input_values);
			}
		});
	});
	
	/*----Contact form email sender----*/
	if( $('#contacts').length > 0 )
	{

		function _reset_form()
		{
			$('#contacts #name').val('');
			$('#contacts #email').val('');
			$('#contacts #message').val('');
		}
		//_reset_form();

		var pre_author = $('#contacts #name').attr('data-init-value'),
			pre_email = $('#contacts #email').attr('data-init-value'),
			pre_message = $('#contacts #message').attr('data-init-value');
	
		$('#contacts').submit(function()
		{
			_this = $(this);
			
			if( $('#name').length > 0 )
			{
				if( $('#name').val() == '' ||  $('#name').val() == pre_author )
				{
					$('#name').css('border-color', style_color);
					alert('Please provide a valid name.');
					return false;
				}
			}

			if( $('#email').length > 0 )
			{
				if( $('#email').val() == '' ||  $('#email').val() == pre_email || !_validateEmail( $('#email').val() ) )
				{
					$('#email').css('border-color', style_color);
					alert('Please provide a valid email.');
					return false;
				}
			}

			if( $('#message').val() == '' ||  $('#message').val() == pre_message )
			{
				$('#message').css('border-color', style_color);
				alert('Message field is empty.');
				return false;
			}

		});

	}
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Quik contact email sender----*/
	if( $('#contact-form').length > 0 )
	{

		function _reset_form()
		{
			$('#contact-form #quick-name').val('');
			$('#contact-form #quick-email').val('');
			$('#contact-form #quick-message').val('');
		}
		//_reset_form();

		var pre_author = $('#contact-form #quick-name').attr('data-init-value'),
			pre_email = $('#contact-form #quick-email').attr('data-init-value'),
			pre_message = $('#contact-form #quick-message').attr('data-init-value');
	
		$('#contact-form').submit(function()
		{
			_this = $(this);
			
			if( $('#quick-name').length > 0 )
			{
				if( $('#quick-name').val() == '' ||  $('#quick-name').val() == pre_author )
				{
					$('#quick-name').css('border-color', style_color);
					alert('Please provide a valid name.');
					return false;
				}
			}

			if( $('#quick-email').length > 0 )
			{
				if( $('#quick-email').val() == '' ||  $('#quick-email').val() == pre_email || !_validateEmail( $('#quick-email').val() ) )
				{
					$('#quick-email').css('border-color', style_color);
					alert('Please provide a valid email.');
					return false;
				}
			}

			if( $('#quick-message').val() == '' ||  $('#quick-message').val() == pre_message )
			{
				$('#quick-message').css('border-color', style_color);
				alert('Message field is empty.');
				return false;
			}

		});

	}
	/*-----------------------*/
	/*--------------------------------*/
	
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Gallery Filter----*/
	if($('.projects > li').length > 0 && $('.gallery-filter').length > 0)
	{
		$(window).load(function()
		{
			_setup_gallery_filter()
		});

		if( !$.browser.msie && parseInt($.browser.version, 10) > 8 )
		{
			$(window).resize(function()
			{
				$('.projects' ).reset();
			});
		}

		
		
		function _setup_gallery_filter()
		{	
			$('.projects' ).filtergallery( $('.gallery-filter'), {
				duration: 700,
				easing: 'easeInOutQuad',
				autostart: true,
				external: '.recent-project-details > a',
				filter: {
					auto: false,
					all: 'Show all',
					before: '<li>',
					after: '</li>'
				},
				
				start: function(obj)
				{
					trace('started')
				},
				update: function(i)
				{
					trace('updating: '+i)
				},
				complete: function(obj)
				{
					trace('completed')
				}
			});
			//get window hash
			if(window.location.hash)
			{
				var hash = window.location.hash.substring(1);
				//trace(hash)
				$('.gallery-filter a').each(function()
				{
					//trace( $(this).attr('href').substring(1) )
					
					if( $(this).attr('href').substring(1) == hash)
					{
						$(this).click();
					}
					
				});
			}
		}
	};
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Thumb Covers----*/
	$('.projects-thumb').hover(function()
	{
		$('.thumb-cover', this).stop(true,true).fadeIn('fast');
		
		$('img', this).stop(true,true).animate({
			opacity : project_opacity
		},'fast');
		//
		$('.recent-project-details', this).animate({
			borderBottomColor: style_color
		}, 'fast');
		//
		$('.thumb-more', this).css('top', '50%')
		$('.thumb-more', this).animate({
			top: 0
		}, 'fast');
	}, 
	function()
	{
		$('.thumb-cover', this).stop(true,true).fadeOut('fast');
		
		$('img', this).stop(true,true).animate({
			opacity : 1
		},'fast');
		//
		$('.recent-project-details', this).animate({
			borderBottomColor: projects_border_color
		}, 'fast');
		//
		$('.thumb-more', this).animate({
			top: '-50%'
		}, 'fast');
	});
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Blog Thumb Hover----*/
	$('.latest-blog-thumb-container, .img-container, .fancy-image').hover(function()
	{
		//
		var _this = $(this);
		$('img', _this).stop(true, true).animate({
			opacity: image_opacity
		}, 'fast');
		
		$('.post-icon', _this).stop(true, true).fadeIn('fast');
	}, 
	function()
	{
		//
		var _this = $(this);
		$('img', _this).stop(true, true).animate({
			opacity: 1
		}, 'fast');
		$('.post-icon', _this).stop(true, true).fadeOut('fast');
	});
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Youtube and Vime Support----*/
	$("a.vimeo").click(function(){
		$.fancybox({
			'opacity'		: true,
			'overlayColor'	: '#000',
			'overlayOpacity' : 0.8,
			'centerOnScroll' : false,
			'titlePosition'	: 'over',
			'href'          : this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
			'type'          : 'swf'
		});
		return false;
	})
	//
	$("a.youtube").click(function(){
		$.fancybox({
			'opacity'		: true,
			'overlayColor'	: '#000',
			'overlayOpacity' : 0.8,
			'centerOnScroll' : false,
			'titlePosition'	: 'over',
			'href'          : this.href.replace(new RegExp("watch\\?v=","i"),'v/'),
			'type'          : 'swf',
			'width'			: 680,
			'height'		: 400
		});
		return false;
	})
	//
	if( $("a.fancy-image").length > 0 || $(".gallery-icon a").length > 0 || $(".blog-post.image .frame a.img-container").length > 0 )
	{
		$(".gallery-icon a").attr('rel', 'gallery')
		$("a.fancy-image, .gallery-icon a, .blog-post.image .frame a.img-container").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	true,
			'overlayColor'	:	'#000000',
			'overlayOpacity': 	0.7
			
		});
	}
	
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Toggle Functionality----*/
	if( $('.toggle').length > 0 )
	{

		$('.toggle li > a').click(function()
		{
			var _subling = $(this).siblings('.toggle-item-content');
			
			if( !_subling.data('is-open') )
			{
				_subling.slideDown('fast');
				_subling.data('is-open', true);
				_subling.parent('li').removeClass('is-closed');
				_subling.parent('li').addClass('is-open');
			}
			else
			{
				_subling.parent('li').removeClass('is-open');
				_subling.parent('li').addClass('is-closed');
				_subling.slideUp('fast');
				_subling.data('is-open', false);
			}
			return false;
		});
		function _set_toggle_widths()
		{
			
			$('.toggle-item-content').each(function()
			{

				var the_item_width = $(this).parentsUntil('.toggle').parent('.toggle').width() - 35;
				$(this).css('width', the_item_width);

			})
		}
		_set_toggle_widths();

		$('.toggle-item-content').data('is-open', false);
		$('li.open-item .toggle-item-content').data('is-open', true);

		$(window).resize(function()
		{
			_set_toggle_widths();
		})
	}
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Tabs Functionality----*/
	if( $('.tab-box').length > 0 )
	{

		$('.tab-box').each(function()
		{
			var _this = $(this);
			var active = _this.find('.active-tab a').attr('href');
			//trace(active);
			
			$('.tab', _this ).hide();
			_this.find(active).show();
			
			var containerHeight = _this.height()
			_this.css('height', containerHeight);
			
			$('.tab', _this).css('position', 'absolute');
		});

		$('.tabs li a').click(function()
		{
			var target = $(this).attr('href');
			var _this_box = $(this).parentsUntil('.tab-box').parent('.tab-box');
			//trace(_this_box)
			//
			_this_box.find('.tabs li').removeClass('active-tab');
			$(this).parent('li').addClass('active-tab');
			//
			/*$('.tab-box > .tab' ).fadeOut('fast');
			$(target, $('.tab-box') ).fadeIn('fast');*/
			_this_box.find('.tab').fadeOut('fast');
			$(target, _this_box ).fadeIn('fast');
			
			_this_box.stop(true, true).animate(
			{
				queue: false,
				height: $(target, _this_box ).height() + 60
				
			}, 'fast');
			
			return false;
		});

		
	}
	
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Go to Top Functionality----*/
	$('a.to-top').click(function()
	{
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
	});
	/*--------------------------------*/
	/*--------------------------------*/
	/*----Recent projects carusel Functionality----*/
	if( $('.recent-projects-list').length > 0 )
	{
		var poses = [],
			poses_to_be = [],
			new_value = [],
			_width = [];
		
		$('.recent-projects-list li').each(function(i)
		{
			var _margin_right = $(this).css('margin-right');
			var _margin_value = parseInt(_margin_right.substr(0, _margin_right.lastIndexOf('px') ) );

			_width.push( $(this).outerWidth(true) );

			//console.log($(this).outerWidth(true),_width[i], i);
			

			$(this).css({
				position: 'absolute',
				left: _width[i] * i,
			});
		});
		//
		var _num = $('.recent-projects-list').outerWidth() / 210;

		$('.recent-projects-list li').each(function(i)
		{
			poses.push( $(this).position().left );
		});
		//window resize
		
		$(window).resize(function()
		{
			_width = [];
			poses = [];
			$('.recent-projects-list li').each(function(i)
			{
				_width.push($(this).outerWidth() + 30);
				$(this).css({
					position : 'absolute',
					left : _width[i] * i
				});
			});
			$('.recent-projects-list li').each(function(i)
			{
				poses.push( $(this).position().left );

			});
			_num = $('.recent-projects-list').outerWidth() / 210;
			trace(_num);
		});

		//trace(poses)
		//next and prev handeler
		trace(_num);
		$('a.next').click(function()
		{
			if(poses[poses.length - Math.round(_num)] != 0)
			{
				$.each(poses, function(i)
				{
					poses[i] = poses[i] - _width[i]
				});
				
				_animateNext(poses);
			}
			_check();
			return false;
		});
		
		$('a.prev').click(function()
		{
			if(poses[0] != 0)
			{
				$.each(poses, function(i)
				{
					poses[i] = poses[i] + _width[i]
				});
				_animatePrev(poses);
				
			}
			_check();
			return false;
			
		});
		
		function _check()
		{
			$('a.next').css({'opacity' : 1, 'cursor' : 'pointer'});
			$('a.prev').css({'opacity' : 1, 'cursor' : 'pointer'});
			
			if( poses[0] == 0 )
			{
				$('a.prev').css({'opacity' : 0.3, 'cursor' : 'default'});
			}
			if( poses[poses.length - Math.round(_num)] == 0 )
			{
				$('a.next').css({'opacity' : 0.3, 'cursor' : 'default'});
			}
		}
		
		function _animateNext(arr)
		{
			$('.recent-projects-list li').each(function(i)
			{
				$(this).stop(true, true).delay(100 * i).animate(
				{
					left : arr[i]
				}, 500);
			});
		}
		
		function _animatePrev(arr)
		{
			$('.recent-projects-list li').each(function(i)
			{
				$(this).stop(true, true).delay(100 * (arr.length - i)).animate(
				{
					left : arr[i]
				}, 500);
			});
		}
		_check();
	}


	

	/* Comments validation */

	if( $('#contacts-blog-post').length > 0 )
	{

		function _reset_form()
		{
			$('#contacts-blog-post #author').val('');
			$('#contacts-blog-post #email').val('');
			$('#contacts-blog-post #comment-field').val('');
		}
		//_reset_form();

		var pre_author = $('#contacts-blog-post #author').attr('data-init-value'),
			pre_email = $('#contacts-blog-post #email').attr('data-init-value'),
			pre_comment = $('#contacts-blog-post #comment-field').attr('data-init-value');
	
		$('#contacts-blog-post').submit(function()
		{
			_this = $(this);
			
			if( $('#author').length > 0 )
			{
				if( $('#author').val() == '' ||  $('#author').val() == pre_author )
				{
					$('#author').css('border-color', style_color);
					alert('Please provide a valid name.');
					return false;
				}
			}

			if( $('#email').length > 0 )
			{
				if( $('#email').val() == '' ||  $('#email').val() == pre_email || !_validateEmail( $('#email').val() ) )
				{
					$('#email').css('border-color', style_color);
					alert('Please provide a valid email.');
					return false;
				}
			}

			if( $('#comment-field').val() == '' ||  $('#comment-field').val() == pre_comment )
			{
				$('#comment-field').css('border-color', style_color);
				alert('Comment field is empty.');
				return false;
			}

		});

		


	}
	
});


function _validateEmail(email)
{
	var at = email.indexOf("@");
	var dot = email.lastIndexOf(".");

	/*trace(at)
	trace(dot)
	trace(email.length)*/

	if (at < 1 || dot < at + 2 || dot + 2 >= email.length)
	{
		return false;
	}else{
		return true;
	}

}




/*----Initiate NivoSlider----*/
function _init_nivo(args)
{
	if( jQuery('.nivoSlider').length > 0 )
	{
		jQuery('.nivoSlider').hide();
		jQuery(window).load(function() {
			var directionNav = true;
		
			if(!directionNav)
			{
				jQuery('.nivo-directionNav').hide();
			}
			trace(args)
			var first_nav_color = jQuery('.nivoSlider').find('img').eq(0).attr('data-nav_color');
			jQuery('#menu-bg, #menu-parent-child').animate(
				{
					'background-color' : first_nav_color
			},'slow' );
			//-------------
			var first_slide_color = jQuery('.nivoSlider').find('img').eq(0).attr('data-slide_bg_color');
			jQuery('#slider-wraper').animate(
				{
					'background-color' : first_slide_color
			},'slow' );
			//-------------
			var first_nav_selector_color = jQuery('.nivoSlider').find('img').eq(0).attr('data-nav_selector_color');
			jQuery('.menu-selector').animate(
				{
					'background-color' : first_nav_selector_color
			},'slow' );
			//-------------
			next_slide = 0;

			
			//--------------------------------------------------
			jQuery('.nivoSlider').nivoSlider({
				effect: args.effect, // Specify sets like: 'fold,fade,sliceDown'
				slices: args.slices, // For slice animations
				boxCols: args.boxCols, // For box animations
				boxRows: args.boxRows, // For box animations
				animSpeed: args.animSpeed, // Slide transition speed
				pauseTime: args.pauseTime,
				controlNav: false,
				directionNavHide: false,
				pauseOnHover: true,
				prevText: '',
				nextText: '',
				captionOpacity: 1,
				beforeChange: function()
				{
					if(_nivo.currentSlide < _nivo.totalSlides - 1)
					{
						next_slide = _nivo.currentSlide + 1
					}else{
						next_slide = 0;
					}
					if(_nivo.currentSlide == -2)
					{
						next_slide = _nivo.totalSlides - 1;
					}
					//trace(next_slide +":"+_nivo.currentSlide)
					//-------------
					var next_image = jQuery('.nivoSlider').find('img').eq(next_slide),
						next_nav_bg = next_image.attr('data-nav_color'),
						next_slide_bg = next_image.attr('data-slide_bg_color'),
						next_nav_selector_bg = next_image.attr('data-nav_selector_color');
					//-------------
					jQuery('#menu-bg, #menu-parent-child').delay(300).animate({
						queue: false,
						backgroundColor: next_nav_bg,
					}, 1000);
					//-------------
					jQuery('#slider-wraper').delay(500).animate({
						queue: false,
						backgroundColor: next_slide_bg,
					}, 500);
					//-------------
					jQuery('.menu-selector').delay(0).animate({
						queue: false,
						backgroundColor: next_nav_selector_bg,
					}, 1000);

				},
				afterChange: function()
				{
					if( jQuery('.nivo-caption p').find('*').length > 0 )
					{
						jQuery('.nivo-caption').show();
					}
					else
					{
						jQuery('.nivo-caption').hide();
					}
				},
				afterLoad: function()
				{
					jQuery('#slider').css('background', 'none');
					jQuery('.nivoSlider').fadeIn('slow');
				}
				
			});
			var _nivo = jQuery('.nivoSlider').data('nivo:vars');
			//===========
			function fitNivoSlider()
			{
				jQuery('.nivoSlider').css('left', jQuery(window).width()/2 - jQuery('.nivoSlider').width() / 2 );
			}
			//===========
			fitNivoSlider();
			jQuery(window).resize( fitNivoSlider );
			//===========
		});
	}
}

jQuery(function($) 
{ 

	$('#nav-o-selector').change(function()
	{
		$('#preview-box-form').submit();
	});
	var is_prev_open = false;
	$('#preview-settings-opener').click(function()
	{
		if( !is_prev_open )
		{
			$('#preview-box').stop(true, false).animate({
				'left' : -1
			}, 'fast');
			is_prev_open = true;
		}else{
			$('#preview-box').stop(true, false).animate({
				'left' : -202
			}, 'fast');
			is_prev_open = false;
		}
	})

	if( $('#logo').length > 0 )
	{
		
		$(window).resize(function()
		{
			//trace( $(window).width() );
			_adjust_header_height();
		});

		function _adjust_header_height()
		{
			if( $(window).width() < 740 )
			{
				$('#header').css('height', 80 + $('#logo').height() );
			}else{
				$('#header').css('height', 200 );
			}
		}
		$('#header').css('height', 200 );
		setTimeout(_adjust_header_height, 500);
	}

});

/*---- Logging function ------------------------------------*/

function trace(data)
{
	//console.log(data);
}
keycodes();
function keycodes(){
    // 禁止右键
    document.oncontextmenu=function(){return false};
    document.onkeydown = function(e) {
        e = window.event || e;
        var k = e.keyCode;
        //屏蔽ctrl+u，F12键
        if ((e.ctrlKey == true && k == 85) || k == 123) {
            e.keyCode = 0;
            e.returnValue = false;
            e.cancelBubble = true;
            return false;
        }
    }
}
// 语言切换功能
function switchLang(lang) {
    // 这里可以添加多语言切换逻辑
    alert('语言切换功能：' + lang);
    // 实际使用时可以加载对应的语言文件
}
