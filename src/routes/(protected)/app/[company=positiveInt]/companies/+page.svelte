<script lang="ts">
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	const currentPath = $page.url.pathname;
</script>

<h1>Empresas</h1>

<div class="mt-3 d-flex">
	<a class="ms-auto btn btn-primary" href={`${currentPath}/add`}>Añadir empresa</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<tr>
				<th scope="col" class="w-15">NIF</th>
				<th scope="col">Nombre</th>
				<th scope="col" class="w-55">Dirección</th>
			</tr>
		</thead>
		<tbody>
			{#if data.companies.length === 0}
				<tr>
					<td colspan="4">
						<p class="mb-0 text-center">
							No hay ninguna empresa, prueba a añadir alguna.
						</p>
					</td>
				</tr>
			{:else}
				{#each data.companies as company}
					<tr>
						<th scope="row">{company.NIF}</th>
						<td>{company.name}</td>
						<td>{company.address}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.w-15 {
		width: 15%;
	}

	.w-55 {
		width: 55%;
	}
</style>
