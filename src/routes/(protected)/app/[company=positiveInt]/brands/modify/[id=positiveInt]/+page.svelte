<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData, PageServerData } from './$types';

	export let form: ActionData;
	export let data: PageServerData;
</script>

<h1>Modificar marca</h1>

{#if form?.missingName}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el nombre.</p>
	</div>
{/if}

{#if form?.missingProvider}
	<div class="alert alert-danger d-flex align-items-center" role="alert">
		<i class="bi bi-exclamation-triangle-fill" />
		<p class="m-0 ms-2">Por favor, revise el proveedor.</p>
	</div>
{/if}

<form method="post" use:enhance>
	<div class="mb-3">
		<label for="name" class="form-label">Nombre de la marca</label>
		<input
			type="text"
			name="name"
			id="name"
			class="form-control"
			value={form?.name ?? data.brand?.name ?? ''}
			placeholder="Marca ficticia"
		/>
	</div>

	<div class="mb-3">
		<label for="provider" class="form-label">Proveedor</label>
		<select name="provider" id="provider" class="form-control">
			{#each data.providers as provider}
				<option
					value={provider.companyId}
					selected={data.brand?.providerId === provider.companyId}
				>
					{provider.company.name}
				</option>
			{/each}
		</select>
	</div>

	<input type="submit" value="Modificar" class="btn btn-primary" />
</form>
