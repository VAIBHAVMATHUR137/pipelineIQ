import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { MidSection } from "@/components/MidSection";
export default function Home() {
  return (
   <div className="bg-[#1d2439] text-white min-h-screen flex flex-col">
   <Navbar />
   <MidSection/>
   </div>
  );
}
