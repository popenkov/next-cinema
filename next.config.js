/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false, //чтобы убрать ошибки сторонних старых библиотек
	poweredByHeader: false, //для безопасности убираем информацию, что сайт сделан на Next.js
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_SERVER_URL,
	},
	//чтобы апи открывался не внутри некста на локалхост  3000
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `http://localhost:4200/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `http://localhost:4200/uploads/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
