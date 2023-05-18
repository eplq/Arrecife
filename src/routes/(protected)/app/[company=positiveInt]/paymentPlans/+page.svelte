<script lang="ts">
	import { page } from '$app/stores';
	import PaymentPlanRow from '$lib/components/paymentPlans/PaymentPlanRow.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const currentPath = $page.url.pathname;
</script>

<h1>Planes de pago</h1>

<div class="mt-3 d-flex">
	<a class="ms-auto btn btn-primary" href={`${currentPath}/add`}>Añadir plan de pago</a>
</div>

<div class="mt-3 flex-grow-1 overflow-auto">
	<table class="table table-hover table-strip">
		<thead>
			<tr>
				<th class="w-50">Nombre</th>
				<th>Pagos</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if data.paymentPlans.length == 0}
				<tr>
					<td colspan="3">No hay planes de pago registrados, prueba a añadir alguno.</td>
				</tr>
			{/if}
			{#each data.paymentPlans as paymentPlan}
				<PaymentPlanRow
					id={paymentPlan.id}
					name={paymentPlan.name}
					payments={paymentPlan._count.payments}
				/>
			{/each}
		</tbody>
	</table>
</div>
