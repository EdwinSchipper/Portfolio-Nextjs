import React from "react";
import { HomePageSkeleton } from "@/components/features/pages";

/**
 * Route-level streaming skeleton for fast initial perceived load.
 */
export default function Loading() {
  return <HomePageSkeleton />;
}
