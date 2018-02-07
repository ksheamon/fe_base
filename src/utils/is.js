'use strict';
/* global window, document, module, process, navigator */

// -----------------------------------------
// Functions

/**
 * Gets child by class
 * @param  {element} el
 * @param  {string} class
 * @return {element}
 */
const getChildByClass = (el, className) => {
    for (let i = 0; i < el.childNodes.length; i += 1) {
        const childEl = el.childNodes[i];

        if (!childEl || !childEl.className || !childEl.className.length) {
            continue;
        }

        if (el.childNodes[i].className.indexOf(className) !== -1) {
            return el.childNodes[i];
        }
    }

    return null;
};

/**
 * Check if media is...
 * @param {string} target
 * @return {boolean}
 */
const media = (target) => {
    const mobileEl = getChildByClass(document.body, 'is-mobile');
    const tabletEl = getChildByClass(document.body, 'is-tablet');
    const overEl = getChildByClass(document.body, 'is-over');

    let status = false;

    // Now we need to get the visible status
    switch (target) {
        case 'mobile':
            status = window.getComputedStyle(mobileEl).display !== 'none';
            break;
        case 'tablet':
            status = window.getComputedStyle(tabletEl).display !== 'none';
            break;
        case 'desktop':
            status = window.getComputedStyle(mobileEl).display === 'none' &&
                     window.getComputedStyle(tabletEl).display === 'none';
            break;
        case 'over':
            status = window.getComputedStyle(overEl).display !== 'none';
            break;
        default:
            status = false;
            break;
    }

    return status;
};

/**
 * Check if url is valid
 *
 * @param {string} urlTest
 * @returns {boolean}
 */
const url = (urlTest) => !!(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(urlTest));

/**
 * Is mac
 * @return {Boolean}
 */
const mac = () => {
    let is = !!(/macintosh/i.test(navigator.userAgent.toLowerCase()));
    is = is || !!(/intel\ mac/i.test(navigator.userAgent.toLowerCase()));

    return is;
};

/**
 * Is windows
 * @return {Boolean}
 */
const win = () => !!(/windows/i.test(navigator.userAgent.toLowerCase()));

/**
 * Is it ie?
 * @return {boolean}
 */
const ie = () => !!(navigator.userAgent.toLowerCase().match(/trident\/7\./));

/**
 * Is chrome
 * @return {Boolean}
 */
const chrome = () => !!(/chrome\/\d./i.test(navigator.userAgent.toLowerCase()));

/**
 * Is safari
 * @return {Boolean}
 */
const safari = () => !!(/safari/.test(navigator.userAgent.toLowerCase()));

/**
 * Is edge
 * @return {Boolean}
 */
const edge = () => !!(/edge\/\d./i.test(navigator.userAgent.toLowerCase()));

/**
 * Is android
 * @return {Boolean}
 */
const android = () => !!(navigator.userAgent.toLowerCase().match(/android/));

/**
 * Is ios
 * @return {Boolean}
 */
const ios = () => !!(navigator.userAgent.toLowerCase().match(/(ipod|iphone|ipad)/));

/**
 * Is it mobile?
 * @return {boolean}
 */
const mobile = () => {
    /* eslint-disable max-len */
    if (/Android|Tablet PC|PalmOS|PalmSource|smartphone|GT-P1000|SGH-T849|SHW-M180S|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows CE|Windows Mobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else if (!!(navigator.userAgent.toLowerCase().match(/(mobile)/))) {
        return true;
    }
    /* eslint-enable max-len */

    return false;
};

/**
 * Check if device is touch
 * @return {boolean}
 */
const touch = () => !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);

// ------------------------------------
// Export

export default {
    mobile, touch, media, url,

    // OS tests
    ios,
    android,
    mac,
    win,

    // Browser tests
    ie: () => ie(),
    edge: () => edge() && !ie(),
    safari: () => {
        if (mac()) {
            return !chrome() && safari();
        }

        // DEV: Lets ignore others for now
    },
    chrome: () => {
        if (mac()) {
            return chrome();
        }

        // Other...
        return chrome() && !edge() && !ie();
    }
};
