import { getAdminSummary } from "@/src/lib/summary";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function GET() {
  try {

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const admins =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) ?? [];

    if (!admins.includes(session.user?.email ?? "")) {
      return Response.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const data = await getAdminSummary();
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch admin summary:", error);
    return Response.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
