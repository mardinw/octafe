"use client"
import Image from "next/image";
import { appInfo } from "@/app/config/appInfo";
import { useState } from "react";

export default function Home() {
  const apiUrl = appInfo.apiDomain;
  const [name, setName] = useState<string>("");

  const validateUsername = (username: any) => username.match(/^[a-zA-Z0-9]$/i);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
