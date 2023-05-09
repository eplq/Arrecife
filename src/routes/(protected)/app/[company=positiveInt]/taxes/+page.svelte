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
				<th />
			</tr>
		</thead>
		<tbody>
			{#each data.taxes as tax}
				<tr>
					<td class="w-75">
						<p>{tax.name}</p>
					</td>
					<td>
						<p>{tax.rate}%</p>
					</td>
					<td>
						<div class="dropdown d-flex">
							<button
								class="btn btn-outline-primary ms-auto"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="bi bi-three-dots-vertical" />
							</button>
							<ul class="dropdown-menu">
								<li>
									<a
										class="dropdown-item"
										href={`${currentPath}/delete/${tax.id}`}>Eliminar</a
									>
								</li>
							</ul>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	tr td {
		vertical-align: middle;
	}

	tr td p {
		margin: 0;
	}
</style>
