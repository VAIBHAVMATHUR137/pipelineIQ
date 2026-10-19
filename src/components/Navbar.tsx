"use client"
import { useRouter } from "next/navigation";
export const Navbar = () => {
  const router=useRouter()
  return (
    <div className="w-full h-auto p-6 flex justify-between items-center bg-transparent sticky top-0 z-50">
      <div className="cursor-pointer">
        <span>Home</span>
      </div>
      <div className="space-x-4">
        <span className="cursor-pointer">GitHub</span>
        <span className="cursor-pointer" onClick={()=>router.push("/login")}>Login</span>
      </div>
    </div>
  );
};
 