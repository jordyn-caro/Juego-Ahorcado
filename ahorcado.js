; (function () {
    'use strict'

    var palabras = [
        "ORACLE",
        "ALURA",
        "FUNCTION",
        "JAVASCRIPT",
        "ESTUDIANTE",
        "PROGRAMAS",
        "LENGUAJES"
    ]


    var juego = null


    var finalizando = false

    var $html = {
        hombre: document.getElementById("hombre"),
        adivina: document.querySelector(".adivina"),
        fallado: document.querySelector(".fallado")
    }


    function dibujar(juego) {

        var $elemento
        $elemento = $html.hombre

        var estado = juego.estado
        if (estado === 8) {
            estado = juego.previo
        }

        $elemento.src = "img/0" + estado + ".png"


        var palabra = juego.palabra
        var adivina = juego.adivina
        $elemento = $html.adivina


        $elemento.innerHTML = ""
        for (let letra of palabra) {
            let $span = document.createElement("span")
            let $texto = document.createTextNode("")
            if (adivina.has(letra)) {
                $texto.nodeValue = letra
            }

            $span.setAttribute("class", "letra adivinada")
            $span.appendChild($texto)
            $elemento.appendChild($span)
        }


        var fallado = juego.fallado
        $elemento = $html.fallado


        $elemento.innerHTML = ""
        for (let letra of fallado) {
            let $span = document.createElement("span")
            let $texto = document.createTextNode(letra)
            $span.setAttribute("class", "letra fallida")
            $span.appendChild($texto)
            $elemento.appendChild($span)
        }
    }


    function adivinar(juego, letra) {
        var estado = juego.estado


        if (estado === 1 || estado === 8) {
            return
        }

        var adivina = juego.adivina
        var fallado = juego.fallado


        if (adivina.has(letra) || fallado.has(letra)) {
            return
        }

        var palabra = juego.palabra
        var letras = juego.letras


        if (letras.has(letra)) {

            adivina.add(letra)


            juego.restante--


            if (juego.restante === 0) {
                juego.previo = juego.estado
                juego.estado = 8
            }
        } else {

            juego.estado--


            fallado.add(letra)
        }
    }

    window.onkeypress = function adivinarLetra(e) {
        var letra = e.key
        letra = letra.toUpperCase()
        if (/[^A-ZÑ]/.test(letra)) {
            return
        }

        adivinar(juego, letra)
        var estado = juego.estado
        if (estado === 8 && !finalizando) {
            setTimeout(alertaGanador, 0)
            finalizando = true
        } else if (estado === 1 && !finalizando) {

            let palabra = juego.palabra
            let fn = alertaPerdido.bind(undefined, palabra)
            setTimeout(fn, 0)
            finalizando = true
        }
        dibujar(juego)
    }

    window.nuevoJuego = function nuevoJuego() {
        var palabra = palabraAleatoria()
        juego = {}
        juego.palabra = palabra
        juego.estado = 7
        juego.adivina = new Set()
        juego.fallado = new Set()
        finalizando = false

        var letras = new Set()
        for (let letra of palabra) {
            letras.add(letra)
        }
        juego.letras = letras
        juego.restante = letras.size

        dibujar(juego)
        console.log(juego)
    }

    function palabraAleatoria() {
        var index = ~~(Math.random() * palabras.length)
        return palabras[index]
    }

    function alertaGanador() {
        alert("Felicidades, ganaste!")
    }

    function alertaPerdido(palabra) {
        alert("Lo siento, perdiste... la palabra era: " + palabra)
    }

    nuevoJuego()
}())