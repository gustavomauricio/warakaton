"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useAccount } from "wagmi";

function Profile() {
  const account = useAccount();

  const twitterAccount = null;

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center mb-4">Profile</h1>
      <p className="mb-4">
        Address: <span className="font-medium">{account.address}</span>
      </p>
      <p>
        Twitter:{" "}
        {twitterAccount || (
          <>
            <code className="font-mono font-bold">Not Connected</code>
            <Button
              size="sm"
              className="ml-5"
              onClick={() => alert("Not implemented")}
            >
              Connect
            </Button>
          </>
        )}
      </p>
      <Button>Redeem Gifts</Button>
    </div>
  );
}

export default Profile;
