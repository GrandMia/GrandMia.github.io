import Nav from "./Nav";

export const metadata = {
  title: "地面仰望真实星空｜像素流星｜斗转星移",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
