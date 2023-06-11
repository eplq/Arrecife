<main class="vh-100 d-flex flex-column overflow-hidden">
	<div class="fv-container" />
	<nav class="d-flex justify-content-between">
		<h1 class="ms-2 text-light">Arrecife</h1>
		<ul class="d-flex flex-row list-unstyled gap-3 mt-2 me-2">
			<li>
				<a class="btn btn-outline-light btn-sm" href="/auth/login">Iniciar sesión</a>
			</li>
			<li>
				<a class="btn btn-outline-light btn-sm" href="/auth/register">Registrarse</a>
			</li>
		</ul>
	</nav>

	<div class="d-flex flex-column align-items-center justify-content-center mt-5">
		<img src="/logo.png" alt="Logo" />
	</div>

	<div class="flex-grow-1 container d-flex flex-column gap-5 my-5 pb-5 pt-2">
		<div class="row justify-content-around flex-grow-1 text-secondary">
			<div class="card col-4 rounded-3">
				<div class="card-body">
					<h2 class="card-title fs-4 fw-bold mb-3">Facturas</h2>
					<h3 class="card-subtitle text-secondary fs-5 mb-1">
						Gestión de facturas emitidas y soportadas
					</h3>
					<p class="card-text">
						Vea todas sus facturas en un solo sitio y manéjelas sin mucho esfuerzo.
					</p>
				</div>
			</div>
			<div class="card col-4 rounded-3">
				<div class="card-body">
					<h2 class="card-title fs-4 fw-bold mb-3">Vencimientos</h2>
					<h3 class="card-subtitle text-secondary fs-5 mb-1">Todos a golpe de click</h3>
					<p class="card-text">
						Vea una lista de todos sus vencimientos generados y actualizados
						automáticamente en base a las facturas que haya registrado.
					</p>
				</div>
			</div>
		</div>
		<div class="row justify-content-around flex-grow-1">
			<div class="card col-4 rounded-3">
				<div class="card-body">
					<h2 class="card-title fs-4 fw-bold mb-3">Impuestos y formas de pago</h2>
					<h3 class="card-subtitle text-secondary fs-5 mb-1">
						Todo lo relativo a las facturas, a pocos clicks.
					</h3>
					<p class="card-text">
						Gestione todo lo relativo al cálculo del valor final de sus facturas en una
						interfaz diseñada para tardar muy poco.
					</p>
				</div>
			</div>
			<div class="card col-4 rounded-3">
				<div class="card-body">
					<h2 class="card-title fs-4 fw-bold mb-3">Proveedores y artículos</h2>
					<h3 class="card-subtitle text-secondary fs-5 mb-1">
						Gestión de artículos asociados a marcas
					</h3>
					<p class="card-text">
						Gestione los proveedores que le brindan servicio, asocie marcas a ellos y
						tenga siempre todos los artículos pertenecientes a ellos controlados.
					</p>
				</div>
			</div>
		</div>
	</div>
</main>

<a class="photo-link" href="https://unsplash.com/es/fotos/2mH5fEFYc5s"
	>Foto de Unsplash por Verónica Reverse</a
>

<style lang="scss">
	.fv-container {
		background-image: url('/bg.jpg');
		background-size: cover;

		position: absolute;

		width: 100vw;
		height: 100vh;

		z-index: -1;
	}

	.card {
		background-color: #31fff5ce;
	}

	.photo-link {
		font-size: 0.75rem;
		color: #dbdbdb;

		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
