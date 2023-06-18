<script lang="ts">
	import { enhance } from '$app/forms';
	import { addDays } from '$lib/utils/date';
	import type { PaymentPlan, PaymentPlanPayment } from '@prisma/client';
	import Select from 'svelte-select';

	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;

	let subtotal = 0;
	let discount = 0;
	let net = 0;
	let total = 0;

	$: net = (subtotal * (100 - discount)) / 100;

	let selectedTaxes: { label: string; index: number; value: number }[] = [];

	let totalTaxSum = 0;

	$: totalTaxSum = selectedTaxes
		? selectedTaxes.reduce((sum, tax) => {
				const realTax = data.taxes.find((item) => item.id === tax.value);
				if (!realTax) return sum;

				return sum + realTax.rate;
		  }, 0)
		: 0;

	let taxesBreakdown: { name: string; amount: number }[] = [];

	$: taxesBreakdown = selectedTaxes
		? selectedTaxes.map((tax) => {
				const realTax = data.taxes.find((item) => item.id === tax.value);

				return { name: realTax!.name, amount: (net * realTax!.rate) / 100 };
		  })
		: [];

	$: total = net * (1 + totalTaxSum / 100);

	let selectedDateString: string = (form?.date as string) ?? '';
	let selectedDate: Date = new Date();

	$: selectedDate = selectedDateString ? new Date(selectedDateString) : selectedDate;

	let selectedPaymentPlanId: number = Number(form?.paymentPlan as string) ?? '';
	let selectedPaymentPlan:
		| (PaymentPlan & {
				payments: PaymentPlanPayment[];
		  })
		| null;

	$: selectedPaymentPlan =
		data.paymentPlans.find((paymentPlan) => paymentPlan.id === selectedPaymentPlanId) ?? null;

	let dueDates: { date: Date; amount: number }[] = [];

	$: dueDates = selectedPaymentPlan
		? selectedPaymentPlan.payments.map((payment) => {
				return {
					date: addDays(payment.days, selectedDate),
					amount: (total * payment.percentage) / 100
				};
		  })
		: [];
</script>

<h1>Añadir una factura</h1>

<form method="post" use:enhance>
	<div class="mb-3">
		<label for="number" class="form-label">Número de factura</label>
		<input
			type="text"
			class="form-control"
			name="number"
			id="number"
			required
			value={form?.number ?? ''}
		/>
	</div>

	<div class="mb-3">
		<label for="date" class="form-label">Fecha de emisión</label>
		<input
			type="date"
			class="form-control"
			name="date"
			id="date"
			bind:value={selectedDateString}
			required
		/>
	</div>

	<div class="mb-3">
		<label for="date" class="form-label">Tipo</label>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="type" id="typeSell" value="sell" />
			<label class="form-check-label" for="typeSell">Venta</label>
		</div>
		<div class="form-check">
			<input
				class="form-check-input"
				type="radio"
				name="type"
				id="typeBuy"
				value="buy"
				checked
			/>
			<label class="form-check-label" for="typeBuy">Compra</label>
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
		<label for="discount" class="form-label">Descuento (%)</label>
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
		<label for="paymentPlan" class="form-label">Impuestos</label>
		<Select
			items={data.taxes.map((tax, index) => {
				return {
					index,
					value: tax.id,
					label: tax.name
				};
			})}
			name="taxes"
			id="taxes"
			bind:value={selectedTaxes}
			multiple
			placeholder="Seleccione los impuestos a aplicar"
		/>

		<p class="mt-2">Suma de los tipos impositivos seleccionados: {totalTaxSum} %</p>

		<ul>
			{#each taxesBreakdown as tax}
				<li>
					<p>{tax.name} - {tax.amount} €</p>
				</li>
			{/each}
		</ul>
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
		<select
			class="form-select"
			bind:value={selectedPaymentPlanId}
			name="paymentPlan"
			id="paymentPlan"
			required
		>
			{#each data.paymentPlans as paymentPlan}
				<option value={paymentPlan.id}>{paymentPlan.name}</option>
			{/each}
		</select>

		<p class="mt-2 mb-0">Vencimientos que se generarán</p>

		<ul>
			{#each dueDates as dueDate}
				<li>
					<p>{dueDate.date.toLocaleDateString('es-ES')} - {dueDate.amount} &euro;</p>
				</li>
			{/each}
		</ul>
	</div>

	<input type="submit" value="Añadir" class="btn btn-primary" />
</form>
