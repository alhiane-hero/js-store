// dom elements:
const navbar = document.querySelector('.navbar');
const togglerIcon = document.querySelector('.toggler-icon');
const filterBtns = document.querySelectorAll( '.filter-btns li a' );
const carts = document.querySelectorAll('.cart');
const searchItem = document.querySelector('.search-item');
const modal = document.querySelector('.modal');
const lightboxItem = document.querySelector('.lightbox-item');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxControl = document.querySelectorAll('.lightbox-control');

// togglr navbar:
togglerIcon.addEventListener('click', _ => navbar.classList.toggle('toggle'));

// add - remove active class / filter products:
filterBtns.forEach( btn => {
    btn.addEventListener('click', event => {
        // active btn targeted:
        event.preventDefault();
        for ( filterBtn of filterBtns ) {
            filterBtn.classList.remove('active');
        }
        btn.classList.add('active');
        // show target products:
        let dataFilter = event.target.dataset.filter;
        carts.forEach(cart => {
            if (dataFilter === 'all') {
                cart.style.display = 'block';
            } else {
                if (cart.classList.contains(dataFilter)) {
                    cart.style.display = 'block';
                } else {
                    cart.style.display = 'none';
                }
            }
        });
    });
});

// wire up filter search box:
searchItem.addEventListener('input', event => {
    let searchValue = event.target.value.toLowerCase().trim();
    carts.forEach(cart => {
        if (cart.textContent.toLowerCase().includes(searchValue)) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }
    }); 
});

// modal:
let imgsList = document.querySelectorAll('.cart img');
let imgsSrc = [];
let counter = 0;
imgsList.forEach(img => {
    imgsSrc.push(img.src);
});
// show modal:
carts.forEach(cart => {
    cart.addEventListener('click', event => {
        modal.style.display = 'flex';
        let image = cart.querySelector('img');
        lightboxItem.style.backgroundImage = `url(${image.src})`;
        counter = imgsSrc.indexOf(image.src);
    });
});
// close modal 
lightboxClose.addEventListener('click', _ => {
    modal.style.display = 'none';
});
// prev - next btns:
lightboxControl.forEach(item => {
    item.addEventListener('click', _ => { 
        if ( item.classList.contains('btnRight') ) {
            counter++;
            if (counter === imgsSrc.length) counter = 0;
            lightboxItem.style.backgroundImage = `url(${imgsSrc[counter]})`;
        } else {
            counter--;
            if (counter < 0) counter = imgsSrc.length;
            lightboxItem.style.backgroundImage = `url(${imgsSrc[counter]})`;
        }
    });
}); 