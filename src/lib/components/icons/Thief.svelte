<script>
	export let size = 24;
	export let strokeWidth = 2;
	export let color = '#fff';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	stroke={color}
	stroke-width={strokeWidth}
	fill="none"
	class={$$props.class}
	style={$$props.style}
>
	<circle cx="11.7621" cy="11.7621" r="10.7621" stroke-width="1.5" />
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M19.8135 5.06888C22.0198 6.84151 22.4364 9.58007 22.1097 12.1109H1.41443C1.08778 9.58007 1.5044 6.84151 3.71063 5.06888H19.8135ZM7.45642 6.88333C6.40684 6.88333 5.55511 7.73416 5.55505 8.78372C5.55505 9.83334 6.40681 10.6841 7.45642 10.6841C8.50583 10.6839 9.35681 9.83319 9.35681 8.78372C9.35675 7.7343 8.5058 6.88357 7.45642 6.88333ZM16.0677 6.88333C15.0184 6.88355 14.1674 7.73429 14.1674 8.78372C14.1674 9.8332 15.0183 10.6839 16.0677 10.6841C17.1174 10.6841 17.9691 9.83334 17.9691 8.78372C17.9691 7.73416 17.1173 6.88333 16.0677 6.88333Z"
		fill={color}
		stroke="none"
	/>
	<path
		d="M14.7981 16.8925C14.2833 16.4994 13.1176 16.225 11.7621 16.225C10.4066 16.225 9.24091 16.4994 8.72609 16.8925"
		stroke-linecap="round"
		stroke-width="2"
	/>
</svg>
