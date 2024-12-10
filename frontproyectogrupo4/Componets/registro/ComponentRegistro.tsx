'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/Service/api";
import { Login } from "@/Modelos/Login";

export default function ComponentLogin() {
  const [nombreCompleto, setNombreCompleto] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [fechaNacimiento, setFechaNacimiento] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [usuarios, setUsuarios] = useState<Login[]>([]);
  const router = useRouter();

 
//
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


//



  const guardarUsuario = async (event: React.FormEvent) => {
    event.preventDefault(); 

    if (!nombreCompleto || !Email || !fechaNacimiento || !telefono || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    //    
   
  
    //


    try {
      const usuario = usuarios.find((usuario) => usuario.Email === Email);
      //console.log('Usuario encontrado:', usuario);
    
      if (usuario) {
        setError('El usuario ya existe, favor introduzca uno nuevo');
        return;        
      }

      if (password.length<8) {
        setError('La contraseña debe tener al menos 8 caractéres');
        return;        
      }

      const nuevoUsuario = { 
        nombreCompleto, 
        Email, 
        fechaNacimiento, 
        telefono, 
        password 
      };



      await api.post("/usuario", nuevoUsuario);
      alert("Registro realizado con éxito");

      setNombreCompleto("");
      setEmail("");
      setFechaNacimiento("");
      setTelefono("");
      setPassword("");
      setError("");
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      alert("No se pudo realizar el registro: " + error);
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-8 d-flex align-items-center justify-content-center">
            <h1 className="display-6 text-center">Completa tus datos para Registrarte</h1>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">REGISTRO</h5>
                <form onSubmit={guardarUsuario}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Nombre Completo"
                      className="form-control"
                      value={nombreCompleto}
                      onChange={(e) => setNombreCompleto(e.target.value)}
                      required
                    />
                  </div>

                  
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Correo Electrónico"
                      className="form-control"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      placeholder="Fecha de Nacimiento"
                      className="form-control"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      className="form-control"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <button type="submit" className="btn btn-success w-100">
                    Guardar Registro
                  </button>

                  <Link className="nav-link text-center p-3" href="/login">
                    ¡Ir al Login!
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
