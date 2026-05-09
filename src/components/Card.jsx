import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Card = ({
  type,
  name,
  gender,
  hair,
  eye,
  image,
  uid,
  description1,
  description2,
}) => {
  const { dispatch } = useGlobalReducer();

  return (
    <div className="card starwars-card">
      <img
        src={image}
        alt={name}
        className="card-img-top starwars-img"
        onError={(e) => {
          e.target.src = "https://placehold.co/400x300?text=Star+Wars";
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        {type === "people" && (
          <>
            <p className="card-text mb-1">Gender: {gender}</p>

            <p className="card-text mb-1">Hair Color: {hair}</p>

            <p className="card-text">Eye Color: {eye}</p>
          </>
        )}

        {type !== "people" && (
          <>
            <p className="card-text mb-1">{description1}</p>

            <p className="card-text">{description2}</p>
          </>
        )}

        <div className="d-flex justify-content-between mt-3">
          <Link to={`/single/${type}/${uid}`}>
            <button className="btn btn-outline-primary">Learn more!</button>
          </Link>

          <button
            className="btn btn-outline-warning"
            onClick={() =>
              dispatch({
                type: "add_favorites",
                payload: name,
              })
            }
          >
            ♡
          </button>
        </div>
      </div>
    </div>
  );
};
