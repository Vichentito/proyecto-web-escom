import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startLogin } from "../../actions/auth";
import "./login.css";

export const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "admin",
    lPassword: "1234",
  });

  const { lEmail, lPassword } = formLoginValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
    history.replace("/home");
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      try {
        fetch(
          "http://localhost:8080/ServletXX1/uploadFiles",
          {
            method: "POST",
            body: formData,
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group align-items-center">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 login-form-1">
          <h3>Crea tu usuario con un archivo</h3>
          <form >
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                id="fileSelector"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
