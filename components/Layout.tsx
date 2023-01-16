import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Search from "@/components/Search";

type LayoutProps = {
  title: string;
  keywords: string;
  description: string;
  children: ReactNode;
};
function Layout({ title, keywords, description, children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info and news in development",
};

export default Layout;
