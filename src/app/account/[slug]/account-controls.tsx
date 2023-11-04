"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { useAccount } from "wagmi";

function AccountControls() {
  const { toast } = useToast();
  const { address } = useAccount();

  return (
    <Button
      onClick={() => {
        if (address) {
          // subscribe();
        } else {
          toast({
            variant: "destructive",
            description: "Please connect your wallet first",
          });
        }
      }}
      className="w-full lg:w-auto"
    >
      Send Gift
    </Button>
  );
}

export default AccountControls;
