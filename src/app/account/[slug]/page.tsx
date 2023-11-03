"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function Account({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center mb-4">User Account</h1>
      <p>{params.slug}</p>
      <Button onClick={() => alert("TODO")}>Send Gift</Button>
    </div>
  );
}

export default Account;
