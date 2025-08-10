/*
    Custom JavaScript for Omar Abd Al-Aziz's Portfolio
    -------------------------------------------------------------
    This script adds interactive effects like smooth scrolling
    and animations on scroll using IntersectionObserver.
*/

$(document).ready(function() {
    // Mobile menu toggle functionality
    $('#menu-toggle').on('click', function() {
        $('#mobile-menu ul').toggleClass('hidden');
        $('.menu-open, .menu-close').toggleClass('hidden');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#menu-toggle, #mobile-menu').length) {
            $('#mobile-menu ul').addClass('hidden');
            $('.menu-close').addClass('hidden');
            $('.menu-open').removeClass('hidden');
        }
    });

    // Close mobile menu when clicking on a link
    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu ul').addClass('hidden');
        $('.menu-close').addClass('hidden');
        $('.menu-open').removeClass('hidden');
    });

    // Smooth scrolling for navigation links
    // This function prevents the default anchor link behavior
    // and adds a smooth animation to scroll to the target section.
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80 // Adjust offset for fixed header
            }, 800);
        }
    });

    // Animate the header on scroll
    // The header becomes smaller and changes background color
    // after the user scrolls past the top of the page.
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }
    });

    // Animate elements as they come into view using IntersectionObserver
    // This is more performant than using the scroll event listener.
    const observerOptions = {
        root: null, // use the viewport as the root
        rootMargin: '0px',
        threshold: 0.2 // trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to the element to trigger its animation
                entry.target.classList.add('animate-visible');
                // Stop observing after the animation has been triggered once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the 'data-animate' attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
        observer.observe(element);
    });

    // Contact form submission handler that redirects to WhatsApp
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();

        // Format the message for WhatsApp
        const whatsappMessage = `*New Contact Form Message*%0A%0A`
            + `*Name:* ${name}%0A`
            + `*Email:* ${email}%0A`
            + `*Subject:* ${subject}%0A%0A`
            + `*Message:*%0A${message}`;

        // WhatsApp API URL
        const whatsappURL = `https://wa.me/201208404930?text=${whatsappMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');

        // Reset the form
        this.reset();
    });

});
