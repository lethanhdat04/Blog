import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
