"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../axios/interceptor"

type User = { name: string; email: string };

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api
      .get("/api/dashboard")
      .then((res) => setUser(res.data.user))
      .catch(() => router.push("/login"));
  }, [router]);

  const logout = async () => {
    await api.post("/api/auth/logout");
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}