import Link from "next/link";
import React from "react";

export default function NavbarComponet() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">                
                <Link className="nav-link active" aria-current="page" href="/login">
                    Login
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/buscarproducto">
                  Comparar un Producto
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/crearListaProductos">
                  Crear un Listado de Productos
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/mostarListaCompra">
                  Ver Productos de mi Lista
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/registro">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
