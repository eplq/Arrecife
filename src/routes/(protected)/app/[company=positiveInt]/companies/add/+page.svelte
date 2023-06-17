<script lang="ts">
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;

	let isProvider: boolean = false;
</script>

<h1>Añadir nueva empresa</h1>

{#if form?.nameMissing}
	<div class="alert alert-danger" role="alert">
		<div>Revisa el nombre, por favor.</div>
	</div>
{/if}

{#if form?.nifMissing}
	<div class="alert alert-danger" role="alert">
		<div>Revisa el NIF, por favor.</div>
	</div>
{/if}

{#if form?.addressMissing}
	<div class="alert alert-danger" role="alert">
		<div>Revisa la dirección, por favor.</div>
	</div>
{/if}

<form method="post">
	<div class="mb-3">
		<label class="form-label" for="name">Nombre de la empresa</label>
		<input
			class="form-control"
			type="text"
			name="name"
			id="name"
			placeholder="Ej. Ficticia del Sur, S.L."
			required
		/>
	</div>

	<div class="mb-3">
		<label class="form-label" for="nif">NIF</label>
		<input
			class="form-control"
			type="text"
			name="nif"
			id="nif"
			placeholder="Ej. B12345678"
			required
		/>
	</div>

	<div class="mb-3">
		<label class="form-label" for="address">Dirección</label>
		<input
			class="form-control"
			type="text"
			name="address"
			id="address"
			placeholder="Ej. C/ Ficticia en Azul, S/N"
			required
		/>
	</div>

	<hr />

	<div class="mb-3 form-check">
		<input
			type="checkbox"
			id="isProvider"
			name="isProvider"
			value="isProvider"
			class="form-check-input"
			bind:checked={isProvider}
		/>
		<label for="isProvider" class="form-check-label">Es un proveedor</label>
	</div>

	<div class="mb-3">
		<label for="paymentPlan" class="form-label">Plan de pago preferido</label>
		<select class="form-select" name="paymentPlan" id="paymentPlan" disabled={!isProvider}>
			<option selected>Sin preferencia</option>
			{#each data.paymentPlans as paymentPlan}
				<option value={paymentPlan.id}>{paymentPlan.name}</option>
			{/each}
		</select>
	</div>

	<div class="mb-3">
		<label class="form-label" for="address">Descuento general en factura (%)</label>
		<input
			class="form-control"
			type="number"
			name="generalDiscount"
			id="generalDiscount"
			placeholder="0"
			min="0.0"
			max="100.0"
			value="0.0"
			step="0.01"
			disabled={!isProvider}
		/>
	</div>

	<input type="submit" class="btn btn-primary" value="Añadir" />
</form>
