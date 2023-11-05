import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountControls from "./account-controls";
import { formatAddress } from "@/lib/utils";

export interface TwitterData {
  username: string;
  name: string;
  avatar: string;
  tweets: number;
  followers: number;
  following: number;
  created_at: string;
  address: string;
  gifts_sent: any[];
  gifts_received: GiftsReceived[];
  stats: Stats;
}

export interface GiftsReceived {
  sender: string;
  receiver_twitter_handle: string;
  gift_uri: string;
  eth_value: number;
  redeemed: boolean;
}

export interface Stats {
  eth_sent: number;
  eth_received: number;
  ranks: Ranks;
  quests_done: any[];
}

export interface Ranks {
  QUESTS: any;
  CREATORS: number;
  DONATERS: any;
}

const API_URL = process.env.API_URL;

const fetchTwitterData = async (username: string) => {
  const res = await fetch(`${API_URL}/getUserInfo?username=${username}`, {
    cache: "no-cache",
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<TwitterData>;
};

const fetchUserData = async (username: string) => {
  return {
    creatorsHelped: 13,
    donatedAmountUsd: 666,
    donationsReceivedUsd: 123123,
    bio: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
    dicta quidem sunt quasi nulla aliquid alias labore? Omnis excepturi
    quis sapiente a maiores, veritatis, tempora modi impedit aspernatur
    neque consectetur?`,
  };
};

async function Account({ params }: { params: { slug: string } }) {
  const twitterData = await fetchTwitterData(params.slug);
  const userData = await fetchUserData(params.slug);

  return (
    <div className="max-w-5xl relative py-8">
      <h1 className="text-3xl font-extrabold text-center mb-8">User Account</h1>
      <div className="mb-5 flex gap-x-8">
        <div>
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src={twitterData.avatar} alt={params.slug} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <a
            className="underline underline-offset-4 hover:text-primary"
            href={`https://twitter.com/${params.slug}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            @{params.slug}
          </a>
        </div>
        <div className="bg-primary-foreground p-3 rounded-lg">
          {userData.bio}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {twitterData.stats.eth_received} WEI
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{twitterData.followers}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Creators Helped
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{twitterData.gifts_sent.length}
            </div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Amount Donated
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {twitterData.stats.eth_sent} WEI
            </div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="badges" className="w-[500px] mx-auto">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="donators">Top Donators</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="badges">User has no badges.</TabsContent>
        <TabsContent value="donators">
          {twitterData.gifts_received.map((entry, index) => (
            <div key={index} className="flex gap-x-4 justify-between">
              <div>{formatAddress(entry.sender)}</div>
              <div>{entry.eth_value} WEI</div>
              <div className="text-xs">Redeemed: {String(entry.redeemed)}</div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="comments">No comments.</TabsContent>
      </Tabs>
      <div className="flex justify-center mt-10">
        <AccountControls twitterHandle={params.slug} />
      </div>
    </div>
  );
}

export default Account;
