"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useAccount } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatAddress } from "@/lib/utils";

function Profile() {
  const { address } = useAccount();

  const twitterAccount = null;

  return (
    <div className="max-w-full">
      <h1 className="text-3xl font-extrabold text-center mb-8">Profile</h1>
      <div className="flex gap-x-4">
        <Avatar className="h-20 w-20 mb-2">
          {address && (
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          )}
          <AvatarFallback>RF</AvatarFallback>
        </Avatar>
        {/* <p className="text-center">@{params.slug}</p> */}
        <div>
          <p className="mb-2">
            Address:{" "}
            <code className="font-mono font-bold">
              {address ? formatAddress(address) : "Not Connected"}
            </code>
          </p>
          <p>
            Twitter:{" "}
            {twitterAccount || (
              <>
                <code className="font-mono font-bold">Not Connected</code>
                {address && (
                  <Button
                    size="sm"
                    className="ml-5"
                    onClick={() => alert("Not implemented")}
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
