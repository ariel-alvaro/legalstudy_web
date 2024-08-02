/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			"laptop": "1024px",
			"monitor": "1366px",
			"bigmonitor": "1809px"

		},
		backgroundImage:{
			'header': "url('/static/header/header.jpg')",
			'stats': "url('/static/other/statistics.jpg')",
			'building': "url('/static/other/building.png')"
		},
		extend: {
			colors: {
				'primary': 'hsl(207,15%,86%)',
				'secondary': '#415a77',
				'boxes': '#1b263b',
				'text1': '#adb5bd',
				'text2': '#adb5bd',
				'gold-color': '#B79A5D'
			}
		},
	},
	plugins: [],
}
