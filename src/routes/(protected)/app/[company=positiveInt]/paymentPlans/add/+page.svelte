<script lang="ts">
	import { enhance } from '$app/forms';
	import { writable, type Writable } from 'svelte/store';

	const payments: Writable<
		Array<{
			days: number;
			percentage: number;
		}>
	> = writable([
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 },
		{ days: 0, percentage: 100 }
	]);

	function deletePayment(paymentIndex: number) {
		return payments.update((oldPayments) => oldPayments.splice(paymentIndex, 1));
	}
</script>

<h1>Añadir una forma de pago</h1>

<form method="post" use:enhance>
	<div class="mb-3">
		<label for="name" class="form-label">Nombre</label>
		<input type="text" name="name" id="name" class="form-control" placeholder="30/60" />
	</div>

	<div class="mb-3">
		<label for="payment_1">Pagos</label>

		<ol class="list-unstyled mt-2">
			{#each $payments as _payment, i}
				<li class="mb-1">
					<div class="d-flex align-items-center gap-3">
						<p class="mb-0 ms-2">
							{i + 1}.
						</p>
						<input
							type="number"
							name="payment_days_{i}"
							id="payment_days_{i}"
							min="0"
							class="form-control"
							bind:value={$payments[i].days}
						/>

						<input
							type="number"
							name="payment_percentage_{i}"
							id="payment_percentage_{i}"
							class="form-control"
							min="0"
							max="100"
							step="0.01"
							bind:value={$payments[i].percentage}
						/>

						<button
							class="btn btn-outline-danger"
							type="button"
							on:click={() => deletePayment(i)}
						>
							<i class="bi bi-x-lg" />
						</button>
					</div>
				</li>
			{/each}
		</ol>
	</div>

	<div class="mb-3"><input type="submit" value="Añadir" class="btn btn-primary" /></div>
</form>
