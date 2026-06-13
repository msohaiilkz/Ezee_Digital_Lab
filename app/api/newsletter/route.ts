import { NextRequest } from "next/server";
import { handleLeadRequest } from "@/lib/leads";

export async function POST(request: NextRequest) {
  return handleLeadRequest(request, "newsletter");
}
