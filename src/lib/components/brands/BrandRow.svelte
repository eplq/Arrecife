<script lang="ts">
	import { page } from '$app/stores';
	import type { Company, Provider } from '@prisma/client';

	export let id: number;
	export let name: string;
	export let provider: Provider & { company: Company };
	export let products: number;

	const currentPath = $page.url.pathname;
</script>

<tr>
	<td class="w-50">
		<p>{name}</p>
	</td>
	<td>
		<p>{provider.company.name}</p>
	</td>
	<td>
		<p>{products}</p>
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
					<a class="dropdown-item" href={`${currentPath}/modify/${id}`}>Modificar</a>
				</li>
				<li>
					<a class="dropdown-item" href={`${currentPath}/delete/${id}`}>Eliminar</a>
				</li>
			</ul>
		</div>
	</td>
</tr>

<style>
	tr td {
		vertical-align: middle;
	}

	tr td p {
		margin: 0;
	}
</style>
