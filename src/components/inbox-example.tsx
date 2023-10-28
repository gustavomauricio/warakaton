"use client";

import {
  useManageSubscription,
  useSubscription,
  useW3iAccount,
  useInitWeb3InboxClient,
  useMessages,
} from "@web3inbox/widget-react";
import { useCallback, useEffect } from "react";
import { useSignMessage, useAccount } from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

export default function ExampleComponent() {
  const { toast } = useToast();
  const isReady = useInitWeb3InboxClient({ projectId });

  const account = useAccount();
  const { address } = account;

  // Getting the account -- Use register before attempting to subscribe
  const {
    setAccount,
    register: registerIdentity,
    identityKey,
  } = useW3iAccount();

  const { signMessageAsync } = useSignMessage();

  // Checking if subscribed
  const { subscribe, isSubscribed } = useManageSubscription();

  // Get the subscription
  const { subscription } = useSubscription();

  const { messages } = useMessages();

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );

  useEffect(() => {
    if (!Boolean(address)) return;
    setAccount(`eip155:1:${address}`);
  }, [address, setAccount]);

  const handleRegistration = useCallback(async () => {
    if (!account) return;
    try {
      await registerIdentity(signMessage);
    } catch (registerIdentityError) {
      console.error({ registerIdentityError });
    }
  }, [signMessage, registerIdentity, account]);

  useEffect(() => {
    if (!identityKey) {
      handleRegistration();
    }
  }, [handleRegistration, identityKey]);

  return (
    <div className="flex gap-y-2 flex-col">
      <p>
        Client is{" "}
        <code className="font-mono font-bold">
          {isReady ? "Ready" : "Not Ready"}
        </code>
      </p>
      <p>
        You are{" "}
        <code className="font-mono font-bold">
          {isSubscribed ? "Subscribed" : "Not Subscribed"}
        </code>
      </p>
      <Button
        onClick={() => {
          if (address) {
            subscribe();
          } else {
            toast({
              variant: "destructive",
              description: "Please connect your wallet first",
            });
          }
        }}
      >
        {" "}
        Subscribe to current dapp{" "}
      </Button>
      <div> All your messages in JSON: {JSON.stringify(messages)}</div>
    </div>
  );
}
