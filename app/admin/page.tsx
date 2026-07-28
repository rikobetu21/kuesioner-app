import { auth, signIn, signOut } from "@/auth";
import { getAdminSummary } from "@/src/lib/summary";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white p-8 shadow text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Login Administrator
          </h1>

          <p className="mb-6 text-slate-600">
            Silakan login menggunakan akun Google Administrator.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: "/admin",
              });
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Login dengan Google
            </button>
          </form>
        </div>
      </main>
    );
  }

  const data = await getAdminSummary();

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Dashboard Admin
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                <strong>Nama :</strong>{" "}
                {session?.user?.name ?? "-"}
              </p>

              <p className="text-sm text-slate-600">
                <strong>Email :</strong>{" "}
                {session?.user?.email ?? "-"}
              </p>

              <p className="mt-3 text-slate-600">
                Total pengirim masukan :
                <strong> {data.totalRespondents}</strong>
              </p>
            </div>

            <div className="flex gap-3">

              <a
                href="/api/admin/export"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Download Hasil Kuesioner
              </a>

              <form
                action={async () => {
                  "use server";
                  await signOut({
                    redirectTo: "/",
                  });
                }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </form>

            </div>

          </div>
        </div>

        {/* Data Masukan */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">

          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Masukan Terbaru
          </h2>

          <div className="space-y-4">

            {data.recentSubmissions.map((submission) => (

              <div
                key={submission.id}
                className="rounded-xl border border-slate-200 p-4"
              >

                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">

                  <p className="font-semibold text-slate-900">
                    {submission.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {new Date(submission.createdAt).toLocaleString("id-ID")}
                  </p>

                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                  {submission.feedback}
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">

                  <div>

                    <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                      Gambar
                    </p>

                    {submission.imageUrl ? (
                      <a
                        href={submission.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={submission.imageUrl}
                          alt="Gambar"
                          className="max-h-64 w-full rounded-lg border object-contain"
                        />
                      </a>
                    ) : (
                      <p className="text-sm text-slate-500">
                        Tidak ada gambar.
                      </p>
                    )}

                  </div>

                  <div>

                    <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                      Screenshot
                    </p>

                    {submission.screenshotUrl ? (
                      <a
                        href={submission.screenshotUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={submission.screenshotUrl}
                          alt="Screenshot"
                          className="max-h-64 w-full rounded-lg border object-contain"
                        />
                      </a>
                    ) : (
                      <p className="text-sm text-slate-500">
                        Tidak ada screenshot.
                      </p>
                    )}

                  </div>

                </div>

              </div>

            ))}

            {data.recentSubmissions.length === 0 && (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                Belum ada masukan yang masuk.
              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}