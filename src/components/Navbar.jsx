import { Link } from "react-router-dom";
import starWars from "../assets/img/starWars.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand-custom">
          <img src={starWars} alt="logo" className="navbar-logo" />
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Favoritos {store.favorites?.length || 0}
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites?.length === 0 ? (
              <li className="dropdown-item">No hay favoritos</li>
            ) : (
              store.favorites?.map((item, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  {item}

                  <i
                    className="fas fa-trash"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();

                      dispatch({
                        type: "remove_favorites",
                        payload: item,
                      });
                    }}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
