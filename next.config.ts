import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true, // Set to `false` if you want a temporary redirect
            },
        ];
    },
};

export default nextConfig;
