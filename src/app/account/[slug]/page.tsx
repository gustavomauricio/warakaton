"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Account({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center mb-4">User Account</h1>
      <div className="mb-10">
        <p>{params.slug}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Button onClick={() => alert("TODO")}>Send Gift</Button>
    </div>
  );
}

export default Account;
