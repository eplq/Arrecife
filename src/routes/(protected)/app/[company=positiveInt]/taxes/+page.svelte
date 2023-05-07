<script lang="ts">
	import { page } from '$app/stores';

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
			</tr>
		</thead>
		<tbody>
			{#each data.taxes as tax}
				<tr>
					<td>{tax.name}</td>
					<td>{tax.rate}%</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
