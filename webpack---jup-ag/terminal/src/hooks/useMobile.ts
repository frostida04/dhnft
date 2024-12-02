"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMobile = void 0;
const react_1 = require("react");
const react_use_1 = require("react-use");
const useMobile = () => {
    const [isDesktop, setIsDesktop] = (0, react_1.useState)(false);
    (0, react_use_1.useIsomorphicLayoutEffect)(() => {
        function updateSize() {
            const desktopQuery = window.matchMedia('(min-width: 1024px)');
            setIsDesktop(desktopQuery.matches);
        }
        // Initial check
        updateSize();
        // Listen to resize events
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    // Initially, the state will be false (indicating non-desktop)
    // until the effect runs on the client side.
    return !isDesktop;
};
exports.useMobile = useMobile;
