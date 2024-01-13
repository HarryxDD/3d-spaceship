import { Environment, PerspectiveCamera } from "@react-three/drei";
import React from "react";
import { Spaceship } from "./components/Spaceship";
import { SphereEnv } from "./SphereEnv";

function App() {
  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/envmap.hdr"} />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <Spaceship />
    </>
  );
}

export default App;
