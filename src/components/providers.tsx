"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import React from "react";

import { WagmiConfig } from "wagmi";
import { arbitrum } from "wagmi/chains";

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  // customWallets: [
  //   {
  //     id: "myCustomWallet",
  //     name: "My Custom Wallet",
  //     homepage: "www.mycustomwallet.com", // Optional
  //     image_url: "my_custom_wallet_image", // Optional
  //     mobile_link: "mobile_link", // Optional - Deeplink or universal
  //     desktop_link: "desktop_link", // Optional - Deeplink
  //     webapp_link: "webapp_link", // Optional
  //     app_store: "app_store", // Optional
  //     play_store: "play_store", // Optional
  //   },
  // ],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </SessionProvider>
  );
}
