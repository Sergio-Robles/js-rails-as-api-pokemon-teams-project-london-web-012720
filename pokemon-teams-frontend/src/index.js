
document.addEventListener("DOMContentLoaded", () => {
    
    const BASE_URL = "http://localhost:3000/";
    const pokemonsUrl = BASE_URL + "pokemons/";
    const trainersUrl = BASE_URL + "trainers/";

    const main = document.querySelector("main");

    const fetchAllTrainers = () => {
        return fetch(trainersUrl)
        .then((resp) => resp.json())
        .then((trainers) => renderTrainers(trainers))
    };
    // fetchAllTrainers().then(renderAllTrainers)
    const renderTrainers = (trainers) => {
        console.log(trainers)
        trainers.forEach(renderTrainer)
    };

    const renderTrainer = (trainer) => {

    const divCard = document.createElement("div");
        divCard.className = "card";

        const name = document.createElement("p");
        name.innerText = trainer.name;
    
        const dataTrainerButton = document.createElement("button");
        dataTrainerButton.innerText = "Add Pokemon";

        dataTrainerButton.addEventListener("click", (event) => {
            handleFormSubmit(event, trainer, divCard);
        });

        divCard.append(name, dataTrainerButton);
        renderTrainerPokemon(divCard, trainer)
        main.append(divCard);
    }

    const renderTrainerPokemon = (divCard, trainer) => {

    const prevUl = divCard.querySelector("ul")
    if (prevUl) {
    prevUl.remove()
    }

    const unorderedListTrainers = document.createElement("ul");

    trainer.pokemons.forEach((pokemon) => {

        const listOfPokemon = document.createElement("li");
        listOfPokemon.innerText = `${pokemon.nickname}(${pokemon.species})`;

        const releaseButton = document.createElement("button");
        releaseButton.className = "release";
        releaseButton.innerText = "Release";
        releaseButton.addEventListener("click", (event, trainer) => {
            event.preventDefault()

            fetch(`${pokemonsUrl}/${pokemon.id}`, {
                method: "DELETE",
            }).then(() => listOfPokemon.remove())
        });

        listOfPokemon.append(releaseButton);
        unorderedListTrainers.append(listOfPokemon);

    })
        divCard.append(unorderedListTrainers)
    };

    const handleFormSubmit = (event, trainer, divCard) => {
    event.preventDefault();

        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                trainer_id: trainer.id,
            }),
        };

        fetch(pokemonsUrl, configObject)
        .then((resp) => resp.json())
        .then((pokemon) => {
            trainer.pokemons.push(pokemon)
            console.log(trainer)
        renderTrainerPokemon(divCard, trainer)
        });
    };

    fetchAllTrainers();
});