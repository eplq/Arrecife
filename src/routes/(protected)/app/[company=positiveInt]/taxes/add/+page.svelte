<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Añadir impuesto</h1>

{#if form?.outOfRange}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">
			El tipo impositivo debe estar en el intervalo [0, 100] para ser válido.
		</p>
	</div>
{/if}

{#if form?.missingData}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Algún dato falta, por favor, revise el nombre y el tipo impositivo.</p>
	</div>
{/if}

<form method="POST" use:enhance>
	<div class="mb-3">
		<label class="form-label" for="name">Nombre</label>
		<input
			class="form-control"
			type="text"
			name="name"
			id="name"
			value={form?.name ?? ''}
			placeholder="Impuesto de ejemplo"
		/>
	</div>
	<div class="mb-3">
		<label class="form-label" for="rate">Tipo impositivo (%)</label>
		<input
			class="form-control"
			type="number"
			min="0"
			max="100"
			value="0"
			name="rate"
			id="rate"
		/>
	</div>

	<input type="submit" value="Añadir" class="btn btn-primary" />
</form>
