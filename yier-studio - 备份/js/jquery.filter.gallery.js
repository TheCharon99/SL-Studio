(function($){ 
	jQuery.fn.filtergallery = function(_filter, _options)
	{
		//defining element and filter variables 
		var element = this,
			
			filter = _filter;
		
		//asign default option
		var defaults = {
			duration: 750,
			attribute: 'data-tag',
			items: $(element).find('li'),
			active: 'fg-active acitve',
			filter: {
						auto: false,
						all: '',
						before: '',
						after: ''
					},
			autostart: true,
			external: '.external-filter',
			easing: 'swing',
			start: function(){},
			complete: function(){},
			update: function(){}
		};
		//extend default option
		var o = $.extend({}, defaults, _options); 
		
		//other variables
		var itempos = {};
		var current_filter_public = '';
		var items = o.items,
			elemenHeight = '';
		
		//init plugin structure
		function _init()
		{
			//trace('inited')
			items.each(function(i)
			{
				var item = $(this);
				elemenHeight = element.height();
				
				itempos[i] = {
					'y' : item.position().top,
					'x' : item.position().left
				};
				//set element height
				element.css({
					'height' : elemenHeight
				});
			});
			//set absolute positions
			items.each(function(i)
			{
				var item = $(this)
				item.css({
					'position' : 'absolute',
					'top' : itempos[i].y,
					'left' :  itempos[i].x
				})
				item.data( '_height', item.height() );
			})
			//generate filter tags if auto generation of filters set to true
			if(o.filter.auto)
			{
				_buildFilter();
			}
			//filter by first tag if auto filtering set to true
			if(o.autostart && filter.find('a:first').length > 0)
			{
				var firstanchor = filter.find('a:first'),
					tag = firstanchor.attr('href').substr(1);
				//add active class to the first filter element
				_activeclass( firstanchor );
				//check if the first filter element is not "all" then continue 
				//if the first element is all plugin-will not continue until any filter element is clicked
				if(tag != 'all')
				{
					_reorder( _checkmatches(tag), false );
				}
			}
			//Filter click handeler
			filter.find('a').live('click', function()
			{
				//trace('click');
				var tag = $(this).attr('href').substr(1);
				_reorder( _checkmatches(tag), false );
				//call to add the active class
				_activeclass( $(this) )
				
				return false;
			});
			//filter by external filters

			$(o.external).live('click', function()
			{
				var tag = $(this).attr('href').substr(1);
				_reorder( _checkmatches(tag), false );
				
				var all_filters = filter.find('a');
				//
				all_filters.each(function()
				{
					if($(this).attr('href').substr(1) == tag)
					{
						_activeclass( $(this) )
					}
				});
				//
			});
		}
		//
		function _activeclass(__anchor)
		{
			var container = __anchor.parentsUntil(filter),
				active = $(container[container.length - 1]),
				rest = active.siblings();
			//check if fliter anchor tags hav parents or these are the children of the filter container
			if(active.length > 0)
			{
				//removing active class from the rest
				rest.removeClass(o.active);
				//applying class to the active filter
				active.addClass(o.active);
			}else{
				//removing active class from the rest of anchor tags
				__anchor.siblings().removeClass(o.active)
				//applying class to the active anchor filter
				__anchor.addClass(o.active);
			}
			current_filter_public = __anchor.attr('href').substr(1);
		}
		//build filter depending on tags that are present in items
		function _buildFilter()
		{
			var tags = [],
				tag = [];
			
			items.each(function(i)
			{
				var item = $(this),
					tagGroup = item.attr(o.attribute).split(',');
				//trim whitespaces from each tag
				$.each(tagGroup, function(key, value)
				{
					value = $.trim(value);
					tagGroup[key] = value;
				});
				tag.push(tagGroup);
				//merge all tags into one array
				tags = $.merge( tags, tag[i] );
			});
			//remove duplicate items from array
			$.unique(tags);
			//adding show all tag if defined
			if( o.filter.all != '' )
			{
				_createFilterItem( o.filter.all, 'all' );
			}
			
			//formate tags, text and href attribute values of anchor elements
			$.each(tags, function(key, value)
			{
				var __tag = value.toLowerCase().split(' ').join('_');
				_createFilterItem(value, __tag);
			});
			
			//create and add tags to filter
			function _createFilterItem(__text, __tag)
			{
				//create container for anchor element based on before and after values from options
				var tagcontainer = o.filter.before + o.filter.after;
				
				//create default anchor element
				var a = $('<a>',{
						html: __text,
						href: '#' + __tag
					})
				//add newly created anchor elemet to the filter
				a.appendTo(filter);
				//wrap above anchor element in the container
				if(tagcontainer != '')
				{
					a.wrap(tagcontainer)
				}
			}
		}
		//check for matches using the tag value of filter and tags put on gallery items
		function _checkmatches(__tag)
		{
			var matched = [],
				rest = [];
			//getting tags from gallery elements
			items.each(function()
			{
				var item = $(this),
					tags = item.attr(o.attribute).split(',')
				//looping through the tags
				$.each(tags, function(key, value)
				{
					value = $.trim(value);
					tags[key] = value;
					//checking if there is a match
					if(__tag == value )
					{
						//adding all items to an array that match 
						matched.push(item);
					}
				});
				//checking if the tag was all
				if(__tag == 'all')
				{
					//adding all items to array
					matched.push(item);
				}
			});
			//call to reorder function with argument: array with all matched elements
			return matched;
		}
		
		//reorder items gallery according to tag(s)
		function _reorder(__matched, __no_anim)
		{
			var start = { position: 0 },
				end = { position: 100 };
			//callback on start
			o.start(__matched);	
			//callback functions update and complete
			$(start).animate(end,{
				duration : o.duration, 
				easing : 'linear',
				step: function( now, fx ){
					o.update(now, __matched);
				},
				complete: function()
				{
					o.complete(__matched);
				}
			});
			//animate all items to their initial positions
			
			items.each(function(i)
			{
				var item = $(this);
				if($.browser.msie && parseInt($.browser.version, 10) < 9 )
				{
					item.stop().animate({
						queue: false,
						top: itempos[i].y,
						left: itempos[i].x,
						height: 0
					}, o.duration, o.easing);
				}
				else
				{
					item.stop().animate({
						queue: false,
						top: itempos[i].y,
						left: itempos[i].x,
						opacity: 0
					}, o.duration, o.easing, function()
					{
						$(this).hide();
					});
				}
			});
			//animate the matched elements to their new positions
		
			$.each(__matched,function(i)
			{
				var item = $(this);
				
				if($.browser.msie && parseInt($.browser.version, 10) < 9 )
				{
					item.stop().show().animate({
						queue: false,
						top: itempos[i].y,
						left: itempos[i].x,
						height: item.data('_height')
					}, o.duration, o.easing);
				}
				else
				{
					item.stop().show().animate({
						queue: false,
						top: itempos[i].y,
						left: itempos[i].x,
						opacity: 1
					}, o.duration, o.easing);
				}
			});
			
			//adjust element height
			var initYVal = 0,
				yVal = 0;
				
			$.each(__matched, function(i)
			{
				var item = $(this),
					new_height = itempos[__matched.length - 1].y + item.height();
					
				element.stop(true, false).animate({
					height : new_height
				}, o.duration, o.easing);
			
			});
			
			//ie-8 handeler
			/*if($.browser.msie)
			{
				var itemHeight = new Array();
				items.each(function(i)
				{
					var item = $(this);
					itemHeight.push( item.height() );
					
					item.stop().animate({
						queue: false,
						height: 0
					}, o.duration, o.easing);
				});
				//
				$.each(__matched,function(i)
				{
					var item = $(this);
					item.stop().animate({
						queue: false,
						height: itemHeight[i]
					}, o.duration, o.easing);
				});
				//alert('is IE');
			}*/
		}
		//initiate plugin functionality
		_init();
		
		//method to handle position reset when browser window is resized
		$.fn.reset = function(){
			//trace('reset...')
			items.each(function(i)
			{
				var item = $(this);
				
				item.css({
					'position' : 'static',
					'display'  : 'inline-block'
				});
				
				if($.browser.msie && parseInt($.browser.version, 10) < 9 )
				{
					item.css({
						top: itempos[i].y,
						left: itempos[i].x,
						height: item.data('_height'),
						opacity: 0
					});
				}
				else
				{
					item.css({
						top: itempos[i].y,
						left: itempos[i].x,
						opacity: 0
					});
				}
				
			});
			
			items.each(function(i)
			{
				var item = $(this);
				elemenHeight = element.height();
				
				itempos[i] = {
					'y' : item.position().top,
					'x' : item.position().left
				};
				//reset element height
				element.css({
					'height' : elemenHeight
				});
			});
			//reset absolute positions
			items.each(function(i)
			{
				var item = $(this)
				item.css({
					'position' : 'absolute',
					'top' : itempos[i].y,
					'left' :  itempos[i].x
				});
				item.data( '_height', item.height() );
			});
			_reorder( _checkmatches(current_filter_public), true );
			
		}
	}
	
})(jQuery);