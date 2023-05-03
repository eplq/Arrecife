<script lang="ts">
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	const currentPath = $page.url.pathname;
</script>

{JSON.stringify(data)}

<h1>Empresas</h1>

<div class="mt-3 d-flex">
	<a class="ms-auto btn btn-primary" href={`${currentPath}/add`}>Añadir empresa</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<tr>
				<th scope="col">NIF</th>
				<th scope="col">Nombre</th>
				<th scope="col">Dirección</th>
			</tr>
		</thead>
		<tbody>
			{#each data.companies as company}
				<tr>
					<th scope="row">{company.NIF}</th>
					<td>{company.name}</td>
					<td>{company.address}</td>
				</tr>
			{/each}
			{#each data.companies as company}
				<tr>
					<th scope="row">{company.NIF}</th>
					<td>{company.name}</td>
					<td>{company.address}</td>
				</tr>
			{/each}
			{#each data.companies as company}
				<tr>
					<th scope="row">{company.NIF}</th>
					<td>{company.name}</td>
					<td>{company.address}</td>
				</tr>
			{/each}
			{#each data.companies as company}
				<tr>
					<th scope="row">{company.NIF}</th>
					<td>{company.name}</td>
					<td>{company.address}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
