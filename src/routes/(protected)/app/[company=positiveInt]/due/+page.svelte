<script lang="ts">
	import { page } from '$app/stores';
	import InvoiceRow from '$lib/components/invoices/InvoiceRow.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const currentCompany = $page.params.company;
</script>

<h1>Vencimientos</h1>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<th class="w-10">Fecha</th>
			<th class="w-10">Importe</th>
			<th class="w-25">Factura</th>
			<th>Contraparte</th>
		</thead>
		<tbody>
			{#if data.dueDates.length === 0}
				<tr>
					<td colspan="4" class="text-center">
						No hay vencimientos, prueba a añadir una factura.
					</td>
				</tr>
			{/if}

			{#each data.dueDates as dueDate}
				<tr>
					<td>{dueDate.date.toLocaleDateString('es-ES')}</td>
					<td
						>{dueDate.invoice.sellerId == parseInt(currentCompany)
							? dueDate.amount / 100
							: -dueDate.amount / 100} &euro;</td
					>
					<td>{dueDate.invoice.number}</td>
					<td
						>{dueDate.invoice.sellerId == parseInt(currentCompany)
							? dueDate.invoice.buyer.name
							: dueDate.invoice.seller.name}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.w-10 {
		width: 10%;
	}
</style>
