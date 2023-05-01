<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';

	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<div class="row vh-100 m-0">
	<div class="col-2 p-0">
		<Sidebar companies={data.companies} user={data.user} currentCompany={data.currentCompany} />
	</div>
	<div class="col-8 container-fluid py-3">
		<slot />
	</div>
</div>
