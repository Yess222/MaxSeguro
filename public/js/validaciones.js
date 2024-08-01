

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var mensajeAlerta = document.getElementById('mensajeAlerta');
        if (mensajeAlerta) {
            mensajeAlerta.remove();
        }
    }, 4000);
});