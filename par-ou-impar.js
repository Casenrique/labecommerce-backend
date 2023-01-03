const userEvenOrOdd = process.argv[2].toLowerCase()
const userNumber = Number(process.argv[3])
let computerEvenOrOdd = ""
let gameEvenOrOdd = ""

if(!userEvenOrOdd || !userNumber){
    console.log("Digite se seu número é par ou ímpar e/ou seu número entre 0 e 10.")
}else{

    if(userEvenOrOdd === "par"){
        computerEvenOrOdd = "ímpar"
    } else {
        computerEvenOrOdd = "par"
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
      
    const computerNumber = getRndInteger(0, 10)
    console.log(computerNumber)

    const gameNumber = userNumber + computerNumber
    console.log(gameNumber)

    if (gameNumber % 2 === 0) {
        gameEvenOrOdd = 'par' 
    } else {
        gameEvenOrOdd = 'ímpar'
    }

    if ((gameEvenOrOdd === 'par' && userEvenOrOdd === "par") || (gameEvenOrOdd === 'ímpar' && userEvenOrOdd === "ímpar") ){         
        console.log(`Você escolheu ${userEvenOrOdd} e o computador ${computerEvenOrOdd}.
        Você escolheu o número ${userNumber} e o computador ${computerNumber}.
        O resultado foi ${gameEvenOrOdd}. Você ganhou!
        `)
    } else if ((gameEvenOrOdd === 'par' && userEvenOrOdd === "ímpar") || (gameEvenOrOdd === 'ímpar' && userEvenOrOdd === "par") ) {
        console.log(`Você escolheu ${userEvenOrOdd} e o computador ${computerEvenOrOdd}.
        Você escolheu o número ${userNumber} e o computador ${computerNumber}.
        O resultado foi ${gameEvenOrOdd}. Você perdeu!
        `)
    // } else if (gameEvenOrOdd === 'ímpar' && userEvenOrOdd === "ímpar") {
    //     console.log(`Você escolheu ${userEvenOrOdd} e o computador ${computerEvenOrOdd}.
    //     Você escolheu o número ${userNumber} e o computador ${computerNumber}.
    //     O resultado foi ${gameEvenOrOdd}. Você ganhou!
    //     `)
    // } else if (gameEvenOrOdd === 'ímpar' && userEvenOrOdd === "par") {
    //     console.log(
    //     `Você escolheu ${userEvenOrOdd} e o computador ${computerEvenOrOdd}.
    //     Você escolheu o número ${userNumber} e o computador ${computerNumber}.
    //     O resultado foi ${gameEvenOrOdd}. Você perdeu!
    //     `)
    }   
}