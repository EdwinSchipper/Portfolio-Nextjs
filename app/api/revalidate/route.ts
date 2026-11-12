import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
  clearServerQueryCache,
  isValidRevalidateRequest,
  resolveRevalidationTargets,
} from "@/lib/cms";

/**
 * On-demand ISR webhook endpoint for Contentstack Publish/Unpublish events.
 * Invalidates both the in-memory Contentstack query cache and affected Next.js routes.
 */
export async function POST(request: Request) {
  const expectedSecret = env.revalidateSecret;

  if (!expectedSecret) {
    return NextResponse.json(
      { revalidated: false, message: "Revalidation secret is not configured." },
      { status: 503 }
    );
  }

  if (!isValidRevalidateRequest(request, expectedSecret)) {
    return NextResponse.json(
      { revalidated: false, message: "Unauthorized revalidation request." },
      { status: 401 }
    );
  }

  const payload: unknown = await request.json().catch(() => null);
  const { paths, routePatterns } = resolveRevalidationTargets(payload);

  clearServerQueryCache();

  for (const path of paths) {
    revalidatePath(path);
  }

  for (const pattern of routePatterns) {
    revalidatePath(pattern.path, pattern.type);
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    routePatterns,
    revalidatedAt: new Date().toISOString(),
  });
}

