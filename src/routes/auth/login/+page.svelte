<div class="vh-100 d-flex justify-content-center align-items-center">
	<div class="container row flex-column align-items-center">
		<img src="/ai.jpeg" alt="Logo de calculadora" class="w-auto" />
		<h1 class="text-center my-4">Iniciar sesión</h1>
		<form class="col-12 col-md-8 col-lg-6" action="/auth?/login" method="POST">
			<div class="mb-3">
				<label for="email" class="form-label">E-mail</label>
				<input
					type="email"
					class="form-control"
					name="email"
					id="email"
					placeholder="E-mail"
				/>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Contraseña</label>
				<input
					type="password"
					placeholder="Contraseña"
					class="form-control"
					id="password"
					name="password"
				/>
			</div>
			<button type="submit" class="btn btn-primary">Iniciar sesión</button>
		</form>
	</div>
</div>
