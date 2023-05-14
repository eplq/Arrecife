<script lang="ts">
	import { page } from '$app/stores';
	import BrandRow from '$lib/components/brands/BrandRow.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const currentPath = $page.url.pathname;
</script>

<h1>Marcas</h1>

<div class="mt-3 d-flex">
	<a href={`${currentPath}/add`} class="ms-auto btn btn-primary">Añadir marca</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<tr>
				<th>Marca</th>
				<th>Proveedor</th>
				<th>Productos</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if data.brands.length === 0}
				<tr>
					<td colspan="3" class="text-center">
						No hay marcas registradas, prueba a añadir alguna.
					</td>
				</tr>
			{/if}
			{#each data.brands as brand}
				<BrandRow
					id={brand.id}
					name={brand.name}
					provider={brand.provider}
					products={brand._count.products}
				/>
			{/each}
		</tbody>
	</table>
</div>
