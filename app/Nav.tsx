"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      <style>{`
        .header-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          z-index: 99;
          display: flex;
          align-items: center;
          gap: 26px;
        }
        .header-nav a {
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          opacity: 0.65;
        }
        .header-nav a:hover {
          opacity: 0.8;
          text-shadow:
            0 0 8px rgba(150, 200, 255, 0.7),
            0 0 16px rgba(100, 170, 255, 0.5);
        }
        .header-nav hr {
          margin: 10px;
          border: none;
          border-top: 1px solid #d6cdcd;
          opacity: 0.4;
        }
      `}</style>
      <div className="header-nav">
        <Link href="/toutouxiao">偷偷笑</Link>
        <Link href="/huanhuanxi">欢欢喜</Link>
        <Link href="/xiaxiajiao">虾虾叫</Link>
        <a href="#">✉</a>
        <hr />
      </div>
    </>
  );
}
