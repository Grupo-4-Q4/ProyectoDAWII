'use client'

import Image from "next/image";
import Link from 'next/link';

export default function ComponentLogin() {
  return (
  <div>
    <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="row">
            
            <div className="col-sm-12 col-md-6 col-lg-8">
            <h1 className="display-4 text-center">Bienvenidos al comparador de precios hecho para ti</h1>         
            </div>  

            <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title text-center">Iniciar Sesión</h5>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="usuario" 
                                //value={usuario} 
                                //onChange={(e) => setUsuario(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="clave" className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="clave" 
                                //value={clave} 
                                //onChange={(e) => setClave(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                        
                        <Link className="nav-link text-center p-3" href="/registro">
                            ¡Regístrate!
                        </Link>

                        <Link className="nav-link text-center p-2" href="/buscarproducto">
                            ¡Continuar como Invitado!
                        </Link>

                    </form>
                </div>
            </div>
            </div>
            </div>

            </div>  

          <footer className="mt-auto text-muted text-center">
            <p>© 2024 Aplicación de Comparador de Precios. Todos los derechos reservados.</p>
          </footer>
  </div>
  );
}
