/* imggray - jQuery plugin for image hover effects */
(function($) {
    $.fn.imggray = function(options) {
        var settings = $.extend({
            grayClass: 'gray'
        }, options);

        return this.each(function() {
            var $container = $(this);
            var $images = $container.find('img');

            // Apply gray class initially
            $images.addClass(settings.grayClass);

            // Hover effect
            $container.find('li a').hover(
                function() {
                    $(this).find('img').removeClass(settings.grayClass);
                },
                function() {
                    $(this).find('img').addClass(settings.grayClass);
                }
            );
        });
    };
})(jQuery);
