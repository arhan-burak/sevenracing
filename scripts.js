document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isScrolling = false;
    const typedSections = new Set();

    const typeWriter = (element, text, speed, callback) => {
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        };
        type();
    };

    const showSection = (index) => {
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('visible');
                if (!typedSections.has(section)) {
                    const title = section.querySelector('h2');
                    const paragraphs = section.querySelectorAll('p');
                    if (title) {
                        title.innerHTML = ''; // Clear existing text
                        typeWriter(title, title.dataset.text, 100, () => {
                            paragraphs.forEach((p) => {
                                p.classList.add('fade-in'); // Add fade-in class to paragraphs
                            });
                        });
                    }
                    typedSections.add(section);
                }
            } else {
                section.classList.remove('visible');
            }
        });
    };

    const handleScroll = (event) => {
        if (isScrolling) return;

        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Prevent skipping sections by scrolling too fast

        if (event.deltaY > 0) {
            // Scrolling down
            currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        } else {
            // Scrolling up
            currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }
        showSection(currentSectionIndex);
    };

    document.addEventListener('wheel', handleScroll);

    // Show the first section initially
    showSection(currentSectionIndex);
});