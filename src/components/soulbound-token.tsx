"use client";

import React, { useEffect } from "react";

function SoulboundToken({ jsonUrl }: { jsonUrl: string }) {
  const [data, setData] = React.useState<{
    name: string;
    description: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () =>
      fetch(jsonUrl)
        .then((res) => res.json())
        .then((data) => setData(data));

    fetchData();
  }, [jsonUrl]);

  if (!data) return null;

  return (
    <div>
      <img className="h-36 w-36" src={data.image} />
      <p className="font-bold">{data.name}</p>
      <p className="text-muted-foreground text-sm">{data.description}</p>
    </div>
  );
}

export default SoulboundToken;
