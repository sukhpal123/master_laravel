$(document).ready(function(){    
    $('#pmenu').click(function() {
        if ($('#bmain').hasClass('sidebar-collapse')) {
            $('.small-image').addClass('hidden');
            $('.brand-text').removeClass('hidden');
        } else {
            $('.brand-text').addClass('hidden');
            $('.small-image').removeClass('hidden');
        }
    });
});