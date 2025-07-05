const img = document.getElementById("dog-img");
const options = document.getElementById("options");
const result = document.getElementById("result");
const btnNext = document.getElementById("btn-next");

let correctBreed = "";

// Carrega todas as raças no endpoint breeds
async function loadBreeds() {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/breeds");
    return await response.json();
  } catch (error) {
    alert("Erro ao carregar o quiz. Tente de novo.");
  } 
}

// Cria uma pergunta nova
async function loadRandomQuestion() {
  try {
    const breeds = await loadBreeds();
    const randomBreeds = breeds.sort(() => 0.5 - Math.random());
    const selectionRandomBreeds = randomBreeds.slice(0, 4);
    const correct = selectionRandomBreeds[Math.floor(Math.random() * 4)];

    correctBreed = correct.name;

    const imgResponse = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${correct.id}`);
    const imgData = await imgResponse.json();

    img.src = imgData[0].url;
    loadOptionsNoDom(selectionRandomBreeds);
    result.textContent = "";
  } catch (error) {
    alert("Erro ao carregar o quiz. Tente de novo.");
  }
  
}

// Carrega novos botões com as opções de raça
function loadOptionsNoDom(breeds) {
  options.innerHTML = "";
  breeds.forEach(breed => {
    const btn = document.createElement("button");
    btn.textContent = breed.name;
    btn.addEventListener("click", () => {
        verifyAnswer(breed.name)
    });
    options.appendChild(btn);
  });
}

// Verifica se a opção escolhida é a correta
function verifyAnswer(selected) {
  if (selected === correctBreed) {
    result.textContent = "✅ Acertou!";
    result.style.color = 'green';
  } else {
    result.textContent = `❌ Errou! A resposta certa era: ${correctBreed}`;
    result.style.color = "red";
  }
}

// Chama proxima pergunta
btnNext.addEventListener('click', loadRandomQuestion);

// Chama primeira pergunta
loadRandomQuestion();