import { ArrowRight } from "lucide-react";
import React from "react";

const nfts = [
  "ipfs://bafybeiem3hww2qkwzei3r62jx2xu25nax6zaaunaqag6uyaiuyd2hwgxba/Bronze.json", // 1 wei
  "ipfs://bafybeiem3hww2qkwzei3r62jx2xu25nax6zaaunaqag6uyaiuyd2hwgxba/Silver.json", // 10 wei
  "ipfs://bafybeiem3hww2qkwzei3r62jx2xu25nax6zaaunaqag6uyaiuyd2hwgxba/Gold.json", // 100 wei
  "ipfs://bafybeiem3hww2qkwzei3r62jx2xu25nax6zaaunaqag6uyaiuyd2hwgxba/Platinum.json", // 1000 wei
  "ipfs://bafybeiem3hww2qkwzei3r62jx2xu25nax6zaaunaqag6uyaiuyd2hwgxba/Diamond.json", // 10000 wei
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
      };

      return {
        ...json,
        image: parseIpfsUrl(json.image),
      };
    })
  );

  return res;
};

async function Donate() {
  const nftsData = await fetchData(nfts);

  return (
    <div className="max-w-5xl py-8">
      <h1 className="text-3xl font-extrabold text-center mb-8">Donate</h1>
      <div className="flex flex-col gap-y-4">
        {nftsData.map((entry, index) => (
          <button
            key={index}
            className="flex items-center space-x-4 flex-1 rounded-2xl"
          >
            <img
              src={entry.image}
              alt=""
              className="rounded-2xl h-[100px] w-[100px]"
            />
            <div className="text-sm font-medium text-left flex-1">
              <p>{entry.name}</p>
              <p className="text-muted-foreground text-sm">
                {1 * 10 ** index} WEI
              </p>
            </div>
            <ArrowRight className="ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Donate;
