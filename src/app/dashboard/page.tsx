"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../axios/interceptor";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { updateUserInfo } from "../redux/slice";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/api/dashboard")
      .then((res) =>
      {
        console.log(res.data.user.id)
        dispatch(updateUserInfo({field:"name",value:res.data.user.name}))
        dispatch(updateUserInfo({field:"email",value:res.data.user.email}))
        dispatch(updateUserInfo({field:"ID",value:res.data.user.id}))
        
      }
        
      )
      .catch(() => router.push("/login"));
  }, [router]);
  const logout = async () => {
    await api.post("/api/auth/logout");
    router.push("/login");
  };

  if (!userInfo.email ||  !userInfo.name) return <p>Loading...</p>;
  console.log(userInfo)
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>User ID :{userInfo.ID}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
