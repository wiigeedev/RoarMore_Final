const letters = document.querySelectorAll('.title-letter');

letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        if (letter.classList.contains('bounce')) return;
        letter.classList.add('bounce');

        setTimeout(() => {
            letter.classList.remove('bounce');
        }, 600);
    });
});