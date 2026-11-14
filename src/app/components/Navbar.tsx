"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { type AppDispatch, type RootState } from "../redux/store";
import { useEffect,useState } from "react";
import { updateUserInfo } from "../redux/slice";
import { api } from "../axios/interceptor";
export const Navbar = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch=useDispatch<AppDispatch>()
  const [checking, setChecking] = useState(true);

  const router = useRouter();
  useEffect(() => {
    api.get("/api/dashboard")
      .then((res) => {
        dispatch(updateUserInfo({
          field: "name",
          value: res.data.user.name
        }));

        dispatch(updateUserInfo({
          field: "email",
          value: res.data.user.email
        }));

        dispatch(updateUserInfo({
          field: "ID",
          value: res.data.user.id
        }));
      })
      .catch(() => {
        // No valid session
      })
      .finally(() => setChecking(false));
  }, [dispatch]);
  if (checking) return null;
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