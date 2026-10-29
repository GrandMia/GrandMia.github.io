"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CONFIG = {
      pixelBlock: 1.99,
      starAmount: 1600,
      rotateRate: 0.00012,
      meteorPixelLen: 29,
      meteorSpawnRate: 0.26,
    };

    let W = window.innerWidth;
    let H = window.innerHeight;
    // 移除定位，固定北纬30
    const lat = 30.0;
    const lng = 121.5;
    let rotateOffset = 0;

    function resizeCanvas() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class GroundStar {
      ra: number;
      dec: number;
      baseOpacity: number;
      twinkleSpeed: number;
      phase: number;
      constructor() {
        this.ra = Math.random() * Math.PI * 2;
        this.dec = (Math.random() - 0.5) * Math.PI * 0.95;
        this.baseOpacity = Math.random() * 0.65 + 0.15;
        this.twinkleSpeed = Math.random() * 0.007;
        this.phase = Math.random() * Math.PI * 2;
      }
      getScreenXY() {
        const latRad = (lat * Math.PI) / 180;
        const raTotal = this.ra + rotateOffset;
        const sinAlt =
          Math.sin(latRad) * Math.sin(this.dec) +
          Math.cos(latRad) * Math.cos(this.dec) * Math.cos(raTotal);
        if (sinAlt <= 0) return null;
        const alt = Math.asin(sinAlt);
        const cosAlt = Math.cos(alt);
        const cosDec = Math.cos(this.dec);
        let az = Math.acos(
          (Math.sin(this.dec) - Math.sin(latRad) * sinAlt) /
            (Math.cos(latRad) * cosAlt),
        );
        if (Math.sin(raTotal) > 0) az = Math.PI * 2 - az;
        const maxRadius = Math.min(W, H) * 1.4;
        const radiusScale = ((Math.PI / 2 - alt) / (Math.PI / 2)) * maxRadius;
        const screenX = W / 2 + Math.sin(az) * radiusScale;
        const screenY = H / 2 - Math.cos(az) * radiusScale;
        const altBright = Math.pow(sinAlt, 0.6);
        return { x: screenX, y: screenY, altBright };
      }
      draw() {
        const pos = this.getScreenXY();
        if (!pos) return;
        this.phase += this.twinkleSpeed;
        const twinkle = 0.61 + 0.28 * Math.sin(this.phase);
        const alpha = this.baseOpacity * pos.altBright * twinkle;
        const px = CONFIG.pixelBlock;
        ctx.fillStyle = `rgba(255, 255, 220, ${alpha})`;
        ctx.fillRect(
          Math.floor(pos.x / px) * px,
          Math.floor(pos.y / px) * px,
          px,
          px,
        );
      }
    }

    const starPool = Array.from(
      { length: CONFIG.starAmount },
      () => new GroundStar(),
    );

    class PixelMeteor {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      opacity: number;
      px: number;
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H * 0.35;
        this.len = CONFIG.meteorPixelLen;
        this.speed = Math.random() * 2 + 4;
        this.angle = Math.PI * 0.76;
        this.opacity = 1;
        this.px = CONFIG.pixelBlock;
      }
      draw() {
        ctx.save();
        let cx = this.x;
        let cy = this.y;
        const stepX = Math.cos(this.angle) * this.px;
        const stepY = Math.sin(this.angle) * this.px;
        for (let i = 0; i < this.len; i++) {
          const segOpa = this.opacity * (1 - i / this.len);
          ctx.fillStyle = `rgba(255,255,220,${segOpa})`;
          ctx.fillRect(
            Math.floor(cx / this.px) * this.px,
            Math.floor(cy / this.px) * this.px,
            this.px,
            this.px,
          );
          cx -= stepX;
          cy -= stepY;
        }
        ctx.restore();
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.024;
      }
      isDead() {
        return this.x < -80 || this.y > H + 80 || this.opacity <= 0;
      }
    }

    let meteorList: PixelMeteor[] = [];
    let meteorTimer: ReturnType<typeof setInterval>;
    function autoSpawnMeteor() {
      meteorTimer = setInterval(() => {
        if (Math.random() > 1 - CONFIG.meteorSpawnRate) {
          meteorList.push(new PixelMeteor());
        }
      }, 850);
    }
    autoSpawnMeteor();

    let rafId: number;
    function renderLoop() {
      ctx.fillStyle = "rgba(9, 4, 27, 0.73)";
      ctx.fillRect(0, 0, W, H);
      rotateOffset += CONFIG.rotateRate;
      starPool.forEach((star) => star.draw());
      meteorList.forEach((m) => {
        m.update();
        m.draw();
      });
      meteorList = meteorList.filter((m) => !m.isDead());
      rafId = requestAnimationFrame(renderLoop);
    }
    renderLoop();

    // 清理
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(meteorTimer);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="skyCanvas" />
      <div className="main-content">
        <img className="avatar" src="/3.jpg" alt="avatar" />
        <p className="desc-text">H</p>
        <p className="desc-text">
          남에게 작은 것 하나라도 베풀어 본 사람은 압니다.
        </p>
        <p className="desc-text">
          그 사소한 도움이 자신에게 얼마나 큰 행복을 가져다 주는지를.
        </p>
        <p className="desc-text">
          우리 주변에는 가난하고 불행한 사람들이 많습니다.
        </p>
        <p className="desc-text">
          조금이라도 베풀 것이 있는 사람들은 가난한 그들에게 감사해야 합니다.
          ...
        </p>
        <p className="desc-text">
          사람이 누릴 수 있는 행복 중에서 가장 큰 행복이 바로 은혜로운 자가 되는
          일이기 때문입니다.
        </p>
        <div className="social-bar">
          <a href="#"> </a>
          <a href="#"> </a>
          <a href="#"> </a>
          <a href="#"> </a>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        #skyCanvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgb(0, 0, 0);
          z-index: -1;
        }
        .main-content {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 6vw 20vw 10vw 30vw;
          gap: 12px;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 9px;
        }
        .desc-text {
          font-size: 14px;
          line-height: 1.4;
          opacity: 0.69;
        }
        .desc-text a {
          color: #89cff0;
          text-decoration: underline;
        }
        .desc-text a:hover {
          text-shadow:
            0 0 4px #89cff0,
            0 0 10px rgba(137, 207, 240, 0.6);
        }
        .social-bar {
          display: flex;
          gap: 18px;
          margin-top: 10px;
        }
        .social-bar a {
          color: #fff;
          font-size: 18px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </>
  );
}
