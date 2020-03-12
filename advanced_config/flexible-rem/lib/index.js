((document, window) => {
    const resizeEvent = "orientationchange" in window ? 'orientationchange' : 'resize';
    const dom = document.documentElement;
    const designWidth = 750;
    const handleResize = () => {
        const clientWidth = dom.clientWidth;
        dom.style.fontSize = (clientWidth / designWidth) * 100 + 'px';
    }

    // initial fontSize
    handleResize();
    
    window.addEventListener(resizeEvent, handleResize);
    dom.addEventListener('DOMContentLoaded', handleResize);
})(document, window)