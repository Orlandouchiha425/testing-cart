import React from "react";
import Pokemon2 from "./Pokemon2.jpeg";
import "./Pokemon.css";
import CarouselPokemon from "./CarouselPokemon";
function Pokemon() {
  return (
    <div>
      <h1>
        <strong>
          <em style={{ color: "red" }}>
            Important! this page is only for viewing/Presentation for now. Is
            not fully functionable!
          </em>
        </strong>
      </h1>

      <img className="img-fluid" src={Pokemon2} />
      <CarouselPokemon />
    </div>
  );
}

export default Pokemon;
