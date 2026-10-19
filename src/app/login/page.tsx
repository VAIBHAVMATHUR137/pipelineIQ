"use client";
import loginImage from "../Images/loginImage.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const login = () => {
    const router=useRouter()
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
              />
            </label>

            <label htmlFor="password" className="block">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full border m-2 p-2"
              />
            </label>

            <button className="rounded-full border bg-green-600 p-2 m-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              Login
            </button>
            <a href="/register" className="hover:text-blue-700 hover:underline" onClick={()=>router.push("/register")}> New User? Register yourself</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;
