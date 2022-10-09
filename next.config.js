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
	// чтоюы по localhost:3000/api открывался апи бекенда ttp://localhost:4200/api/
	//  а не апи внутри некстжс
	async rewrites() {
		return [
			{
				source: '/api/:path*', //все что мы напишем после апи будет переходить туда же, но с другим локалхост
				destination: `http://localhost:4200/api/:path*`,
			},
			{
				source: '/uploads/:path*', // для статики
				destination: `http://localhost:4200/uploads/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
