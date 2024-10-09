/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ecommerce.routemisr.com', // اسم المضيف
                port: '', // يمكنك تركه فارغًا
                pathname: '/Route-Academy-products/**', // المسار الصحيح للصور
            },
        ],
    },
};

export default nextConfig;
