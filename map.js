const numeros = [1, 3, 5, 6, 7, 9]

const numerosDoble = []

for (var i = 0; i < numeros.length; i++) {
    numerosDoble.push(numeros[i] * 2)
}

console.log(numerosDoble)

const numerosDobleconMap = numeros.map(function (n) {
    return n * 2
})

console.log(numerosDobleconMap)