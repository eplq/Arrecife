<script>
	import { enhance } from '$app/forms';
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

	<div>
		<label for="counterpart">Contraparte</label>
		<select class="form-control" name="counterpart" id="counterpart">
			<option>Seleccionar contraparte</option>
		</select>
	</div>
</form>
