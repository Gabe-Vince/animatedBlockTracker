"use client";
import { useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import BlockCard from "@/components/BlockCard";
import { publicClient } from "@/lib/viem";
import { Block } from "viem";
import { AnimatePresence } from "framer-motion";

const STATE_MACHINE = "State Machine 1";
const TRIG_1 = "trig1";
const TRIG_2 = "trig2";

export default function Home() {
  const [currentBlock, setCurrentBlock] = useState<Block>();
  const { rive, RiveComponent: RiveBlockAnimation } = useRive({
    src: "/animations/floating_cube.riv",
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });

  const trigger1 = useStateMachineInput(rive, STATE_MACHINE, TRIG_1);
  const trigger2 = useStateMachineInput(rive, STATE_MACHINE, TRIG_2);

  useEffect(() => {
    publicClient.watchBlocks({
      onBlock: (block) => {
        setCurrentBlock(block);
      },
    });
    if (trigger1) trigger1.fire();

    setTimeout(() => {
      if (trigger2) trigger2.fire();
    }, 4000);
  }, [currentBlock]);

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
        <AnimatePresence>
          {currentBlock && (
            <BlockCard key={currentBlock.hash} blockInfo={currentBlock} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
