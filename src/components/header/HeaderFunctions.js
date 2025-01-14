export const handleScroll = (setNavbarSize, lastScrollY, setLastScrollY) => {
    const scrollThreshold = window.innerHeight / 2;
    const currentScrollY = window.scrollY;

    if (currentScrollY > 20) {
        setNavbarSize('h-20');
    } else {
        setNavbarSize('h-[100px]');
    }

    if (currentScrollY > scrollThreshold) {
        setNavbarSize('h-0 opacity-0');
    }

    if (currentScrollY < lastScrollY && currentScrollY > 20) {
        setNavbarSize('duration-500 h-20 opacity-100');
    }

    setLastScrollY(currentScrollY);
};
