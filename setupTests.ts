window.matchMedia = function () {
    return {
        addEventListener: () => { },
        dispatchEvent: () => false,
        matches: false,
        media: "",
        onchange: null,
        removeEventListener: () => { },
        addListener: () => { },
        removeListener: () => { }
    }
}