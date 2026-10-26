"use client";
import loginImage from "../Images/loginImage.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { ChangeEvent } from "react";
import { resetLogin, updateLogin } from "../redux/slice";
import { loginPageValidator } from "../FormValidator";
import axios from "axios";
import { baseURL } from "../axios/baseURL";
export const login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.login);
  const router = useRouter();
  const validator = () => {
    const error = loginPageValidator(loginState);
    const errorMessage = Object.values(error).flatMap((obj) =>
      Object.values(obj),
    )[0];
    console.log(errorMessage);
  };
  const API = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/login`, {
        email: loginState.email,
        password: loginState.password,
      });
      if (res.status === 201) {
        dispatch(resetLogin());
        router.push("/");
      }
    } catch (err) {
      console.log(
        axios.isAxiosError(err) ? err.response?.data?.message : "Login failed",
      );
    }
  };
  return (
    <div className="flex justify-center">
      <div className=" w-[70vw] h-[90vh] flex justify-center items-center bg-[#0d0c22]">
        <div className="w-9/10 h-11/12 flex ">
          <Image className=" w-1/2 h-full" src={loginImage} alt="loginImage" />
          <div className="flex flex-col justify-center items-center  w-full ">
            <label htmlFor="email" className="block">
              Email:
              <input
                type="email"
                id="email"
                className="block w-full border m-2 p-2"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    updateLogin({ field: "email", value: event.target.value }),
                  );
                }}
              />
            </label>

            <label htmlFor="password" className="block">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full border m-2 p-2"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    updateLogin({
                      field: "password",
                      value: event.target.value,
                    }),
                  );
                }}
              />
            </label>

            <button
              className="rounded-full border bg-green-600 p-2 m-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={() => API()}
            >
              Login
            </button>
            <a
              href="/register"
              className="hover:text-blue-700 hover:underline"
              onClick={() => validator()}
            >
              {" "}
              New User? Register yourself
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;
