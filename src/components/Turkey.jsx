import React from "react";
import { useGLTF } from "@react-three/drei";

function Turkey(props) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/turkey/model.gltf"
  );
  return <primitive object={scene} {...props} />;
}
