// ARB
const contracts = {
  soulboundBadges: "0xB4C0CFb2A7762B6a867E0f630Bf73f359AED4D58",
  usersDB: "0xf07CDD1D9cc628F4a28d8a63D52a5aF41311ca7B",
  communityVault: "0xA62A970999cd1Ae8071F3BEC6841BA1fe7413cab",
  nftGifts: "0xb74D09f6f2444Fd06F6A3c7B4629704BBA4d211E",
  wrappedEth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
} as const;

const contractsChainId = {
  42161: {
    communityVault: "0xA62A970999cd1Ae8071F3BEC6841BA1fe7413cab",
    nftGifts: "0xb74D09f6f2444Fd06F6A3c7B4629704BBA4d211E",
    soulboundBadges: "0xB4C0CFb2A7762B6a867E0f630Bf73f359AED4D58",
    usersDB: "0xf07CDD1D9cc628F4a28d8a63D52a5aF41311ca7B",
    wrappedEth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  },
  1101: {
    communityVault: "0x879b1C671Ad668F24Fc4d86a73427eD2379a52DF",
    nftGifts: "0x0194A98D3f5dB546c15203B9717E14a217953350",
    soulboundBadges: "0x3bBc24e06285E4229d25c1a7b1BcaB9482F1288c",
    usersDB: "0x8E1362508817c2bC40Be1B7254a83DaeDC7af2f5",
    wrappedEth: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
  },
  100: {
    communityVault: "0xFbdB11804F6e1946eD389aF8B00BBeb0211D6f2a",
    nftGifts: "0x3Fb3bC8e8FED24F8CBC0B452Ef6D9537d6bc0056",
    soulboundBadges: "0x63a05795e0cC3d7d0BAc0eFc2dBC1fa97E30d9E0",
    usersDB: "0x0aa0679E623567e3A8b6E2aBc3a23675Aef70973",
    wrappedEth: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1",
  },
  1116: {
    communityVault: "0x03ae1fE3d81a3322141DE487706f49C9122c1BE5",
    nftGifts: "0x0E979171251dC59623bC1B9370E050bC62719e89",
    soulboundBadges: "0x879b1C671Ad668F24Fc4d86a73427eD2379a52DF",
    usersDB: "0x0194A98D3f5dB546c15203B9717E14a217953350",
    wrappedEth: "0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f",
  },
} as const;

const prices = {
  eth: 1800,
  wei: 1800 * 10 ** -18,
};

export { contracts, contractsChainId, prices };
