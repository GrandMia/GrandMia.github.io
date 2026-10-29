/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静态导出，生成out文件夹
  images: { unoptimized: true }, // 关闭图片优化，静态导出必须开这个，不然图片报错404
  trailingSlash: true, // 补斜杠，防止路由404
  // 如果仓库不是 xxx.github.io，取消下面注释，改成你的仓库名字
  // basePath: "/star-page"
};
module.exports = nextConfig;
