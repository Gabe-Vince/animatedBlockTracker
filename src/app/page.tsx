// This line imports the `client` library
"use client";

// Import the useState and useEffect hooks from react
// useState: Allows adding React state to function components
// useEffect: Allows performing side effects in function components
import { useState, useEffect } from "react";

// Import useRive and useStateMachineInput from "@rive-app/react-canvas"
// useRive: Provides an easy way to integrate Rive animations into React
// useStateMachineInput: Lets you control Rive state machine inputs from React
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

// Import BlockCard component from "@/components/BlockCard"
// BlockCard is a component used to render each block in the app
import BlockCard from "@/components/BlockCard";

// Import the publicClient from "@/lib/viem"
// publicClient is used for making public API calls to the viem server
import { publicClient } from "@/lib/viem";

// Import the Block type from "viem"
// Block is a type that represents a block in viem
import { Block } from "viem";

// Import the AnimatePresence component from "framer-motion"
// AnimatePresence allows elements to animate out when they're removed from the React tree
import { AnimatePresence } from "framer-motion";

// Define constants for state machine and triggers
const STATE_MACHINE = "State Machine 1";
const TRIG_1 = "trig1";
const TRIG_2 = "trig2";

// Define the Home component
export default function Home() {
  // Declare a new state variable, which we'll call "currentBlock"
  const [currentBlock, setCurrentBlock] = useState<Block>();

  // Use the useRive hook to initialize and control a Rive animation
  const { rive, RiveComponent: RiveBlockAnimation } = useRive({
    src: "/animations/floating_cube.riv",
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });

  // Use the useStateMachineInput hook to control the triggers of the state machine
  const trigger1 = useStateMachineInput(rive, STATE_MACHINE, TRIG_1);
  const trigger2 = useStateMachineInput(rive, STATE_MACHINE, TRIG_2);

  // Use the useEffect hook to perform side effects
  // In this case, it watches blocks, sets the current block when a new block arrives,
  // and fires triggers at certain intervals
  useEffect(() => {
    // Use publicClient to watch for new blocks and set the current block when one arrives
    publicClient.watchBlocks({
      onBlock: (block) => {
        setCurrentBlock(block);
      },
    });

    // Fire trigger1 immediately
    if (trigger1) trigger1.fire();

    // Fire trigger2 after a delay of 4000 ms
    setTimeout(() => {
      if (trigger2) trigger2.fire();
    }, 4000);
  }, [currentBlock]);

  // Render the component
  return (
    <main className="flex min-h-screen flex-col p-10 bg-background h-screen">
      <h1 className="text-3xl font-bold text-center text-white">
        Current block number:{" "}
        <span className="text-lime">{currentBlock?.number?.toString()}</span>
      </h1>
      <div className="flex flex-col items-center justify-center w-full overflow-hidden relative h-full">
        <div className="w-full h-full relative mb-20">
          <RiveBlockAnimation />
        </div>
        {/* Render the current block's BlockCard component, with animations provided by AnimatePresence */}
        <AnimatePresence>
          {currentBlock && (
            <BlockCard key={currentBlock.hash} blockInfo={currentBlock} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
