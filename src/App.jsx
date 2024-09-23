// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import MapProvider from "./Components/MapProvider/MapProvider";
import AddressForm from "./Components/AddressForm/AddressForm";

function App() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="child-container-1 w-full bg-[#111827]">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 "></div>
            <div className="col-span-6 ">
              <h1 className="text-center py-6 font-semibold text-3xl text-slate-200">
                GeoLocator App
              </h1>

              <AddressForm />
            </div>
            <div className="col-span-3 "></div>
          </div>
        </div>
        <div className="child-container-2 w-full bg-slate-300">
          <MapProvider position={position} />
        </div>
      </div>
    </>
  );
}

export default App;
