import React from 'react';
import { Plane, Text } from '@react-three/drei';

const XZPlane = ({ size }) => (
  <Plane
    args={[size, size, size / 10, size / 10]}
    rotation={[1.5 * Math.PI, 0, 0]}
    position={[0, 0, 0]}
  >
    <meshStandardMaterial attach="material" color="#f9c74f" wireframe />
  </Plane>
);

const XYPlane = ({ size }) => (
  <Plane args={[size, size, size / 10, size / 10]} rotation={[0, 0, 0]} position={[0, 0, 0]}>
    <meshStandardMaterial attach="material" color="pink" wireframe />
  </Plane>
);

const YZPlane = ({ size }) => (
  <Plane
    args={[size, size, size / 10, size / 10]}
    rotation={[0, Math.PI / 2, 0]}
    position={[0, 0, 0]}
  >
    <meshStandardMaterial attach="material" color="#80ffdb" wireframe />
  </Plane>
);

export default function Grid({ size, hideNegatives }) {
  return (
    <group>
      <Text
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[size / 2 + 10, 0, 0]}
        scale={[40, 40, 40]}
      >
        X+
      </Text>
      {!hideNegatives ? (
        <Text
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
          position={[-size / 2 - 10, 0, 0]}
          scale={[40, 40, 40]}
        >
          X-
        </Text>
      ) : null}
      <Text
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, size / 2 + 10, 0]}
        scale={[40, 40, 40]}
      >
        Y+
      </Text>
      {!hideNegatives ? (
        <Text
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
          position={[0, -size / 2 - 10, 0]}
          scale={[40, 40, 40]}
        >
          Y-
        </Text>
      ) : null}
      <Text
        color="white" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[0, 0, size / 2 + 10]}
        scale={[40, 40, 40]}
      >
        Z+
      </Text>
      {!hideNegatives ? (
        <Text
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
          position={[0, 0, -size / 2 - 10]}
          scale={[40, 40, 40]}
        >
          Z-
        </Text>
      ) : null}
      <XZPlane size={size} />
      <XYPlane size={size} />
      <YZPlane size={size} />
    </group>
  );
}
