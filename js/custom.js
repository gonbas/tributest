(function($) {

    $(document).ready(function() {

        $('.btn-update-quantity').click(function() {
            var target = $(this).data('target');
            var slug = $(this).data('handle');
            var q = $(target).val();
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/cart/update',
                data: {slug: slug, quantity: q},
                success: function (data) {
                    if (!data.error) {
                        $('[data-total]').text(data.cart.totalNumber);
                        $('[data-subtotal]').text(data.cart.subtotalNumber);
                        $('body').css('cursor', 'auto')
                    }
                },
                error: function () {
                    $('body').css('cursor', 'auto')
                    return false;
                }
            })
        })

        /* Notificaciones */

        if($('.alert-global').length > 0) {
            setTimeout(function() {
                if($('.alert-global').length > 0) {
                    $('.alert-global').css('animation-name', 'bounceOutUp');
                }
            }, 5000);

            $('.alert-global').click(function() {
                $(this).css('animation-name', 'bounceOutUp');
            })
        }

        /* Comments */

        $('.spr-summary-actions-newreview').click(function(e) {
            e.preventDefault();
            $('.spr-form').toggle();
        })

        $('.new-review-form .spr-starrating .spr-icon').click(function(e) {
            e.preventDefault();
            $('.spr-form .spr-starrating .spr-icon').addClass('spr-icon-star-empty');
            var value = $(this).attr('data-value');
            $('.spr-form .spr-starrating .spr-icon').each(function() {
                if($(this).attr('data-value') <= value) $(this).removeClass('spr-icon-star-empty');
            })
            $('.spr-form [name="quality"]').val(value);
        })

        // Google maps

        if ($('#map').length) {
            google.maps.event.addDomListener(window, 'load', initialize_map('#map'));
        }


    })

})(jQuery)


function notification(type, message) {
    var alert = '<div class="alert alert-global alert-'+type+'"><p>'+message+'</p></div>';
    $('body').append(alert);

    setTimeout(function() {
        if($('.alert-global').length > 0) {
            $('.alert-global').css('animation-name', 'bounceOutUp');
        }
    }, 5000);

    $('.alert-global').click(function() {
        $(this).css('animation-name', 'bounceOutUp');
    })
}

function initialize_map(id) {

    var latitude = $(id).data('lat'),
        longitude = $(id).data('long');
    var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        disableDefaultUI: true,
        center: new google.maps.LatLng(latitude, longitude)
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.set('styles', [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);


    var image = '//cdn.shopify.com/s/files/1/1009/2710/t/3/assets/marker.png?9389344609473927018';
    var myLatLng = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}
