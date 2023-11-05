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

const API_URL = process.env.API_URL;

const fetchLeaderBoardData = async () => {
  const res = await fetch(
    `${API_URL}/getLeaderBoards?leaderboard_type=DONATERS`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const donatorsData = await res.json();

  const res2 = await fetch(
    `${API_URL}/getLeaderBoards?leaderboard_type=CREATORS`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const creatorsData = await res2.json();

  return {
    topDonators: donatorsData.ranks as any[],
    topReceivers: creatorsData.ranks as any[],
  };
};

async function Leaderboard() {
  const leaderboardData = await fetchLeaderBoardData();

  console.log(leaderboardData);

  return (
    <div className="max-w-full py-8">
      <h1 className="text-3xl font-extrabold text-center mb-8">Leaderboard</h1>

      <div className="flex flex-col gap-y-10">
        <div>
          <p className="mb-4 font-medium">Top Donators:</p>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Twitter</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData?.topDonators.map((row, index) => (
                <TableRow key={row.address}>
                  <TableCell className="font-medium">{row.rank}</TableCell>
                  <TableCell>{row.profile.username}</TableCell>
                  <TableCell className="font-medium">
                    {row.profile.address}
                  </TableCell>
                  <TableCell>{row.value} WEI</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <p className="mb-4 font-medium">Top Donators:</p>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Twitter</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData?.topReceivers.map((row, index) => (
                <TableRow key={row.address}>
                  <TableCell className="font-medium">{row.rank}</TableCell>
                  <TableCell>{row.profile.username}</TableCell>
                  <TableCell className="font-medium">
                    {row.profile.address}
                  </TableCell>
                  <TableCell>{row.value} WEI</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
