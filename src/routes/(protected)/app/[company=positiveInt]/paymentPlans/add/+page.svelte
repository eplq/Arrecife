<script lang="ts">
	import { enhance } from '$app/forms';

	let payments: { days: number; percentage: number }[] = [{ days: 0, percentage: 0 }];

	let newPaymentDays = 0;
	let newPaymentPercentage = 0;

	let errorMsg = '';

	$: console.log(payments);

	function addPayment() {
		payments = [...payments, { days: newPaymentDays, percentage: newPaymentPercentage }];
	}

	function deletePayment(index: number) {
		if (!index) return;
		if (payments.length <= 1) return;
		payments = [...payments.slice(0, index), ...payments.slice(index + 1)];
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();

		const percentageSum = payments.reduce((sum, { percentage }) => sum + percentage * 100, 0);

		if (percentageSum > 10000 || percentageSum < 0) {
			errorMsg = 'Los porcentajes deben sumar 100%';
			return false;
		}

		return false; // CAMBIAR
	}
</script>

<h1>Añadir una forma de pago</h1>

<p class:d-none={!errorMsg} class="text-danger">{errorMsg}</p>

<form method="post" on:submit={onSubmit} use:enhance>
	<div class="mb-3">
		<label for="name" class="form-label">Nombre</label>
		<input type="text" name="name" id="name" class="form-control" placeholder="30/60" />
	</div>

	<div class="mb-3">
		<label for="payment_1" class="form-label d-block">Pagos (días, porcentaje)</label>

		<button type="button" on:click={addPayment} class="btn btn-primary mb-2">Añadir día</button>

		<ol class="list-unstyled mt-2">
			{#each payments as _payment, i}
				<li class="mb-1">
					<div class="d-flex align-items-center gap-3">
						<p class="mb-0 ms-2">
							{i + 1}.
						</p>
						<div class="d-flex align-items-center flex-grow-1">
							<input
								type="number"
								name={`payment_days_${i}`}
								id={`payment_days_${i}`}
								min="0"
								class="form-control"
								bind:value={payments[i].days}
							/>
							<p class="mb-0 ms-2">días</p>
						</div>

						<div class="d-flex align-items-center flex-grow-1">
							<input
								type="number"
								name={`payment_percentage_${i}`}
								id={`payment_percentage_${i}`}
								class="form-control"
								min="0"
								max="100"
								step="0.01"
								bind:value={payments[i].percentage}
							/>
							<p class="mb-0 ms-2">%</p>
						</div>

						<button
							class="btn btn-outline-danger"
							type="button"
							data-id={i}
							on:click={(e) => {
								deletePayment(
									parseInt(
										e.currentTarget.dataset.id ? e.currentTarget.dataset.id : ''
									)
								);
							}}
						>
							<i class="bi bi-x-lg" />
						</button>
					</div>
				</li>
			{/each}
		</ol>
	</div>

	<div class="mb-3">
		<input type="submit" value="Añadir forma de pago" class="btn btn-primary" />
	</div>
</form>
