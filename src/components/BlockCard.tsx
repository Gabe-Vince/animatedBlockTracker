import Link from "next/link";
import { Block } from "viem";
import { motion } from "framer-motion";

type BlockCardProps = {
  blockInfo: Block | undefined;
};

const BlockCard = ({ blockInfo }: BlockCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100vw" }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", bounce: 0.5, duration: 1, delay: 0.8 },
      }}
      exit={{ opacity: 0, x: "100vw", transition: { duration: 0.2 } }}
      className="border-grey border rounded-lg w-3/4 flex flex-col p-4 space-y-1 bg-card absolute bottom-0"
    >
      <div className="flex justify-between">
        <h1 className="text-2xl text-lime ">{blockInfo?.number?.toString()}</h1>
        <Link
          className="text-[#F7FBFE]"
          href={`https://etherscan.io/block/${blockInfo?.number?.toString()}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Etherscan
        </Link>
      </div>
      <p className="text-grey">
        Tx Count:
        <span className="text-[#F7FBFE]">
          {" "}
          {blockInfo?.transactions.length}
        </span>
      </p>
      <p className="text-grey">
        Validator:
        <span className="text-[#F7FBFE]"> {blockInfo?.miner}</span>
      </p>
      <p className="text-grey">
        Hash: <span className="text-[#F7FBFE]"> {blockInfo?.hash}</span>
      </p>
    </motion.div>
  );
};

export default BlockCard;
