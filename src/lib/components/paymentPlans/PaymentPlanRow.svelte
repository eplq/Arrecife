<script lang="ts">
	import { page } from '$app/stores';

	export let id: number;
	export let name: string;
	export let payments: number;

	const currentPath = $page.url.pathname;
</script>

<tr>
	<td>
		<p>{name}</p>
	</td>
	<td>
		<p>{payments}</p>
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
