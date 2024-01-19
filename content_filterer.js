// ======= general functions =========

const BADWORDS = ['ממומן', 'בשיתוף']

const removeByTags = (tagName) => {
    const elements = document.getElementsByTagName(tagName);
    removeBadwordsElements(elements);
}

const removeByClassname = (className) => {
    const elements = document.getElementsByClassName(className);
    removeBadwordsElements(elements)
}

const removeBadwordsElements = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        if (BADWORDS.some(word => elements[i].innerHTML.includes(word))) {
            elements[i].parentNode.removeChild(elements[i]);
            console.log('Deleted a sponsored article')
        }
    }
}

// ========= MAKO ==========

const filterMako = () => {
    removeByClassname('ob-dynamic-rec-container')
    removeByClassname('ob-widget-items-container')
    removeByClassname('ob-widget')
    removeByClassname('mako_main_portlet_container')
}

// ========= N12 ===========

const filterN12 = () => {
    removeByTags('li')
    removeByClassname('ob-dynamic-rec-container')
    setInterval(() => {
        removeByTags('li')
        removeByClassname('ob-dynamic-rec-container')
    }, 10000);
}



// =========== YNET ===========
// Ynet is more complicated, so it got a section of its own.


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
        if (BADWORDS.some(word => element.innerHTML.includes(word))) {
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

const removeAllSponsoredElements = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const children = element.childNodes;
        for (let j = 0; j < children.length; j++) {
            const child = children[j];
            if (BADWORDS.some(word => child.innerText.includes(word))) {
                element.parentNode.removeChild(element);
            }
        }
    }
}

const removeMultiImages1280Componenta = () => {
    const elements = document.getElementsByClassName('MultiImages1280Componenta');
    for (let i = 0; i < elements.length; i++) {
        if (BADWORDS.some(word => elements[i].innerHTML.includes(word))) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }
}


// ==========================


const main = () => {
    const currentURL = window.location.href;
    console.log("running filterer...")
    if (currentURL.includes('ynet')) {
        filterYnet();
    } else if (currentURL.includes('mako')) {
        setTimeout(() => {
            // need timeout since the ads are created in few seconds delay
            filterMako();
        }, 5000);
    } else if (currentURL.includes('n12')) {
        setTimeout(() => {
            filterN12();
        }, 5000);
    }
}

main()