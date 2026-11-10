export const MidSection = () => {
  return (
    <div className="h-[70vh] flex flex-row">
      <div className="h-full w-1/2 flex  justify-center items-center">
        <div className="flex flex-col gap-y-3">
            <span className="text-white text-4xl text-center">Complete package for to track your outreach efforts</span>
            <span className="text-gray-500 text-center">Get better situational awareness for your jobhunt </span>
            <span className="text-center ">
                <>
                <button className="bg-green-600 text-white m-2 p-3 rounded-full cursor-pointer ">Register yourself</button>
                or try the {""}
                <a href="#" className=" text-white hover:text-blue-600 hover:underline">demo account</a>

                
                
                 
                </>
            </span>
        </div>
      </div>
    </div>
  );
};
