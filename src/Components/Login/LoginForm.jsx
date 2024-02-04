import React, { useContext, useState } from "react";
import { auth } from "../../main";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@nextui-org/react";
import { AuthContext } from "../../Context/FirebaseContext";
import ProfesionalsTable from "../Dashboard/ProfesionalsTable";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { currentUser, userIsLogged } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const doSignInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const accessToken = await userCredential.user.getIdToken();
      return { userCredential, accessToken };
    } catch (error) {
      throw error;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        const {accessToken } = await doSignInWithEmailAndPassword(user.email, user.password)

        // Guarda el token de acceso en el localStorage
        localStorage.setItem("accessToken", accessToken);

        setTimeout(() => {
          navigate("/dashboard");

        },3000)
      } catch (error) {
        // Maneja el error
        setIsSigningIn(false);
        setErrorMessage(true);
        console.error("Error durante el inicio de sesión:", error.message);
      }
    } else {
      setIsSigningIn(false);
      setErrorMessage(true);
    }
  };

  return (
    <>
      {userIsLogged && localStorage.getItem("accessToken") ? (
        <ProfesionalsTable />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="https://res.cloudinary.com/leoms96/image/upload/v1706889662/ramsaludmental/Mask_group_eawvj2.png"
              alt="Your Company"
            />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleInputChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primaryGreen placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleInputChange}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primaryGreen placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primaryGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSigningIn ? "iniciando sesion..." : "Iniciar sesión"}
                </Button>
                {errorMessage && (
                  <p className="text-danger">credenciales invalidas</p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
