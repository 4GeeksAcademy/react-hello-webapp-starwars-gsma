import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
  const { uid, type } = useParams();

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const response = await fetch(
          `https://www.swapi.tech/api/${type}/${uid}`,
        );

        const data = await response.json();

        if (data.result) {
          setCharacter(data.result.properties);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCharacter();
  }, [uid, type]);

  if (!character) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={`https://starwars-visualguide.com/assets/img/${
              type === "people" ? "characters" : type
            }/${uid}.jpg`}
            alt={character.name}
            className="img-fluid rounded single-img"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x400?text=Star+Wars";
            }}
          />
        </div>

        <div className="col-md-6">
          <h1 className="single-title">{character.name}</h1>

          <p className="mt-3 text-secondary">
            Explore detailed information about {character.name}
            from the Star Wars universe.
          </p>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row text-danger text-center">
        {type === "people" && (
          <>
            <div className="col">
              <h6>Name</h6>
              <p>{character.name}</p>
            </div>

            <div className="col">
              <h6>Birth Year</h6>
              <p>{character.birth_year}</p>
            </div>

            <div className="col">
              <h6>Gender</h6>
              <p>{character.gender}</p>
            </div>

            <div className="col">
              <h6>Height</h6>
              <p>{character.height}</p>
            </div>

            <div className="col">
              <h6>Skin Color</h6>
              <p>{character.skin_color}</p>
            </div>

            <div className="col">
              <h6>Eye Color</h6>
              <p>{character.eye_color}</p>
            </div>
          </>
        )}

        {type === "planets" && (
          <>
            <div className="col">
              <h6>Name</h6>
              <p>{character.name}</p>
            </div>

            <div className="col">
              <h6>Climate</h6>
              <p>{character.climate}</p>
            </div>

            <div className="col">
              <h6>Population</h6>
              <p>{character.population}</p>
            </div>

            <div className="col">
              <h6>Orbital Period</h6>
              <p>{character.orbital_period}</p>
            </div>

            <div className="col">
              <h6>Rotation Period</h6>
              <p>{character.rotation_period}</p>
            </div>

            <div className="col">
              <h6>Diameter</h6>
              <p>{character.diameter}</p>
            </div>
          </>
        )}

        {type === "vehicles" && (
          <>
            <div className="col">
              <h6>Name</h6>
              <p>{character.name}</p>
            </div>

            <div className="col">
              <h6>Model</h6>
              <p>{character.model}</p>
            </div>

            <div className="col">
              <h6>Passengers</h6>
              <p>{character.passengers}</p>
            </div>

            <div className="col">
              <h6>Vehicle Class</h6>
              <p>{character.vehicle_class}</p>
            </div>

            <div className="col">
              <h6>Manufacturer</h6>
              <p>{character.manufacturer}</p>
            </div>

            <div className="col">
              <h6>Cost</h6>
              <p>{character.cost_in_credits}</p>
            </div>
          </>
        )}
      </div>

      <Link to="/">
        <button className="btn btn-secondary mt-5">Back home</button>
      </Link>
    </div>
  );
};
