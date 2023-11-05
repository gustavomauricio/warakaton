"use client";

import { Button } from "@/components/ui/button";
import { useContractRead, usePublicClient, useWalletClient } from "wagmi";
import { usersDBAbi } from "@/abis/usersDB";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatAddress } from "@/lib/utils";
import { signIn, useSession, signOut } from "next-auth/react";
import { nftGiftsAbi } from "@/abis/nftGifts";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import useContracts from "@/useContracts";

function Profile() {
  const { address } = useAccount();
  const session = useSession();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();
  const [nftId, setNftId] = useState<number | undefined>(undefined);
  const publicClient = usePublicClient();

  const contracts = useContracts();

  const { data } = useContractRead({
    address: contracts.usersDB,
    abi: usersDBAbi,
    functionName: "getTwitterHandleFromAddress",
    args: address ? [address] : undefined,
  });

  // const { data: giftsData } = useContractRead({
  //   address: contracts.nftGifts,
  //   abi: nftGiftsAbi,
  //   functionName: "getAllDonators",
  //   args: address ? [address] : undefined,
  // });

  const handleRedeemClick = async (tokenId: number) => {
    try {
      const { request } = await publicClient.simulateContract({
        account: address,
        address: contracts.nftGifts,
        abi: nftGiftsAbi,
        functionName: "redeemDonation",
        args: [BigInt(tokenId)],
      });

      const res = await walletClient?.writeContract(request);

      toast({
        title: "Successfully redeemed!",
        description: res,
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

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/profile" });
  };

  const verifyTwitterAccount = async () => {
    try {
      await signIn("twitter");
    } catch (error) {
      console.error("Error verifying Twitter account:", error);
    }
  };

  return (
    <div className="max-w-full">
      <h1 className="text-3xl font-extrabold text-center mb-8">Profile</h1>
      <div className="flex gap-x-4">
        <Avatar className="h-20 w-20 mb-2">
          {session.status === "authenticated" && (
            <AvatarImage src={session.data?.user?.image ?? ""} alt="@shadcn" />
          )}
          <AvatarFallback>RF</AvatarFallback>
        </Avatar>

        <div>
          <p className="mb-2">
            Address:{" "}
            <code className="font-mono font-bold">
              {address ? formatAddress(address) : "Not Connected"}
            </code>
          </p>
          <p>
            Twitter:{" "}
            {data ? (
              <>
                <code className="font-mono font-bold">@{data}</code>
                <Button size="sm" className="ml-5" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <code className="font-mono font-bold">Not Connected</code>
                {address && (
                  <Button
                    size="sm"
                    className="ml-5"
                    onClick={verifyTwitterAccount}
                  >
                    Connect
                  </Button>
                )}
              </>
            )}
          </p>
        </div>
      </div>

      {address && (
        <div className="flex justify-center mt-10 gap-x-4">
          <Input
            className="w-[100px]"
            type="number"
            value={nftId}
            onChange={(e) => setNftId(e.target.valueAsNumber)}
            placeholder="NFT ID"
          />
          <Button
            className="w-full lg:w-auto"
            onClick={() => handleRedeemClick(nftId || 0)}
          >
            Redeem Gift
          </Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
