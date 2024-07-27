/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			"laptop": "1024px",
			"monitor": "1366px"

		},
		backgroundImage:{
			'header': "url('/static/header/header.jpg')"
		},
		extend: {},
	},
	plugins: [],
}
