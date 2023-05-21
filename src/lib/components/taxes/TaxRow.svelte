<script lang="ts">
	import { page } from '$app/stores';

	export let name: string;
	export let rate: number;
	export let id: number;

	const currentPath = $page.url.pathname;
</script>

<tr>
	<td class="w-75">
		<p>{name}</p>
	</td>
	<td>
		<p>{rate}%</p>
	</td>
	<td>
		<div class="dropdown d-flex">
			<button
				class="btn btn-outline-secondary ms-auto"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<i class="bi bi-three-dots-vertical" />
			</button>
			<ul class="dropdown-menu">
				<li>
					<a class="dropdown-item" href={`${currentPath}/delete/${id}`}>Eliminar</a>
				</li>
				<li>
					<a class="dropdown-item" href={`${currentPath}/modify/${id}`}>Modificar</a>
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
