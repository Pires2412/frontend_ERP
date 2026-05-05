let menuIcons = document.querySelectorAll('.menu__item');
let buttonClean = document.querySelector('.controlPanel__clean');
let buttonNewItem = document.querySelector('.controlPanel__newItem')

function hoverElement(element, cssClass) {
    element.classList.toggle(cssClass)
};

function hoverTooltip(elementNode, cssClass) {

}

function hoverInternElement(elementNode, internElementClass, cssClass) {
    let internNode = elementNode.querySelector(internElementClass)
    internNode.classList.toggle(cssClass)
};

menuIcons.forEach(element => {
    element.addEventListener('mouseenter', () => {
        hoverInternElement(element, '.menu__iconwrapper','menu__iconwrapper--hovered')
    } )
});

menuIcons.forEach(element => {
    element.addEventListener('mouseleave',() =>{ 
        hoverInternElement(element, '.menu__iconwrapper','menu__iconwrapper--hovered')
    })
});

