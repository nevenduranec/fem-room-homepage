import './styles/index.scss';

const hambyToggle = document.querySelector('[data-js-mainnav]');
const hamby = document.querySelector('.MainNav-hamby');
const nav = document.querySelector('#primary-menu');

hambyToggle.addEventListener('click', () => {
    let expanded =
        hambyToggle.getAttribute('aria-expanded') === 'true' ||
        false;
    hambyToggle.setAttribute('aria-expanded', !expanded);

    hamby.classList.toggle('is-active');
    nav.classList.toggle('is-block');

    setTimeout(() => {
        nav.classList.toggle('is-active');
    });
});

// Hero content changer
const hero = document.querySelector('.Hero');
const visuals = document.querySelector('.Hero-visuals');
const slides = document.querySelector('.Hero-contentInner').querySelectorAll('div');
const images = document.querySelector('.Hero-visualsInner').querySelectorAll('picture');
const buttons = visuals.querySelectorAll('button');
const prev = visuals.querySelector('#prev');
const next = visuals.querySelector('#next');

let activeSlide = 0;
let height = 0;
let slideElem;

slides.forEach(slide => {
    const slideHeight = slide.offsetHeight;

    if (slideHeight > height) {
        slideElem = slide;
        height = slideHeight;
    }

    let a = slide.querySelector('a');
    if (!slide.classList.contains('is-active')) {
        a.setAttribute('tabindex', '-1');
    } else {
        a.removeAttribute('tabindex', '-1');
    }
});

slides.forEach(slide => {
    slide.classList.remove('is-relative');
});

slideElem.classList.add('is-relative');

setTimeout(() => {
    slides.forEach(slide => {
        slide.classList.add('has-transition');
    });
}, 200);

const slideTo = (dir) => {

    if (dir === 'next') {
        if (activeSlide === 2) {
            activeSlide = -1;
        }
        activeSlide++;
    } else {
        if (activeSlide === 0) {
            activeSlide = 3;
        }
        activeSlide--;
    }

    slides.forEach(slide => {
        slide.classList.remove('is-active');
    });

    images.forEach(image => {
        image.classList.remove('is-active');
    });

    slides[activeSlide].classList.add('is-active');
    images[activeSlide].classList.add('is-active');

    const source = images[activeSlide].querySelector('source');
    source.setAttribute('srcset', source.getAttribute('data-srcset'));

    const img = images[activeSlide].querySelector('img');
    img.setAttribute('srcset', img.getAttribute('data-srcset'));

    slides.forEach(slide => {
        let a = slide.querySelector('a');
        if (!slide.classList.contains('is-active')) {
            a.setAttribute('tabindex', '-1');
        } else {
            a.removeAttribute('tabindex', '-1');
        }
    });
};

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const dir = button.getAttribute('id');
        slideTo(dir);
    }, false);
});


hero.addEventListener('keydown', (e) => {
    if(e.keyCode === 39) { // next
        next.click();
    } else if(e.keyCode === 37) { // prev
        prev.click();
    }
})

if (module.hot) {
    module.hot.accept()
}
