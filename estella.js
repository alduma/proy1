document.querySelectorAll('.star i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-value');
        saveRating(rating);
        highlightStars(rating);
    });
});

function saveRating(rating) {
    // Aquí podrías enviar la calificación al servidor o guardarla en el almacenamiento local
    console.log('Calificación guardada:', rating);
}

function highlightStars(rating) {
    document.querySelectorAll('.star i').forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.style.color = 'gold'; // Cambia el color de las estrellas calificadas
        } else {
            star.style.color = ''; // Restablece el color de las estrellas no calificadas
        }
    });
}