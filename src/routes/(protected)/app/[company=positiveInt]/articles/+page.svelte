<script lang="ts">
	import { page } from '$app/stores';
	import ArticleRow from '$lib/components/articles/ArticleRow.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const currentPath = $page.url.pathname;
</script>

<h1>Artículos</h1>

<div class="mt-3 d-flex">
	<a class="ms-auto btn btn-primary" href={`${currentPath}/add`}>Añadir artículos</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-striped">
		<thead>
			<tr>
				<th>Código de barras</th>
				<th>Nombre</th>
				<th>Marca</th>
				<th>Costo</th>
				<th>Precio</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each data.articles as article}
				<ArticleRow
					brand={article.brand.name}
					code={article.code}
					cost={article.cost}
					name={article.name}
					price={article.price}
				/>
			{/each}
		</tbody>
	</table>
</div>
