<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let subtotal = 0;
	let discount = 0;
	let total = 0;

	$: net = (subtotal * (100 - discount)) / 100;
</script>

<h1>Añadir una factura</h1>

<form method="post" use:enhance>
	<div class="mb-3">
		<label for="number" class="form-label">Número de factura</label>
		<input type="text" class="form-control" name="number" id="number" required />
	</div>

	<div class="mb-3">
		<label for="date" class="form-label">Fecha de emisión</label>
		<input type="date" class="form-control" name="date" id="date" required />
	</div>

	<div class="mb-3">
		<label for="date" class="form-label">Tipo</label>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="tipo" id="tipoVenta" />
			<label class="form-check-label" for="tipoVenta">Venta</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="tipo" id="tipoCompra" checked />
			<label class="form-check-label" for="tipoCompra">Compra</label>
		</div>
	</div>

	<div class="mb-3">
		<label for="counterpart" class="form-label">Contraparte</label>
		<select class="form-select" name="counterpart" id="counterpart" required>
			<option>Seleccionar contraparte</option>
			{#each data.companies as company}
				<option value={company.id}>{company.name}</option>
			{/each}
		</select>
	</div>

	<div class="mb-3">
		<label for="subtotal" class="form-label">Importe bruto</label>
		<input
			type="number"
			name="subtotal"
			id="subtotal"
			min="0"
			step="0.01"
			class="form-control"
			bind:value={subtotal}
			required
		/>
	</div>

	<div class="mb-3">
		<label for="discount" class="form-label">Descuento</label>
		<input
			type="number"
			name="discount"
			id="discount"
			min="0"
			max="100"
			step="0.01"
			class="form-control"
			bind:value={discount}
			required
		/>
	</div>

	<div class="mb-3">
		<label for="net" class="form-label">Importe neto</label>
		<input
			type="number"
			name="net"
			id="net"
			min="0"
			max="100"
			step="0.01"
			class="form-control"
			bind:value={net}
			disabled
			required
		/>
	</div>

	<div class="mb-3">
		<label for="paymentPlan" class="form-label">Plan de pago</label>
		<select class="form-select" name="paymentPlan" id="paymentPlan" required>
			<option>Seleccionar plan de pago</option>
			{#each data.paymentPlans as paymentPlan}
				<option value={paymentPlan.id}>{paymentPlan.name}</option>
			{/each}
		</select>
	</div>

	<div class="mb-3">
		<label for="paymentPlan" class="form-label">Plan de pago</label>
		<select class="form-select" name="paymentPlan" id="paymentPlan" required>
			<option>Seleccionar plan de pago</option>
			{#each data.paymentPlans as paymentPlan}
				<option value={paymentPlan.id}>{paymentPlan.name}</option>
			{/each}
		</select>
	</div>

	<div class="mb-3">
		<label for="total" class="form-label">Total</label>
		<input
			type="number"
			name="total"
			id="total"
			min="0"
			max="100"
			step="0.01"
			class="form-control"
			bind:value={total}
			disabled
			required
		/>
	</div>

	<div class="mb-3">
		<label for="paymentPlan" class="form-label">Plan de pago</label>
		<select class="form-select" name="paymentPlan" id="paymentPlan" required>
			<option>Seleccionar plan de pago</option>
			{#each data.paymentPlans as paymentPlan}
				<option value={paymentPlan.id}>{paymentPlan.name}</option>
			{/each}
		</select>
	</div>
</form>
