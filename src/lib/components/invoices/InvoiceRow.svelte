<script lang="ts">
	import { page } from '$app/stores';
	import type { Company, Invoice } from '@prisma/client';

	export let invoice: Invoice & {
		seller: Company;
		buyer: Company;
	};

	const currentPath = $page.url.pathname;
</script>

<tr>
	<th><p>{invoice.number}</p></th>
	<td><p>{invoice.date.toLocaleDateString('es-ES')}</p></td>
	<td><p>{(invoice.netAmount / 100).toFixed(2)} &euro;</p></td>
	<td><p>{(invoice.total / 100).toFixed(2)} &euro;</p></td>
	<td><p>{invoice.seller.name}</p></td>
	<td><p>{invoice.buyer.name}</p></td>
	<td>
		<div class="dropdown d-flex">
			<button
				class="btn btn-outline-secondary ms-auto"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<i class="bi bi-three-dots-vertical" />
			</button>
			<ul class="dropdown-menu">
				<li>
					<a class="dropdown-item" href={`${currentPath}/delete/${invoice.id}`}
						>Eliminar</a
					>
				</li>
			</ul>
		</div>
	</td>
</tr>

<style>
	tr td,
	tr th {
		vertical-align: middle;
	}

	tr td p,
	tr th p {
		margin: 0;
	}
</style>
