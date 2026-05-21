import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { VedAISidebar } from "@/components/vedai-sidebar";

export const metadata: Metadata = {
  title: "Vedyra",
  description: "Vedyra AI-powered CBSE/NCERT learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <header className="sticky top-0 z-30 border-b border-blue-100/80 bg-white/80 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
              <Link href="/Home" className="flex items-center gap-3 text-2xl font-bold text-primary">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Vedyra.png" alt="Vedyra logo" width={38} height={38} className="rounded-md" />
                <span>Vedyra</span>
              </Link>
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
          <VedAISidebar />
        </ClerkProvider>
      </body>
    </html>
  );
}
