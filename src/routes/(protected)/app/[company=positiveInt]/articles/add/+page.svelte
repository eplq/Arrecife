<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;
</script>

<h1>Añadir artículo</h1>

{#if form?.nameMissing}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el nombre.</p>
	</div>
{/if}

{#if form?.codeMissing}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el código de barras.</p>
	</div>
{/if}

{#if form?.internalCodeMissing}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el código interno.</p>
	</div>
{/if}

{#if form?.priceMissing}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el precio.</p>
	</div>
{/if}

{#if form?.brandMissing}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el marca.</p>
	</div>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<label for="name" class="form-label">Nombre</label>
		<input
			type="text"
			name="name"
			id="name"
			class="form-control"
			placeholder="Nombre"
			value={form?.name ?? ''}
			required
		/>
	</div>

	<div class="mb-3">
		<label for="code" class="form-label">Código de barras</label>
		<input
			type="text"
			class="form-control"
			id="code"
			name="code"
			placeholder="Código de barras"
			value={form?.code ?? ''}
			required
		/>
	</div>

	<div class="mb-3">
		<label for="internal_code" class="form-label">Código interno</label>
		<input
			type="text"
			class="form-control"
			id="internal_code"
			name="internal_code"
			placeholder="Código interno"
			value={form?.internalCode ?? ''}
			required
		/>
	</div>

	<div class="mb-3">
		<label for="cost" class="form-label">Costo</label>
		<input
			type="number"
			class="form-control"
			id="cost"
			name="cost"
			value={form?.cost ?? 0}
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
			value={form?.price ?? 0}
			min="0"
			step="0.01"
			required
		/>
	</div>

	<div class="mb-3">
		<label for="brand" class="form-label">Marca</label>
		<select class="form-select" name="brand" id="brand" placeholder="Marca">
			{#each data.brands as brand}
				<option value={brand.id}>{brand.name}</option>
			{/each}
		</select>
	</div>

	<input type="submit" value="Añadir" class="btn btn-primary" />
</form>
