"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { type RootState } from "../redux/store";
export const Navbar = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();
  return (
    <div className="w-full h-auto p-6 flex justify-between items-center bg-transparent sticky top-0 z-50">
      <div className="cursor-pointer">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          Home
        </span>
      </div>

      <div className="space-x-4">
        <span
          className="cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Register yourself
        </span>
        <span>
          {userInfo.name ? (
            <span onClick={() => router.push("/dashboard")} className="cursor-pointer">
              {userInfo.name} ({userInfo.ID})
            </span>
          ) : (
            <span onClick={() => router.push("/login")} className="cursor-pointer">login</span>
          )}
        </span>
      </div>
    </div>
  );
};
