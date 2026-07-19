const n = 5; 
var tries = 0;
var black = 0;
var white = 0;
var tableauUnique =[];
var tmp =[];

const numbers = window.generatedNumbers || tableauUnique;
 

function remplirTableauUnique(max, n) {
  if (!Number.isInteger(max) || !Number.isInteger(n) || max <= 0 || n <= 0) {
    throw new Error('max et n doivent être des entiers positifs');
  }
  if (n > max) {
    throw new Error('n ne peut pas être supérieur à max');
  }

  const resultat = [];
  const disponibles = Array.from({ length: max }, (_, i) => i);

  for (let i = 0; i < n; i += 1) {
    const index = Math.floor(Math.random() * disponibles.length);
    resultat.push(disponibles.splice(index, 1)[0]);
  }

  return resultat;
}

function resetTokens() {
  black = 0;
  white = 0;
  tmp =[];
}

function checkInput(input,guess) {
 
const submitButton = document.getElementById('submitGuess');
  tries++;
 
      console.log('Tableau unique généré :', tableauUnique);
      console.log('Input utilisateur :', input);
  for (let i = 0; i < input.length; i++) {

    for (let j = 0; j < guess.length; j++) {
    if (input[i] === guess[j]) {
      if (tmp.includes(input[i])) {
        if (i === j) {
        black++;
        white--;
      } 
        continue; // Ignore les doublons
      }
      else{
      if (i === j) {
        black++;
      } else {
        white++;
      }
      }
      
    }
  }
  tmp.push(input[i]);
  
} 
if(black === n) {
    alert("Félicitations ! Vous avez trouvé la combinaison !");
      const grid = document.getElementById('grid');
      tableauUnique.forEach((num) => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell-result';
        cell.textContent = num;
        grid.appendChild(cell);
      });
      submitButton.disabled = true; // Désactive le bouton après la victoire
    return;
  }
 if(tries > 8){
    alert("Vous avez dépassé le nombre d'essais autorisés !");
     const grid = document.getElementById('grid');
      tableauUnique.forEach((num) => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell-wrong';
        cell.textContent = num;
        grid.appendChild(cell);
      });
submitButton.disabled = true; // Désactive le bouton après la défaite. 
    return;
  }
}



function submitGuess() {
  
    var input= [];
    console.log('Tableau unique généré :', tableauUnique);
    for (let i = 0; i < n; i++) {
        const guessInput = document.getElementsByName(`guess${i + 1}`)[0];
        if (!guessInput) {
            console.warn(`Element #guess${i + 1} introuvable`);
            continue;
        }
        const guess = parseInt(guessInput.value);
        input.push(guess);
    }


    const numbers = window.generatedNumbers || input;
      const grid = document.getElementById('gridInputs');
      const gridN= document.createElement('div');
      gridN.className = 'grid';
      gridN.id='grid';

      numbers.forEach((num) => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = num;
        gridN.appendChild(cell);
      });

      checkInput( input, tableauUnique);


      const conclusion = document.createElement('div');
      conclusion.className = 'grid-cell';
      conclusion.innerHTML = black+" x &#9899;  <br/>"+white+" x &#9898;"; // Cercle noir
      gridN.appendChild(conclusion);
            grid.prepend(gridN);
      grid.prepend(document.createElement('br')); // Ajoute une ligne de séparation
      resetTokens();

}

function Main() {
  const max = 10; // Valeur maximale pour les nombres aléatoires
     // Nombre d'éléments uniques à générer

  try {
     tableauUnique = remplirTableauUnique(max, n);

    var tableau= []; // Exemple de tableau à convertir en chaîne
  
    const gridInput = document.getElementById('gridInput');
    for (let i = 0; i < n; i++) {
        console.log(`Élément ${i} : ${tableau[i]}`);
        const select = document.createElement('select');
        select.name = `guess${i + 1}`;
        for (let j = 0; j < max; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.textContent = j;
            select.appendChild(option);
        }
        gridInput.appendChild(select);
    }
    const buttonGuess = document.createElement('button');
    buttonGuess.className = 'btn-valider-icone';
    buttonGuess.id = 'submitGuess';
    buttonGuess.innerHTML = '&#10004;';
    gridInput.appendChild(buttonGuess);


const submitButton = document.getElementById('submitGuess');

    if (submitButton) {
      submitButton.addEventListener('click', submitGuess);
    }

  } catch (error) {
    console.error(error.message);
  }
}

// Appel de la fonction Main pour exécuter le code
Main();

