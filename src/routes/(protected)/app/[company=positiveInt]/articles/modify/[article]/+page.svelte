<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>Modificar artículo</h1>

<form method="post" use:enhance>
	<div class="mb-3">
		<label for="name" class="form-label">Nombre</label>
		<input
			type="text"
			class="form-control"
			name="name"
			id="name"
			placeholder="Nombre"
			value={data.article?.name}
		/>
	</div>

	<div class="mb-3">
		<label for="code" class="form-label">Código de barras</label>
		<input
			type="text"
			name="code"
			id="code"
			class="form-control"
			placeholder="Código de barras"
			value={data.article?.code}
		/>
	</div>

	<div class="mb-3">
		<label for="internal_code" class="form-label">Código interno</label>
		<input
			type="text"
			name="internal_code"
			id="internal_code"
			class="form-control"
			placeholder="Código interno"
			value={data.article?.internal_code}
		/>
	</div>

	<div class="mb-3">
		<label for="cost" class="form-label">Costo</label>
		<input
			type="number"
			class="form-control"
			id="cost"
			name="cost"
			value={data.article?.cost ? data.article?.cost / 100 : 0}
			placeholder="Costo"
			min="0"
			step="0.01"
		/>
	</div>

	<div class="mb-3">
		<label for="price" class="form-label">Precio (sin IVA)</label>
		<input
			type="number"
			class="form-control"
			id="price"
			name="price"
			placeholder="Precio (sin IVA)"
			value={data.article?.price ? data.article?.price / 100 : 0}
			min="0"
			step="0.01"
			required
		/>
	</div>

	<div class="mb-3">
		<label for="brand" class="form-label">Marca</label>
		<select
			class="form-select"
			name="brand"
			id="brand"
			placeholder="Marca"
			value={data.article?.brandId}
		>
			{#if data.brands}
				{#each data.brands as brand}
					<option value={brand.id}>{brand.name}</option>
				{/each}
			{/if}
		</select>
	</div>

	<input type="submit" value="Modificar" class="btn btn-primary" />
</form>
