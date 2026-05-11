import React, { useEffect } from "react";
import { Card } from "../components/Card";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const getData = async () => {
      try {
        const peopleResponse = await fetch(
          "https://www.swapi.tech/api/people?page=1&limit=6",
        );

        if (!peopleResponse.ok) {
          throw new Error("Error loading people");
        }

        const peopleData = await peopleResponse.json();

        dispatch({
          type: "get_people",
          payload: peopleData.results,
        });

        const planetsResponse = await fetch(
          "https://www.swapi.tech/api/planets?page=1&limit=6",
        );

        if (!planetsResponse.ok) {
          throw new Error("Error loading planets");
        }

        const planetsData = await planetsResponse.json();

        dispatch({
          type: "get_planets",
          payload: planetsData.results,
        });

        const vehiclesResponse = await fetch(
          "https://www.swapi.tech/api/vehicles?page=1&limit=6",
        );

        if (!vehiclesResponse.ok) {
          throw new Error("Error loading vehicles");
        }

        const vehiclesData = await vehiclesResponse.json();

        dispatch({
          type: "get_vehicles",
          payload: vehiclesData.results,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container-fluid bg-dark min-vh-100 text-light">
      <div className="section container py-4">
        <h1 className="text-warning mb-4">
          <strong>Characters</strong>
        </h1>

        <div className="d-flex overflow-auto flex-nowrap gap-3 pb-3">
          {store.people.map((item) => (
            <Card
              key={item.uid}
              type="people"
              name={item.name}
              uid={item.uid}
              image={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
            />
          ))}
        </div>
      </div>

      <div className="section container py-4">
        <h1 className="text-warning mb-4">
          <strong>Planets</strong>
        </h1>

        <div className="d-flex overflow-auto flex-nowrap gap-3 pb-3">
          {store.planets.map((item) => (
            <Card
              key={item.uid}
              type="planets"
              name={item.name}
              uid={item.uid}
              image={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
            />
          ))}
        </div>
      </div>

      <div className="section container py-4">
        <h1 className="text-warning mb-4">
          <strong>Vehicles</strong>
        </h1>

        <div className="d-flex overflow-auto flex-nowrap gap-3 pb-3">
          {store.vehicles.map((item) => (
            <Card
              key={item.uid}
              type="vehicles"
              name={item.name}
              uid={item.uid}
              image={`https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
