import "./globals.css";
import Link from "next/link";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <header className="sticky top-0 z-30 border-b border-blue-100/80 bg-white/80 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
              <Link href="/Home" className="text-2xl font-bold text-primary">Vedyra</Link>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                <Link href="/VedAI">VedAI</Link>
                <Link href="/Notes">Notes</Link>
                <Link href="/Videos">Videos</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <div className="flex items-center gap-3">
                <Show when="signed-out">
                  <SignInButton>
                    <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium">Sign in</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white">Sign up</button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </nav>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
