import React, { Suspense, useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import useSimulateController from '../../../hooks/useSimulateController';
import { useFormApi, useFormState } from 'informed';
import useApp from '../../../hooks/useApp';
import { Arm } from '../../3D/Arm';
import { Canvas, useThree } from '@react-three/fiber';
import { round } from '../../../../lib/round';
import NumberInput from '../../Informed/NumberInput';
import Switch from '../../Informed/Switch';
import RadioGroup from '../../Informed/RadioGroup';
import { ActionButton, Flex } from '@adobe/react-spectrum';
import useRobotController from '../../../hooks/useRobotController';
import useRobotKinematics from '../../../hooks/useRobotKinematics';
import useSimulateState from '../../../hooks/useSimulateState';
import { useOverFlowHidden } from '../../../hooks/useOverflowHidden';

const DEG45 = Math.PI / 4;

const getZXZ = (orientation) => {
  switch (orientation) {
    case 'x':
      return [90, 90, 90];
    case '-x':
      return [-270, -90, -90];
    case 'y':
      return [0, -90, 0];
    case '-y':
      return [-180, -90, 0];
    case 'z':
      return [0, 0, 0];
    case '-z':
      return [-90, -180, 0];
    default:
      break;
  }
};

const Control = ({ controlRef }) => {
  const { values } = useFormState();
  const formApi = useFormApi();
  const { updateRobot, setBallRef } = useRobotController();
  const { config } = useApp();

  const { zeroPosition } = config;

  const robotUpdate = () => {
    const { goToX, goToY, goToZ, orientation } = formApi.getFormState().values;

    // get rotations from orientation
    const [r1, r2, r3] = getZXZ(orientation);

    // Update the robot
    updateRobot(goToX, goToY, goToZ, r1, r2, r3);
  };

  const reset = () => {
    formApi.reset();
    // formApi.setTheseValues({
    //   x: zeroPosition[0],
    //   y: zeroPosition[1],
    //   z: zeroPosition[2],
    //   r1: 0,
    //   r2: 0,
    //   r3: 0,
    // });

    // Get pos
    const { x, y, z, r1, r2, r3 } = formApi.getFormState().values;

    setBallRef.current([x, y, z, r1, r2, r3]);

    controlRef.current.reset();
  };

  return (
    <>
      <Flex
        direction="row"
        width={500}
        justifyContent="space-between"
        alignItems="end"
        gap="size-100"
      >
        <ActionButton type="button" onPress={reset} minWidth="100">
          Reset
        </ActionButton>
        <NumberInput
          name="goToX"
          label={`X: ${round(values.x, 100)}`}
          step={0.1}
          initialValue={40}
        />
        <NumberInput
          name="goToY"
          label={`Y: ${round(values.y, 100)}`}
          step={0.1}
          initialValue={0}
        />
        <NumberInput
          name="goToZ"
          label={`Z: ${round(values.z, 100)}`}
          step={0.1}
          initialValue={10}
        />
        <ActionButton title="Go" aria-label="Go" type="button" onPress={robotUpdate} minWidth="100">
          Go
        </ActionButton>
        <Switch name="animate" label="Animate" initialValue />
      </Flex>
      <br />
      <RadioGroup
        initialValue="-z"
        orientation="horizontal"
        name="orientation"
        aria-label="Select Oriantaion"
        options={[
          { label: 'X', value: 'x' },
          { label: '-X', value: '-x' },
          { label: 'Y', value: 'y' },
          { label: '-Y', value: '-y' },
          { label: 'Z', value: 'z' },
          { label: '-Z', value: '-z' },
        ]}
      />
    </>
  );
};

export const Robot = () => {
  const { config, orbitEnabled, toggleOrbital } = useApp();

  const { values } = useFormState();
  const formApi = useFormApi();
  const simulateController = useSimulateController();
  const robotController = useRobotController();
  const { endPosition } = useRobotKinematics();
  const simulateState = useSimulateState();

  const { j0, j1, j2, j3, j4, j5 } = values;

  const angles = [j0, j1, j2, j3, j4, j5];

  const { units } = config;

  const controlRef = useRef();

  useOverFlowHidden();

  return (
    <>
      <h3>
        Angles:{' '}
        {JSON.stringify(
          angles.map((a) => round(a, 100)),
          null,
          2
        )}
      </h3>
      <h3>
        Location: X: {round(endPosition.x, 1000)} {units} Y: {round(endPosition.y, 1000)} {units} Z:{' '}
        {round(endPosition.z, 1000)} {units}
      </h3>
      <Control controlRef={controlRef} />
      <Canvas
        camera={{
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 10000,
          position: [70, 80, 70],
          zoom: 1,
        }}
      >
        <OrbitControls enabled={orbitEnabled} ref={controlRef} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Arm
            simulateController={simulateController}
            simulateState={simulateState}
            robotController={robotController}
            config={config}
            values={values}
            formApi={formApi}
            toggleOrbital={toggleOrbital}
          />
        </Suspense>
      </Canvas>
    </>
  );
};
