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

        const peopleData = await peopleResponse.json();

        const peopleWithDetails = await Promise.all(
          peopleData.results.map(async (person) => {
            const response = await fetch(person.url);

            const data = await response.json();

            return {
              ...person,
              gender: data.result.properties.gender,
              hair_color: data.result.properties.hair_color,
              eye_color: data.result.properties.eye_color,
            };
          }),
        );

        dispatch({
          type: "get_people",
          payload: peopleWithDetails,
        });

     
        const planetsResponse = await fetch(
          "https://www.swapi.tech/api/planets?page=1&limit=6",
        );

        const planetsData = await planetsResponse.json();

        if (planetsData.results) {
          const planetsWithDetails = await Promise.all(
            planetsData.results.map(async (planet) => {
              const response = await fetch(planet.url);

              const data = await response.json();

              return {
                ...planet,
                population: data.result.properties.population,
                orbital_period: data.result.properties.orbital_period,
              };
            }),
          );

          dispatch({
            type: "get_planets",
            payload: planetsWithDetails,
          });
        }

   
        const vehiclesResponse = await fetch(
          "https://www.swapi.tech/api/vehicles?page=1&limit=6",
        );

        const vehiclesData = await vehiclesResponse.json();

        if (vehiclesData.results) {
          const vehiclesWithDetails = await Promise.all(
            vehiclesData.results.map(async (vehicle) => {
              const response = await fetch(vehicle.url);

              const data = await response.json();

              return {
                ...vehicle,
                model: data.result.properties.model,
                manufacturer: data.result.properties.manufacturer,
              };
            }),
          );

          dispatch({
            type: "get_vehicles",
            payload: vehiclesWithDetails,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="section container">
        <h1 className="text-warning mt-4">
          <strong>Characters</strong>
        </h1>

        <div className="d-flex overflow-auto flex-nowrap gap-3 pb-3">
          {store.people.map((item) => (
            <Card
              key={item.uid}
              type="people"
              name={item.name}
              uid={item.uid}
              gender={item.gender}
              hair={item.hair_color}
              eye={item.eye_color}
              image={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
            />
          ))}
        </div>
      </div>

      <div className="section container">
        <h1 className="ttext-warning mt-4">
          <strong>Planets</strong>
        </h1>

        <div className="d-flex overflow-auto flex-nowrap gap-3 pb-3">
          {store.planets.map((item) => (
            <Card
              key={item.uid}
              type="planets"
              name={item.name}
              uid={item.uid}
              population={item.population}
              orbital_period={item.orbital_period}
              image={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
            />
          ))}
        </div>
      </div>

      <div className="section container">
        <h1 className="text-warning mt-4">
          <strong>Vehicles</strong>
        </h1>

        <div className="d-flex overflow-auto flex-nowrap gap-3 pb-3">
          {store.vehicles.map((item) => (
            <Card
              key={item.uid}
              type="vehicles"
              name={item.name}
              uid={item.uid}
              model={item.model}
              manufacturer={item.manufacturer}
              image={`https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
