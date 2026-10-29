"use client";
// 引入React自带的状态钩子 useState，用来保存【波浪是否暂停】这个状态
// import { useState } from "react";
// 导入第三方波浪组件
import Wave from "react-wavify";

export default function Home() {
  // paused：状态变量，记录是否暂停动画；setPaused：修改这个状态的函数
  // false = 默认不暂停，波浪默认流动
  // const [paused, setPaused] = useState(false);
  // 公共海浪样式，复用，不用重复写
  const waveStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "block",
  };
  return (
    // 外层容器：整个背景底板，铺满全屏
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#084b3c",
      }}
    >
      {/* 波浪组件本体 */}
      {/* 海浪容器：只控制海浪区域高度，不加背景色！ */}

      {/* 第一层 最底下，透明度最低 */}
      <Wave
        fill="rgba(20, 40, 90, 0.35)"
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          bottom: 0,
        }}
        options={{
          amplitude: 16,
          speed: 0.12,
          points: 5,
          height: 9,
        }}
      />
      {/* 第二层 中间 */}
      <Wave
        fill="rgba(12, 28, 70, 0.55)"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "block",
        }}
        options={{
          amplitude: 20,
          speed: 0.18,
          points: 6,
          height: 3,
        }}
      />
      {/* 第三层 最上层，最深 */}
      <Wave
        fill="rgba(9, 18, 52, 0.85)"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "block",
        }}
        options={{
          amplitude: 18,
          speed: 0.24,
          points: 7,
          height: 30,
        }}
      />

      {/*
        文字容器：浮在波浪上层，放在屏幕上方区域
        zIndex:10 保证文字在波浪上面显示
        pointerEvents: "none"：容器本身不拦截鼠标点击，不影响下层
      */}
      <div
        style={{
          position: "absolute", // 绝对定位，相对于外层fixed的容器
          top: 0,
          left: 0,
          right: 0,
          height: "40%", // 【可改】文字所在区域占屏幕高度比例
          display: "flex",
          flexDirection: "column", // 内部元素纵向排列
          justifyContent: "center", // 垂直居中
          alignItems: "center", // 水平居中
          zIndex: 10, // 【可改】层级，数字越大越靠上层
          pointerEvents: "none",
        }}
      >
        {/* 标题文字 */}
        <span
          style={{
            fontSize: "88px", // 【可改】文字大小
            fontWeight: "bold", // 【可改】字体粗细 normal / bold
            color: "#2e1c6f", // 【可改】文字颜色
          }}
        >
          Follow the Waves
        </span>
      </div>
    </div>
  );
}
