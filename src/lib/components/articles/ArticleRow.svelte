<script lang="ts">
	import { page } from '$app/stores';

	export let name: string;
	export let brand: string;
	export let code: string;
	export let cost: number | null;
	export let price: number;

	const currentPath = $page.url.pathname;
</script>

<tr>
	<th>
		<p>{code}</p>
	</th>
	<td>
		<p>{name}</p>
	</td>
	<td colspan={cost ? 1 : 2}>
		<p>{brand}</p>
	</td>
	{#if cost}
		<td>
			<p>{(cost / 100).toFixed(2)} &euro;</p>
		</td>
	{/if}
	<td>
		<p>{(price / 100).toFixed(2)} &euro;</p>
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
					<a class="dropdown-item" href={`${currentPath}/modify/${code}`}>Modificar</a>
				</li>
				<li>
					<a class="dropdown-item" href={`${currentPath}/delete/${code}`}>Eliminar</a>
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
