// content.js

// =========== YNET ===========
const YNET_BADWORD = "בשיתוף"

const filterYnet = () => {
    removeFromTextDiv();
    removeAllSlotViews();
    removeMultiImages1280Componenta();
    removeMultiImages1280Componenta();
};

const removeFromTextDiv = () => {
    const elements = document.getElementsByClassName('textDiv');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.innerText.includes(YNET_BADWORD)) {
            recursiveRemoveEmptyParents(element);
        }
    }
}

const recursiveRemoveEmptyParents = (element) => {
    if (element.parentNode.className.includes('commertial')) {
        recursiveRemoveEmptyParents(element.parentNode);
    }
    else {
        element.parentNode.removeChild(element);
    }
}

const removeAllSlotViews = () => {
    const elements = document.getElementsByClassName('slotView');
    removeAllSponsoredElements(elements);
}

const removeMultiImages1280Componenta = () => {
    const elements = document.getElementsByClassName('MultiImages1280Componenta');
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        console.log(elements[i].outerHTML);
        if (elements[i].innerHTML.includes(YNET_BADWORD) || elements[i].outerHTML.includes(YNET_BADWORD) ) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }
}

const removeAllSponsoredElements = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const children = element.childNodes;
        for (let j = 0; j < children.length; j++) {
            const child = children[j];
            if (child.innerText.includes(YNET_BADWORD)) {
                element.parentNode.removeChild(element);
            }
        }
    }
}
// =========================


// ========= MAKO ==========
const MAKO_BADWORD = 'ממומן'
const filterMako = () => {
    removeByClassname('ob-dynamic-rec-container')
    removeByClassname('ob-widget-items-container')
    removeByClassname('ob-widget')
    removeByClassname('mako_main_portlet_container')
    // removeByTag('li')
}

const removeByClassname = (className) => {
    const elements = document.getElementsByClassName(className);
    removeSponsoredElements(elements);
}

const removeByTag = (tagName) => {
    const elements = document.getElementsByTagName(tagName);
    removeSponsoredElements(elements);
}

const removeSponsoredElements = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML.includes(MAKO_BADWORD)) {
            console.log('found bad word')
            elements[i].parentNode.removeChild(elements[i]);
        }
    }
}

// =========================

const currentURL = window.location.href;
if (currentURL.includes('ynet')) {
    filterYnet();
} if (currentURL.includes('mako')) {
    setTimeout(() => {
        // need timeout since the ads are created in few seconds delay
        filterMako();
      }, 5000);
}