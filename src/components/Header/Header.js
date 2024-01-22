import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header">
        <h4> Le réseau social d'une PME</h4>
        <nav>
          <ul>
            <li>
              {" "}
              <Link to="/">Accueil</Link>{" "}
            </li>
            <li>
              <Link to="post">Post</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
