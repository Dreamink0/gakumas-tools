import { Suspense } from "react";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Navbar from "@/components/Navbar";
import PinnedTools from "@/components/PinnedTools";
import ToolHeader from "@/components/ToolHeader";
import { DataContextProvider } from "@/contexts/DataContext";
import { LoadoutContextProvider } from "@/contexts/LoadoutContext";
import { MemoryCalculatorContextProvider } from "@/contexts/MemoryCalculatorContext";
import { MemoryContextProvider } from "@/contexts/MemoryContext";
import { ModalContextProvider } from "@/contexts/ModalContext";
import { SearchContextProvider } from "@/contexts/SearchContext";
import { SessionContextProvider } from "@/contexts/SessionContext";
import { WorkspaceContextProvider } from "@/contexts/WorkspaceContext";
import { authOptions } from "@/utils/auth";
import styles from "./layout.module.scss";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gakumas Tools",
  description:
    "学マスツール - プロデュース評価の必要最終試験スコア計算、 メモリーの生成確率計算、 コンテスト編成のシミュレーションなど便利な機能が揃っています。",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ja">
      <body className={inter.className}>
        <GoogleAnalytics />
        <SessionContextProvider session={session}>
          <Navbar />
          <WorkspaceContextProvider>
            <DataContextProvider>
              <MemoryCalculatorContextProvider>
                <MemoryContextProvider>
                  <SearchContextProvider>
                    <Suspense>
                      <LoadoutContextProvider>
                        <ModalContextProvider>
                          <div className={styles.tools}>
                            <PinnedTools />
                            <main>
                              <ToolHeader />
                              <div className={styles.mainContent}>
                                {children}
                              </div>
                            </main>
                          </div>
                        </ModalContextProvider>
                      </LoadoutContextProvider>
                    </Suspense>
                  </SearchContextProvider>
                </MemoryContextProvider>
              </MemoryCalculatorContextProvider>
            </DataContextProvider>
          </WorkspaceContextProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
