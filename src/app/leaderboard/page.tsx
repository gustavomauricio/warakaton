import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const fetchLeaderBoardData = async () => {
  // const res = await fetch("https://api.github.com/users");
  // const data = await res.json();
  // return data;

  return [
    {
      address: "0x06Ad5f18F8A772f07429A70Fb877da7937008694",
      twitterHandle: "@musk",
      amountUsd: 6666,
    },
    {
      address: "0xD3CFE0E43c86BD38fBadB023e4Fe3bc1aefec902",
      twitterHandle: "@corno",
      amountUsd: 123,
    },
    {
      address: "0xD3CFE0E43c86BD38fBadB023e4Fe3bc1aefec902",
      twitterHandle: "@whatever",
      amountUsd: 456,
    },
  ];
};

async function Leaderboard() {
  const leaderboardData = await fetchLeaderBoardData();

  return (
    <div className="max-w-full">
      <h1 className="text-3xl font-extrabold text-center mb-8">Leaderboard</h1>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Twitter</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((row, index) => (
            <TableRow key={row.address}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{row.address}</TableCell>
              <TableCell>{row.twitterHandle}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(row.amountUsd)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Leaderboard;
