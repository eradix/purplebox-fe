import React, { useState } from "react";
import { FaEnvelope, FaLock, FaCheck } from "react-icons/fa";
import TextBox from "../components/TextBox";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import axios from "axios";
import Modal from "../components/AlertModal";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.auth.loginForm);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access_token}`;
        setSuccess(true);
        setFailed(false);
        setTimeout(() => {
          setSuccess(false);
          dispatch(authActions.resetLoginForm());
          navigate("/users");
        }, 2000);
      })
      .catch((err) => {
        setFailed(true);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(authActions.setLoginForm({ name, value }));
  };

  return (
    <>
      {success && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Login Successful"}
        />
      )}

      <div className="h-screen flex items-center justify-center">
        <div className="shadow-md pt-12 px-12 w-full md:w-1/2 lg:w-1/3">
          <h1 className="font-bold text-center uppercase">
            Policy Administration System
          </h1>
          {failed && <ErrorMessage message={"Invalid Credentials"} />}
          <form action="" className="my-3">
            <div className="mb-1">
              <TextBox
                placeholder={"Email"}
                icon={<FaEnvelope />}
                field={"email"}
                value={form.email}
                handleChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <TextBox
                type={"password"}
                placeholder={"Password"}
                icon={<FaLock />}
                field={"password"}
                value={form.password}
                handleChange={handleChange}
              />
            </div>

            <div className="text-right">
              <button
                onClick={(e) => login(e)}
                className="bg-green-500 text-white px-8 py-2 rounded"
              >
                Login
              </button>
            </div>

            <div className="text-center pb-3 py-6">
              <sub className="flex justify-center">
                <p className="mr-1">Dont have account yet? </p>
                <Link to={"/register"}>
                  <p className="text-blue-500 hover:underline">Sign Up</p>
                </Link>
              </sub>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
