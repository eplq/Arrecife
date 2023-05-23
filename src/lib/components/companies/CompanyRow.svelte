<script lang="ts">
	import { page } from '$app/stores';

	export let id: number;
	export let NIF: string;
	export let name: string;
	export let address: string;

	const currentPath = $page.url.pathname;
</script>

<tr>
	<th scope="row">
		<p>
			{NIF}
		</p>
	</th>
	<td>
		<p>
			{name}
		</p>
	</td>
	<td>
		<p>
			{address}
		</p>
	</td>
	<td>
		<div class="dropdown d-flex">
			<button
				class="btn btn-outline-secondary ms-auto"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<i class="bi bi-three-dots-vertical" />
			</button>
			<ul class="dropdown-menu">
				<!-- TODO
                    <li><a href={`${currentPath}/modify/${id}`}>Modificar</a></li>
                -->
				<li>
					<a href={`${currentPath}/delete/${id}`} class="dropdown-item">Eliminar</a>
				</li>
			</ul>
		</div>
	</td>
</tr>

<style>
	tr td,
	tr th {
		vertical-align: middle;
	}

	tr td p,
	tr th p {
		margin: 0;
	}
</style>
