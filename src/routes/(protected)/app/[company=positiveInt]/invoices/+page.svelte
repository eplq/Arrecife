<script lang="ts">
	import { page } from '$app/stores';
	import InvoiceRow from '$lib/components/invoices/InvoiceRow.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const currentPath = $page.url.pathname;
</script>

<h1>Facturas</h1>

<div class="mt-3 d-flex">
	<a class="ms-auto btn btn-primary" href={`${currentPath}/add`}>Añadir factura</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<tr>
				<th>Número</th>
				<th>Fecha</th>
				<th>Neto</th>
				<th>Total</th>
				<th>Vendedor</th>
				<th>Comprador</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if data.invoices.length == 0}
				<tr>
					<td colspan="7" class="text-center">
						No hay facturas registradas, prueba a añadir alguna.
					</td>
				</tr>
			{/if}
			{#each data.invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</tbody>
	</table>
</div>
