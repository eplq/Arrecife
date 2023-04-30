<h1>Añadir nueva empresa</h1>

<form method="post">
	<div class="mb-3">
		<label class="form-label" for="name">Nombre de la empresa</label>
		<input
			class="form-control"
			type="text"
			name="name"
			id="name"
			placeholder="Ej. Sillas López S.L."
			required
		/>
	</div>

	<div class="mb-3">
		<label class="form-label" for="nif">NIF</label>
		<input
			class="form-control"
			type="text"
			name="nif"
			id="nif"
			placeholder="Ej. B12345678"
			required
		/>
	</div>

	<div class="mb-3">
		<label class="form-label" for="address">Dirección</label>
		<input
			class="form-control"
			type="text"
			name="address"
			id="address"
			placeholder="Ej. C/ Ficticia de las Rosas, S/N"
			required
		/>
	</div>

	<input type="submit" class="btn btn-primary" value="Registrar" />
</form>
