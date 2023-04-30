<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let name: string;

	/**
	 * Class containing the icon of Bootstrap Icons
	 *
	 * Example: bi-house-fill
	 */
	export let bsIconClass: string;

	/**
	 * When true, it checks if path is exactly the same, otherwise, it will check if path starts with href
	 */
	export let activeExactPath: boolean = false;

	let active: boolean = false;
	$: active = activeExactPath ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
</script>

<li class="nav-item">
	<a {href} class="nav-link mb-1" class:active aria-current="page">
		<i aria-hidden="true" class={`bi ${bsIconClass} pe-none me-2`} />
		{name}
	</a>
</li>
