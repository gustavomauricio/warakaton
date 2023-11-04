"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

function AccountControls({ twitterHandle }: { twitterHandle: string }) {
  const { toast } = useToast();
  const { address } = useAccount();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (address) {
          router.push(`/account/${twitterHandle}/donate`);
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
