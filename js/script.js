// Consegna
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// Inserisco il button che farà partire il gioco in una variabile
let gameStartBtn = document.getElementById('play_btn')

// Parte il gioco
gameStartBtn.addEventListener('click', startGame)
function startGame() {
    // Seleziono la griglia
    const grid = document.querySelector('.grid')

    // Resetto la griglia all'inizio della partita
    grid.innerHTML = ''
    // Definisco in numberOfBombs il numero di bombe presenti nel campo minato
    const numberOfBombs = 16;

    // Inserisco il valore del selettore della difficoltà in una variabile
    let gameLevel = document.getElementById('difficulty').value
    
    // Definisco maxRange e gridClass
    let maxRange
    let gridClass
    let minRange = 1

    if (gameLevel === 'easy') {
        maxRange = 100
        gridClass = 'easy'
    } else if (gameLevel === 'hard') {
        maxRange = 81
        gridClass = 'hard'
    } else if (gameLevel === 'crazy') {
        maxRange = 49
        gridClass = 'crazy'
    }
    
    // Creo le bombe
    // Funzione che popola l'array di bombe
    function bombsGenerator(bombsNumber, min, max) {
        // Creo un array contenente le bombe
        let bombsArray = []
        while(bombsArray.length < 16) {
            const randomNumber = getRndInteger(minRange, maxRange);
            // Pusho il numero creato in bombsArray solo se non è già presente
            if(!bombsArray.includes(randomNumber)) {
                bombsArray.push(randomNumber);
            }
                
            }

            return bombsArray;
        }
    let bombs = bombsGenerator(numberOfBombs, 1, maxRange)
    console.log(bombs)
    // Definisco il numero massimo di tentativi possibili e lo salvo in una variabile
    let maxAttempts = maxRange - numberOfBombs
    
    // Creo una variabile per salvare i numeri dati dall'utente
    // let userNumber
    // Creo un array contenente le bombe
    let bombsArray = []
    console.log(bombsArray)
    // Creo un array vuoto che conterrà i numeri che non sono bombe per tener traccia del numero di tentativi fatti dall'utente
    let correctNumbers = []

    // Genero la griglia
    // Funzione che popola la griglia
    function gridGenerator() {
        grid.classList.add(gridClass)

        // Creo i numeri da 1 a maxRange
        for(let i = 1; i <= maxRange; i++) {
            // Creo i singoli quadrati
            const newSquare = document.createElement('div');
            newSquare.innerHTML = `<span>${i}</span>`;
            newSquare.classList.add('square');
            newSquare.addEventListener('click', manageSquareClick);

            // Appendo gli squares appena creati a grid
            grid.append(newSquare);
        }
            
    }
    gridGenerator()

    // Funzione che gestisce il click sugli squares
    function manageSquareClick() {
        // Seleziono il singolo numero all'interno dello square cliccato
        let squareNumber = parseInt(this.querySelector('span').innerHTML);

        if (bombs.includes(squareNumber)) {
            this.classList.add('bomb')
            alert('Hai perso') 
            alert('il tuo punteggio è: ' + correctNumbers.length)
        } else {
            this.classList.add('not_a_bomb')
            if (!correctNumbers.includes(squareNumber)) {
                correctNumbers.push(squareNumber)
            }

            if (correctNumbers.length === maxAttempts) {
                alert('Complimenti, hai vinto!')
            }
            
        }
    }

}

// Funzione che genera numeri random da minRange a maxRange
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

