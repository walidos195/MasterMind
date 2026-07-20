var n = 5; 
var tries = 0;
var black = 0;
var white = 0;
var tableauUnique =[];
var tmp =[];
var max= 8; // Valeur maximale pour les nombres aléatoires
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

function resetGame() {
  black = 0;
  white = 0;
  tmp =[];
  tries = 0;
  tableauUnique =[];
  tmp =[];
  const submitButton = document.getElementById('submitGuess');
  submitButton.remove(); // Remove the previous submit button if it exists
  const gridInput = document.getElementById('gridInput');
  gridInput.innerHTML = ''; // Clear the grid input
  gridInput.remove(); // Remove the previous grid input if it exists
  const grid = document.getElementById('gridInputs');
  if (grid) {
    grid.remove(); // Remove the previous grid if it exists
  }
    
  const grid2 = document.getElementById('grid');
  if (grid2) {
    grid2.remove(); // Remove the previous grid if it exists
  }
  Main(); // Reinitialize the game
}
function checkInput(input,guess) {
 
const submitButton = document.getElementById('submitGuess');
  tries++;
 
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
      const grid = document.createElement('div');
      grid.id = 'grid';
      grid.className = 'grid';
      document.getElementById('resultat').prepend(grid);
      
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
          const grid = document.createElement('div');
      grid.id = 'grid';
      grid.className = 'grid';
      document.getElementById('resultat').prepend(grid);
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

function submitDifficulty() {
  const difficultySelect = document.getElementById('difficulty');
  const selectedDifficulty = difficultySelect.value;
  switch (selectedDifficulty) {
    case 'easy':
      console.log('Mode facile sélectionné');
      n = 4; // Nombre d'éléments uniques pour le mode facile
      max = 6; // Valeur maximale pour le mode facile
      break;
    case 'medium':
      console.log('Mode moyen sélectionné');
      n = 5; // Nombre d'éléments uniques pour le mode moyen
      max = 8; // Valeur maximale pour le mode moyen
      break;
    case 'hard':
      console.log('Mode difficile sélectionné');
      n = 6; // Nombre d'éléments uniques pour le mode difficile
      max = 10; // Valeur maximale pour le mode difficile
      break;
    default:
      n = 5; // Valeur par défaut si aucune difficulté n'est sélectionnée
  }

  resetGame(); // Réinitialise le jeu avec la nouvelle difficulté
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

function Main() { // Valeur maximale pour les nombres aléatoires
     // Nombre d'éléments uniques à générer

  try {
     tableauUnique = remplirTableauUnique(max, n);

    var tableau= []; // Exemple de tableau à convertir en chaîne
  
    const gridInput = document.createElement('div');
    gridInput.className = 'grid';
    gridInput.id = 'gridInput';
    document.body.getElementsByClassName('container')[0].appendChild(gridInput);
       const resultat = document.createElement('div');

    resultat.id = 'resultat';
    document.body.getElementsByClassName('container')[0].appendChild(resultat);
    const gridInputs = document.createElement('div');
    
    gridInputs.id = 'gridInputs';
    document.body.getElementsByClassName('container')[0].appendChild(gridInputs);

    for (let i = 0; i < n; i++) {
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
const submitDifficultyButton = document.getElementById('submitDifficulty');

    if (submitDifficultyButton) {
      submitDifficultyButton.addEventListener('click', submitDifficulty);
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Appel de la fonction Main pour exécuter le code
Main();

