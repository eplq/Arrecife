<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="card border-0">
	<div class="card-body">
		<h1 class="card-title">{data.currentCompany.name}</h1>
		<p class="card-subtitle text-secondary">
			{data.currentCompany.NIF} - {data.currentCompany.address}
		</p>
	</div>
</div>

<div class="row gap-3 justify-content-around">
	<div class="card col-5">
		<div class="row">
			<div class="col-4 d-flex justify-content-center align-items-center">
				<i class="bi bi-buildings fs-2" />
			</div>
			<div class="col-8">
				<div class="card-body">
					<h2 class="card-title fs-4">Empresas</h2>
					<p class="card-text">1</p>
				</div>
			</div>
		</div>
	</div>

	<div class="card col-5">
		<div class="row">
			<div class="col-4 d-flex justify-content-center align-items-center">
				<i class="bi bi-receipt fs-2" />
			</div>
			<div class="col-8">
				<div class="card-body">
					<h2 class="card-title fs-4">Facturas</h2>
					<p class="card-text">1</p>
				</div>
			</div>
		</div>
	</div>

	<div class="card col-5">
		<div class="row">
			<div class="col-4 d-flex justify-content-center align-items-center">
				<i class="bi bi-archive fs-2" />
			</div>
			<div class="col-8">
				<div class="card-body">
					<h2 class="card-title fs-4">Artículos</h2>
					<p class="card-text">1</p>
				</div>
			</div>
		</div>
	</div>

	<div class="card col-5">
		<div class="row">
			<div class="col-4 d-flex justify-content-center align-items-center">
				<i class="bi bi-egg fs-2" />
			</div>
			<div class="col-8">
				<div class="card-body">
					<h2 class="card-title fs-4">Marcas</h2>
					<p class="card-text">1</p>
				</div>
			</div>
		</div>
	</div>
</div>
