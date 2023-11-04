"use client";

import { Button } from "@/components/ui/button";
import { useContractRead } from "wagmi";
import { usersDBAbi } from "@/abis/usersDB";
import { contracts } from "@/config";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatAddress } from "@/lib/utils";
import { signIn, useSession, signOut } from "next-auth/react";

function Profile() {
  const { address } = useAccount();
  const session = useSession();

  const { data } = useContractRead({
    address: contracts.usersDB,
    abi: usersDBAbi,
    functionName: "getTwitterHandleFromAddress",
    args: address ? [address] : undefined,
  });
  const verifyTwitterAccount = async () => {
    try {
      await signIn("twitter");
    } catch (error) {
      console.error("Error verifying Twitter account:", error);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/profile" });
  };
  const [twitterHandle, setTwitterHandle] = useState("");
  const isButtonDisabled = !twitterHandle.trim();
  let twitterAccount = null;

  return (
    <div className="max-w-full">
      <h1 className="text-3xl font-extrabold text-center mb-8">Profile</h1>
      <div className="flex gap-x-4">
        <Avatar className="h-20 w-20 mb-2">
          {session.status === "authenticated" && (
            <AvatarImage src={session.data?.user?.image} alt="@shadcn" />
          )}
          <AvatarFallback>RF</AvatarFallback>
        </Avatar>
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}

        <p className="text-center">@{twitterHandle}</p>
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
                <code className="font-mono font-bold">Connected</code>
                <Button
                  size="sm"
                  className={`ml-5 ${
                    isButtonDisabled ? "opacity-50" : "opacity-100"
                  }`} // Apply conditional opacity based on the button's disabled state
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <code className="font-mono font-bold">Not Connected</code>
                <input
                  type="text"
                  placeholder="@twitterhandle"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  className="mx-2 p-1 border rounded"
                />
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
        <div className="flex justify-center mt-10">
          <Button className="w-full lg:w-auto">Redeem Gifts</Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
