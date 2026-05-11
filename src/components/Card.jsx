import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import starCard from "../assets/img/starCard.png"

export const Card = ({
  type,
  name,
  gender,
  hair,
  eye,
  image,
  uid,
  population,
  orbital_period,
  model,
  manufacturer,
}) => {
  const { store, dispatch } = useGlobalReducer();
  const isFavorite = store.favorites.includes(name);

  return (
 <div className="card starwars-card">
      <img
        src={image || starCard}
        alt={name}
        className="card-img-top starwars-img"
        onError={(e) => {
          e.target.src = starCard;
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        {type === "people" && (
          <>
            <p className="card-text text-white mb-1">
              <strong>Gender: </strong>
              {gender}
            </p>

            <p className="card-text text-white mb-1">
              <strong>Hair Color: </strong>
              {hair}
            </p>

            <p className="card-text text-white mb-1">
              <strong>Eye Color:</strong> {eye}
            </p>
          </>
        )}

        {type === "planets" && (
          <>
            <p className="card-text text-white mb-2">
              <strong>Population:</strong> {population}
            </p>

            <p className="card-text text-white">
              <strong>Orbital Period:</strong> {orbital_period}
            </p>
          </>
        )}

        {type === "vehicles" && (
          <>
            <p className="card-text text-white mb-1">
              <strong>Model:</strong> {model}
            </p>

            <p className="card-text text-white">
              <strong>Manufacturer:</strong> {manufacturer}
            </p>
          </>
        )}

        <div className="d-flex justify-content-between mt-3">
          <Link to={`/single/${type}/${uid}`}>
            <button className="btn btn-outline-secondary">Learn more!</button>
          </Link>

          <button
            className={`btn ${
              isFavorite ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={() =>
              dispatch({
                type: isFavorite ? "remove_favorites" : "add_favorites",
                payload: name,
              })
            }
          >
            <i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </button>
        </div>
      </div>
    </div>
  );
};
