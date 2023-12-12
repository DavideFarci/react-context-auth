import { useState } from "react";
import { handleInputChange } from "../utilities/handleInputChange";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { handleLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(formValues);
  };

  return (
    <form
      onSubmit={onLoginSubmit}
      className="flex flex-col gap-2 max-w-lg mx-auto py-8"
    >
      <input
        type="email"
        name="email"
        id="email"
        value={formValues.email}
        onChange={(e) => handleInputChange(e, "email", setFormValues)}
        placeholder="email"
        className="text-black p-1"
      />{" "}
      <br />
      <input
        type="text"
        name="password"
        id="password"
        value={formValues.password}
        onChange={(e) => handleInputChange(e, "password", setFormValues)}
        placeholder="password"
        className="text-black p-1"
      />
      <button type="submit">Invia</button>
    </form>
  );
};

export default Login;
