import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { updateSpaceshipAxis } from '../controls/index';

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const shipPosition = new Vector3(0, 3, 7);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export function Spaceship(props) {
  const { nodes, materials } = useGLTF('assets/models/spaceship.glb');
  const groupRef = useRef();

  useFrame(({ camera }) => {
    updateSpaceshipAxis(x, y, z, shipPosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
    .multiply(new Matrix4().makeTranslation(shipPosition.x, shipPosition.y, shipPosition.z))
    .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;


    var quaternionA = new Quaternion().copy(delayedQuaternion);
    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    var interpolationFactor = 0.175;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(new Matrix4().makeTranslation(shipPosition.x, shipPosition.y, shipPosition.z))
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(
        new Matrix4().makeTranslation(0, 0.015, 0.3)
      );

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    // helixMeshRef.current.rotation.z -= 1.0;
  });

  return (
    <>
      <group ref={groupRef}>
        <group {...props} dispose={null} scale={0.0055} rotation-y={Math.PI}>
          <mesh geometry={nodes['Material_001-material'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_1'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_2'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_3'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_4'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_5'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_6'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_001-material_7'].geometry} material={materials['Material.001']} />
          <mesh geometry={nodes['Material_003-material'].geometry} material={materials['Material.003']} />
          <mesh geometry={nodes['Material_003-material_1'].geometry} material={materials['Material.003']} />
          <mesh geometry={nodes['Material_003-material_2'].geometry} material={materials['Material.003']} />
          <mesh geometry={nodes['Material_003-material_3'].geometry} material={materials['Material.003']} />
          <mesh geometry={nodes['Material_004-material'].geometry} material={materials['Material.004']} />
          <mesh geometry={nodes['Material_007-material'].geometry} material={materials['Material.007']} />
          <mesh geometry={nodes['Material_007-material_1'].geometry} material={materials['Material.007']} />
          <mesh geometry={nodes['Material_008-material'].geometry} material={materials['Material.008']} />
          <mesh geometry={nodes['Material_008-material_1'].geometry} material={materials['Material.008']} />
          <mesh geometry={nodes['Material_008-material_2'].geometry} material={materials['Material.008']} />
          <mesh geometry={nodes['Material_009-material'].geometry} material={materials['Material.009']} />
          <mesh geometry={nodes['Material_009-material_1'].geometry} material={materials['Material.009']} />
          <mesh geometry={nodes['Object_10'].geometry} material={materials['material_0']} />
          <mesh geometry={nodes['Object_12'].geometry} material={materials['material_0']} />
        </group>
      </group>
    </>
  )
}

useGLTF.preload('assets/models/spaceship.glb');
