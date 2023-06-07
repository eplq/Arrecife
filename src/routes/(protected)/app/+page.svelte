<script lang="ts">
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<h1>Hola, {data.user.name}</h1>

<p>Seleccione una empresa para empezar a trabajar</p>

<div class="flex-grow-1 overflow-auto">
	<ul>
		{#if data.companies.length === 0}
			<li>No hay empresas disponibles</li>
		{/if}
		{#each data.companies as company}
			<li class="mt-2">
				<a class="btn btn-outline-secondary" href={`/app/${company.id}/`}>{company.name}</a>
			</li>
		{/each}
	</ul>
</div>
