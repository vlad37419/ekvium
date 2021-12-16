$( document ).ready(function() {
    let activitySlider = new Swiper('.activity-slider', {
        observer: true,
        loop: true,
        spaceBetween: 31,
        speed: 2000,
        navigation: {
            nextEl: '.activity-slider-button-next',
            prevEl: '.activity-slider-button-prev',
        },
        breakpoints: {
            360: {
                touchRatio: 0,
                slidesPerView: 1,
                speed: 500,
                autoHeight: true,
            },

            991: {
                touchRatio: 0,
                slidesPerView: 2,
            },
        }
    });

    const eventsSlider = new Swiper('.events-slider', {
        navigation: {
            nextEl: '.events-swiper-button-next',
            prevEl: '.events-swiper-button-prev',
        },
        spaceBetween: 31,
        breakpoints: {
            360: {
                slidesPerView: 1.4,
                touchRatio: 1,
                centeredSlides: true,
                loop: true,
                spaceBetween: 16,
            },

            460: {
                slidesPerView: 1.8,
                touchRatio: 1,
                centeredSlides: true,
                loop: true,
            },

            600: {
                slidesPerView: 2.5,
                touchRatio: 1,
                centeredSlides: true,
                loop: true,
            },

            991: {
                touchRatio: 0,
                slidesPerView: 3,
                centeredSlides: false,
            },

            1200: {
                touchRatio: 0,
                slidesPerView: 4,
            }
        }
    });

    const speakersSlider = new Swiper('.speakers-slider', {
        navigation: {
            nextEl: '.speakers-swiper-button-next',
            prevEl: '.speakers-swiper-button-prev',
        },
        spaceBetween: 31,
        slidesPerView: 4,
        breakpoints: {
            360: {
                slidesPerView: 1.2,
                touchRatio: 1,
                centeredSlides: true,
                loop: true,
                spaceBetween: 16,
            },

            460: {
                slidesPerView: 1.8,
                touchRatio: 1,
                centeredSlides: true,
                loop: true,
            },

            600: {
                slidesPerView: 2.5,
                touchRatio: 1,
                centeredSlides: true,
                loop: true,
            },

            991: {
                touchRatio: 0,
                slidesPerView: 3,
                centeredSlides: false,
            },

            1200: {
                touchRatio: 0,
                slidesPerView: 4,
            }
        }
    });

    let speakersHeight = $('.speakers-item-content').height() + 40 + 25;
    let speakersItemImageHeight = $('.speakers-item-image').height() + 25 + 36 + 35;
    let speakersItemContentHeight = $('.speakers-item-content').height() + 80 + 40;

    $('.speakers').css('bottom', -(speakersHeight));
    $('.wrapper-sections-top').css('padding-bottom', speakersItemImageHeight);
    $('.wrapper-sections-center').css('padding-top', speakersItemContentHeight);

    let selBody = $('body');

    selBody.on('click', '.residents-tabs-item', function () {
        $(".residents-tabs-item").removeClass("current");
        $(this).addClass("current");

        let section = $(this).data('section');
        let content = $(this).closest('.residents').find('.residents-tabs-content');

        function residentBeforeAjax () {
            content.fadeOut(100);
        }

        $.ajax ({
            url: "residents-handler.php",
            type: "POST",
            dataType: "html",
            data: {
                "SECTION": section,
            },
            before: residentBeforeAjax(),
            success: function (data) {
                $(content).html(data);
                content.fadeIn();
            },
            error: function (data) {
                console.log(data)
            }
        });
    }).on('click', '.residents-list-item', function () {
        $(".residents-list-item").removeClass("current");
        $(this).addClass("current");

        let subSection = $(this).data('sub-section');
        let subContent = $(this).closest('.residents-tabs-content').find('.resident-full-description');

        function subResidentBeforeAjax () {
            subContent.fadeOut(100);
        }

        $.ajax ({
            url: "residents-detail-handler.php",
            type: "POST",
            dataType: "html",
            data: {
                "SUB_SECTION": subSection,
            },
            before: subResidentBeforeAjax(),
            success: function (data) {
                $(subContent).html(data);
                subContent.fadeIn();
            },
            error: function (data) {
                console.log(data)
            }
        });
    }).on("click", ".activity-tabs-item", function () {
        $(".activity-tabs-item").removeClass("current");
        $(this).addClass("current");
        let activitySection = $(this).data('activity-section');
        let activityContent = $(this).closest('.activity-slider-wrapper').find('.activity-slider-wrapper-main');

        function activityContentBeforeAjax () {
            activityContent.fadeOut(100);
        }

        $.ajax ({
            url: "activity-handler.php",
            type: "POST",
            dataType: "html",
            data: {
                "ACTIVITY_SECTION": activitySection,
            },
            before: activityContentBeforeAjax(),
            success: function (data) {
                $(activityContent).html(data);
                activityContent.fadeIn();
                activitySlider = new Swiper('.activity-slider', {
                    loop: true,
                    spaceBetween: 31,
                    speed: 2000,
                    navigation: {
                        nextEl: '.activity-slider-button-next',
                        prevEl: '.activity-slider-button-prev',
                    },
                    breakpoints: {
                        360: {
                            touchRatio: 0,
                            slidesPerView: 1,
                            speed: 500,
                            autoHeight: "true",
                        },

                        991: {
                            touchRatio: 0,
                            slidesPerView: 2,
                        },
                    }
                });
                if ($(window).width() > 991) {
                    $(".activity-slide").removeClass("active");
                    $(".swiper-wrapper").removeClass("active");
                    $(".swiper-wrapper").find(".swiper-slide-active").removeClass("current");
                    $(".activity-slider-wrapper").find(".activity-tabs-wrapper").removeClass("active");
                    $(".activity-slider-wrapper").removeClass("active");
                    $(".activity-slide.swiper-slide-next").addClass("change");
                    $(".activity-slider-wrapper").find(".activity-slide.swiper-slide-active").removeClass("hide");
                } else {
                    $(".swiper-slide-active").removeClass("open");
                    $(".activity-slider-wrapper").removeClass("open");
                }
            },
            error: function (data) {
                console.log(data)
            }
        });
    }).on("click", ".activity-slider-button-prev", function () {
        $(".activity-slide").removeClass("change");
    }).on("click", ".activity-slider-button-next", function () {
        $(".activity-slide").removeClass("change");
    });

    if ($(window).width() > 991) {
        selBody.on("click", ".activity-slide-button", function () {
            $(this).closest(".activity-slide").addClass("active");
            $(this).closest(".swiper-wrapper").addClass("active");
            $(this).closest(".swiper-wrapper").find(".swiper-slide-active").addClass("current");
            $(this).closest(".activity-slider-wrapper").find(".activity-tabs-wrapper").addClass("active");
            $(this).closest(".activity-slider-wrapper").addClass("active");
            $(this).closest(".activity-slider-wrapper").find(".activity-slide.swiper-slide-active").removeClass("hide");
        }).on("click", ".close-slide", function () {
            $(this).closest(".activity-slide").removeClass("active");
            $(this).closest(".swiper-wrapper").removeClass("active");
            $(this).closest(".swiper-wrapper").find(".swiper-slide-active").removeClass("current");
            $(this).closest(".activity-slider-wrapper").find(".activity-tabs-wrapper").removeClass("active");
            $(this).closest(".activity-slider-wrapper").removeClass("active");
            $(this).closest(".activity-slide.swiper-slide-next").addClass("change");
            $(this).closest(".activity-slider-wrapper").find(".activity-slide.swiper-slide-active").addClass("hide");
        });
    } else {
        let slideActiveHeight = null;
        selBody.on("click", ".activity-slide-button", function () {
            $(this).closest(".swiper-slide-active").addClass("open");
            $(this).closest(".activity-slider-wrapper").addClass("open");
            slideActiveHeight = $(this).closest(".swiper-slide-active").height();
            console.log(slideActiveHeight);
        }).on("click", ".close-slide", function () {
            $(this).closest(".swiper-slide-active").removeClass("open");
            $(this).closest(".activity-slider-wrapper").removeClass("open");

            console.log(activitySlider);

            setTimeout(function () {
                activitySlider.updateAutoHeight();
            }, 30);
        });
    }
});