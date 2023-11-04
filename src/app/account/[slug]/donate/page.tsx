import React from "react";
import DonateContent from "./donate-content";

const nfts = [
  "https://ipfs.io/ipfs/bafybeiaqamevc4eba2dou2pneonc3akgi4iznffvbxaevmgffq23uhtcqu/Bronze.json",
  "https://ipfs.io/ipfs/bafybeiaqamevc4eba2dou2pneonc3akgi4iznffvbxaevmgffq23uhtcqu/Silver.json",
  "https://ipfs.io/ipfs/bafybeiaqamevc4eba2dou2pneonc3akgi4iznffvbxaevmgffq23uhtcqu/Gold.json",
  "https://ipfs.io/ipfs/bafybeiaqamevc4eba2dou2pneonc3akgi4iznffvbxaevmgffq23uhtcqu/Platinum.json",
  "https://ipfs.io/ipfs/bafybeiaqamevc4eba2dou2pneonc3akgi4iznffvbxaevmgffq23uhtcqu/Diamond.json",
];

const parseIpfsUrl = (url: string) => {
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  return url;
};

const fetchData = async (urls: string[]) => {
  const res = await Promise.all(
    urls.map(async (url) => {
      const parsedUrl = parseIpfsUrl(url);
      const res = await fetch(parsedUrl);
      const json = (await res.json()) as {
        name: string;
        description: string;
        image: string;
        attributes: { trait_type: string; value: string }[];
        jsonUrl: string;
      };

      return {
        ...json,
        image: parseIpfsUrl(json.image),
        jsonUrl: url,
      };
    })
  );

  return res;
};

export type NftData = Awaited<ReturnType<typeof fetchData>>[number];

async function Donate() {
  const nftsData = await fetchData(nfts);

  return (
    <div className="max-w-5xl py-8">
      <DonateContent options={nftsData} />
    </div>
  );
}

export default Donate;
