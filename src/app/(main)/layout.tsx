import { GoogleTagManager } from "@next/third-parties/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GTMPageViewTracker } from "@/components/gtm/GTMPageViewTracker";
import { Suspense } from "react";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <Suspense>
        <GTMPageViewTracker />
      </Suspense>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
