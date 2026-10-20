"use client";
import registerImage from "../Images/registerImage.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { change } from "../redux/slice";
import { signinPageValidator } from "../FormValidator";
export const register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const signinState = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const validator=()=>{
    const errors=signinPageValidator(signinState);
    const errorMessage=Object.values(errors).flatMap(obj=>Object.values(obj))[0]
    console.log(errorMessage)
  }
  return (
    <div>
      <div className="flex justify-center">
        <div className=" w-[70vw] h-[90vh] flex justify-center items-center bg-[#393561]">
          <div className="w-9/10 h-11/12 flex ">
            <Image
              className=" w-1/2 h-full"
              src={registerImage}
              alt="loginImage"
            />
            <div className="flex flex-col justify-center items-center  w-full ">
              <label htmlFor="name" className="block">
                Name:
                <input
                  type="text"
                  id="name"
                  className="block w-full border m-2 p-2"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      change({ field: "name", value: event.target.value }),
                    );
                  }}
                />
              </label>
              <label htmlFor="email" className="block">
                Email:
                <input
                  type="email"
                  id="email"
                  className="block w-full border m-2 p-2"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      change({ field: "email", value: event.target.value }),
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
                      change({ field: "password", value: event.target.value }),
                    );
                  }}
                />
              </label>

              <button className="rounded-full border bg-green-600 p-2 m-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={()=>validator()}>
                Register Yourself
              </button>
              <a
                href="/login"
                className="hover:text-blue-700 hover:underline"
                onClick={() => router.push("/register")}
              >
                {" "}
                Existing user? login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default register;
