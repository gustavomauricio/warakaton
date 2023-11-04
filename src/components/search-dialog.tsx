"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const accounts = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "janedoe",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "John Smith",
    username: "johnsmith",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Jane Smith",
    username: "janesmith",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const accountsFiltered = accounts.filter((account) =>
    account.username.includes(searchValue)
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Search an Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for an account by username.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {/* <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button> */}
        </div>
        <div className="h-[300px] overflow-auto flex flex-col gap-y-2">
          {searchValue && (
            <Link href={`/account/${searchValue}`}>
              <Button
                className="flex justify-between w-full h-[58px]"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">
                    Search for handle
                  </p>
                  <p>@{searchValue}</p>
                </div>
                <ArrowRight />
              </Button>
            </Link>
          )}
          {accountsFiltered.map((account) => (
            <Link key={account.id} href={`/account/${account.username}`}>
              <Button
                className="flex justify-start w-full h-auto"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                <Avatar>
                  <AvatarImage src={account.avatar} alt={account.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="pl-2">
                  {account.name} - {account.username}
                </p>
              </Button>
            </Link>
          ))}
          {accountsFiltered.length === 0 && (
            <div className="text-center opacity-60 text-sm pt-4">
              No accounts found.
            </div>
          )}
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
