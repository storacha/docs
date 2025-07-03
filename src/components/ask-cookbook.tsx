import React from "react";
import BaseAskCookbook from "@cookbookdev/docsbot/react";

/** It's going to be exposed in HTTP requests anyway so it's fine to just hardcode it here */
const COOKBOOK_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODI2NmFkN2FiYTQyMjdjNzM4OGM4MzkiLCJpYXQiOjE3NDczNDgxODMsImV4cCI6MjA2MjkyNDE4M30.hyDyMFSXUm7_FiHbRwYJA37n4FxJSBT_sOzSo1GHe7k";
export const AskCookbook = () => {
  return <BaseAskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />;
};