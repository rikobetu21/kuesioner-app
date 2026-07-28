import { prisma } from "@/src/lib/prisma";
import { auth } from "@/auth";

export const runtime = "nodejs";

function escapeCsvCell(value: string): string {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

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
    
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        feedback: true,
        imageData: true,
        screenshotData: true,
        createdAt: true,
      },
    });

    const header = [
      "ID",
      "Nama",
      "Masukan",
      "Ada Gambar",
      "Ada Screenshot",
      "Waktu",
    ];

    const rows = submissions.map((item) => [
      escapeCsvCell(item.id),
      escapeCsvCell(item.name),
      escapeCsvCell(item.feedback),
      escapeCsvCell(item.imageData ? "Ya" : "Tidak"),
      escapeCsvCell(item.screenshotData ? "Ya" : "Tidak"),
      escapeCsvCell(item.createdAt.toISOString()),
    ]);

    const csv = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const filename = `hasil-kuesioner-${new Date().toISOString().slice(0, 10)}.csv`;


    return new Response(`\uFEFF${csv}`, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename=\"${filename}\"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to export submissions:", error);
    return Response.json(
      { message: "Gagal mengekspor data" },
      { status: 500 }
    );
  }
}
