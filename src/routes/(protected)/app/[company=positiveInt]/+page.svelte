<script lang="ts">
	import LinkStat from '$lib/components/userCompany/LinkStat.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="card border-0">
	<div class="card-body">
		<h1 class="card-title">{data.currentCompany.name}</h1>
		<p class="card-subtitle text-secondary">
			{data.currentCompany.NIF} - {data.currentCompany.address}
		</p>
	</div>
</div>

<div class="row gap-3 justify-content-around">
	<LinkStat
		bsIconClass="bi-buildings"
		name="Empresas"
		stat={data.companiesCount}
		href={`/app/${data.currentCompany.id}/companies`}
	/>

	<LinkStat
		bsIconClass="bi-receipt"
		name="Facturas"
		stat={data.invoicesCount}
		href={`/app/${data.currentCompany.id}/invoices`}
	/>

	<LinkStat
		bsIconClass="bi-archive"
		name="Artículos"
		stat={data.articlesCount}
		href={`/app/${data.currentCompany.id}/articles`}
	/>

	<LinkStat
		bsIconClass="bi-egg"
		name="Marcas"
		stat={data.brandsCount}
		href={`/app/${data.currentCompany.id}/brands`}
	/>
</div>
