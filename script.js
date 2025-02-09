
document.addEventListener('DOMContentLoaded', function() {
    startLoading();
    initBackgroundMusic();
    updateVisitorCount();
});

function startLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if(progress > 100) progress = 100;
        
        $('.progress').css('width', progress + '%');
        
        if(progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                $('.loading-screen').fadeOut();
            }, 500);
        }
    }, 500);
}

function initBackgroundMusic() {
    const music = document.getElementById('bgMusic');
    music.volume = 0.1;
    
    document.addEventListener('click', () => {
        music.play();
    }, { once: true });
}

function updateVisitorCount() {
    const count = parseInt(localStorage.getItem('visitorCount') || '0');
    localStorage.setItem('visitorCount', count + 1);
    $('#visitors').text(count + 1);
}


$(document).ready(function() {
  
    $('.main-container').hide();
});


function enterSite() {
    $('.welcome-screen').fadeOut(1000);
    $('.main-container').fadeIn(1000, function() {
    
        createStars();
        initBackgroundSlider();
        initMap();
    });
    playSound('click');
}


$(document).ready(function() {
    $('.main-container').hide();
    createStars();
    initBackgroundSlider();
    initMap();
    setupAudio();
});


function enterSite() {
    $('.welcome-screen').fadeOut(1000);
    $('.main-container').fadeIn(1000);
    playSound('click');
}


function setupAudio() {
    const sounds = {
        click: new Audio('click.mp3'),
        success: new Audio('success.mp3'),
        error: new Audio('error.mp3')
    };
    window.sounds = sounds;
}

function playSound(type) {
    window.sounds[type].play();
}


function createStars() {
    const starsContainer = $('.stars-container');
    for(let i = 0; i < 50; i++) {
        $('<div>')
            .addClass('star')
            .css({
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 3}s`
            })
            .appendTo(starsContainer);
    }
}


function initBackgroundSlider() {
    const images = [
        'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
        'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
        'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
        'https://images.pexels.com/photos/2907301/pexels-photo-2907301.jpeg'
    ];

    const slider = $('.background-slider');
    let currentSlide = 0;

    
    images.forEach(img => {
        $('<div>')
            .addClass('slide')
            .css('background', `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img})`)
            .appendTo(slider);
    });

    const slides = $('.slide');
    slides.first().addClass('active');

    
    setInterval(() => {
        slides.eq(currentSlide).removeClass('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides.eq(currentSlide).addClass('active');
    }, 7000);

   
    $(document).on('mousemove', (e) => {
        const { pageX, pageY } = e;
        const xPos = (pageX / window.innerWidth - 0.5) * 20;
        const yPos = (pageY / window.innerHeight - 0.5) * 20;
        slides.css('transform', `translate(${xPos}px, ${yPos}px)`);
    });
}


function initMap() {
    if ($('#map').length) {
        const map = L.map('map').setView([30.0444, 31.2357], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([30.0444, 31.2357])
            .addTo(map)
            .bindPopup('كافيه علاء الدين')
            .openPopup();
    }
}


function validateCode(event) {
    event.preventDefault();
    const code = $(event.target).find('input').val();
    const button = $(event.target).find('button');

    if(code === '123456') {
        playSound('success');
        button
            .css('background', 'rgba(76, 175, 80, 0.8)')
            .html('✨ تم الاتصال بنجاح');
        
        setTimeout(() => {
            window.location.href = "http://wifi.login.success";
        }, 1500);
    } else {
        playSound('error');
        button
            .css('background', 'rgba(244, 67, 54, 0.8)')
            .html('❌ كود غير صحيح');
        
        setTimeout(() => {
            button
                .css('background', 'rgba(212,175,55,0.8)')
                .html('اتصال بالواي فاي');
        }, 1500);
    }
}


function switchToScan() {
    playSound('click');
    $('#scanner-container').show();
    $('#manual-input').hide();
    
    const scanner = new Html5QrcodeScanner("reader", { 
        fps: 10,
        qrbox: 250
    });
    
    scanner.render(onScanSuccess);
}

function switchToManual() {
    playSound('click');
    $('#scanner-container').hide();
    $('#manual-input').show();
}

function onScanSuccess(decodedText) {
    validateCode({
        preventDefault: () => {},
        target: {
            querySelector: () => ({ value: decodedText })
        }
    });
}
