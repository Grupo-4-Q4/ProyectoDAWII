'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import api from "@/Service/api";
import { Login } from "@/Modelos/Login";

export default function ComponentLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usuarios, setUsuarios] = useState<Login[]>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const getUsuarios = async () => {
    try {
      const response = await api.get('usuario');
      setUsuarios(response.data);
      
    } catch (error) {
      alert('No se encuentran los datos');
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const buscarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usuario = usuarios.find((user) => user.Email === email && user.password === password);
    console.log('Usuario encontrado:', usuario);

    if (usuario) {
      router.push('/buscarproducto');
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-8 d-flex align-items-center justify-content-center">
            <h1 className="display-6 text-center">Bienvenidos al comparador de precios hecho para ti</h1>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Iniciar Sesión</h5>
                <form onSubmit={buscarLogin}>
                  <div className="mb-3">
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="usuario"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="clave" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="clave"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <button type="submit" className="btn btn-primary w-100">
                    Iniciar Sesión
                  </button>

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
