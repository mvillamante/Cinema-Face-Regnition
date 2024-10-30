function changeBg(bg, title) {
    const banner = document.querySelector('.banner');
    const contents = document.querySelectorAll('.content');
    banner.style.background = `url("../images/movies/${bg}")`;
    banner.style.backgroundSize = 'cover';
    banner.style.backgroundPosition = 'center';

    contents.forEach(content => {
        content.classList.remove('active');
        if (content.classList.contains(title)) {
            content.classList.add('active');
        }
    });
}

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

navLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
        link.classList.add("hovered");
    });
    link.addEventListener("mouseleave", () => {
        link.classList.remove("hovered");
    });
});