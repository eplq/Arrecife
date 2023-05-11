<script lang="ts">
	import { page } from '$app/stores';
	import TaxRow from '$lib/components/taxes/TaxRow.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const currentPath = $page.url.pathname;
</script>

<h1>Impuestos</h1>

<div class="mt-3 d-flex">
	<a class="ms-auto btn btn-primary" href={`${currentPath}/add`}>Añadir impuesto</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<tr>
				<th class="w-50">Nombre</th>
				<th>Tipo</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if data.taxes.length == 0}
				<tr>
					<td colspan="3">No hay impuestos registrados, prueba a añadir alguno.</td>
				</tr>
			{/if}
			{#each data.taxes as tax}
				<TaxRow {...tax} />
			{/each}
		</tbody>
	</table>
</div>

<style>
	td {
		text-align: center;
	}
</style>
