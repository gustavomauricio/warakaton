"use client";

import { publicClient } from "@/lib/client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { getContract } from "viem";
import { nftGiftsAbi } from "@/abis/nftGifts";
import { useWalletClient, erc20ABI, useAccount } from "wagmi";
import { contracts } from "@/config";
import { NftData } from "./page";
import { useToast } from "@/components/ui/use-toast";

function Donate({ options }: { options: NftData[] }) {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const { toast } = useToast();

  const handleDonateClick = async (nftUrl: string) => {
    const contract = getContract({
      address: contracts.nftGifts,
      abi: nftGiftsAbi,
      publicClient,
      walletClient: walletClient || undefined,
    });

    // const wrappedEthContract = getContract({
    //   address: contracts.wrappedEth,
    //   abi: erc20ABI,
    //   publicClient,
    //   walletClient: walletClient || undefined,
    // });

    // const res = await wrappedEthContract.write.approve([
    //   contracts.nftGifts,
    //   BigInt(100000000012312313123123123),
    // ]);

    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: contracts.nftGifts,
        abi: nftGiftsAbi,
        functionName: "mintGift",
        args: ["elonmusk", nftUrl],
      });

      await walletClient?.writeContract(request);

      toast({
        description: "Successfully donated!",
      });
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          description: e.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: "An error occurred",
        });
      }
    }

    // const res2 = await contract.write.mintGift([nftUrl, "elonmusk"]);

    // 2. Call contract methods, fetch events, listen to events, etc.
    // const result = await contract.read.totalSupply();
    // const logs = await contract.getEvents.Transfer();
    // const unwatch = contract.watchEvent.Transfer(
    //   { from: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e" },
    //   {
    //     onLogs(logs) {
    //       console.log(logs);
    //     },
    //   }
    // );
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold text-center mb-8">Donate</h1>
      <div className="flex flex-col gap-y-4">
        {options.map((entry, index) => (
          <button
            key={index}
            className="flex items-center space-x-4 flex-1 rounded-2xl"
            onClick={() => handleDonateClick(entry.jsonUrl)}
          >
            <img
              src={entry.image}
              alt=""
              className="rounded-2xl h-[100px] w-[100px]"
            />
            <div className="text-sm font-medium text-left flex-1">
              <p>{entry.name}</p>
              <p className="text-muted-foreground text-sm">
                {1 * 10 ** index} WEI
              </p>
            </div>
            <ArrowRight className="ml-auto" />
          </button>
        ))}
      </div>
    </>
  );
}

export default Donate;
