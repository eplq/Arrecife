<main class="vh-100 d-flex flex-column overflow-hidden">
	<div class="bg-container" />
	<nav class="d-flex justify-content-between align-items-center">
		<h1 class="ms-4 text-light fs-3">Arrecife</h1>
		<ul class="d-flex flex-row list-unstyled gap-3 mt-2 me-2">
			<li>
				<a class="btn btn-outline-warning border-0" href="/auth/login">Iniciar sesión</a>
			</li>
			<li>
				<a class="btn btn-outline-warning" href="/auth/register">Registrarse</a>
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

	<div class="bubble small-l" />
	<div class="bubble small" />
	<div class="bubble s-medium" />
	<div class="bubble medium" />
	<div class="bubble large" />
	<div class="bubble small" />
</main>

<a class="photo-link" href="https://unsplash.com/es/fotos/2mH5fEFYc5s"
	>Foto de Unsplash por Verónica Reverse</a
>

<style lang="scss">
	.bg-container {
		background-image: url('/bg.jpg');
		background-size: cover;

		position: absolute;

		width: 100vw;
		height: 100vh;

		z-index: -1;

		filter: brightness(0.5);
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

	// https://codepen.io/adtcreate/pen/gyrRzP
	.bubble {
		position: absolute;
		top: 53%;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.8);
	}
	.small {
		width: 10px;
		height: 10px;
		left: 50%;
		animation: flow-s 2s linear infinite;
	}

	.small-l {
		width: 10px;
		height: 10px;
		left: 43%;
		animation: flow-s-l 0.9s linear infinite;
	}

	.s-medium {
		width: 20px;
		height: 20px;
		left: 43%;
		animation: flow-s 1.3s linear infinite;
	}

	.medium {
		width: 25px;
		height: 25px;
		left: 45%;
		animation: flow-m 0.8s linear infinite;
	}

	.large {
		width: 5px;
		height: 5px;
		left: 57%;
		animation: flow-l 0.7s linear infinite;
	}

	@keyframes flow-l {
		0% {
			top: 53%;
			left: 57%;
			opacity: 0;
		}
		25% {
			top: 49%;
			left: 57.5%;
			opacity: 1;
		}
		50% {
			left: 58%;
			opacity: 1;
		}
		75% {
			left: 57.5%;
			opacity: 1;
		}
		100% {
			top: 32%;
			left: 57%;
			opacity: 0;
		}
	}

	@keyframes flow-s {
		0% {
			top: 53%;
			left: 50%;
			opacity: 0;
		}
		25% {
			top: 49%;
			left: 51%;
			opacity: 1;
		}
		50% {
			top: 45%;
			left: 52%;
			opacity: 1;
		}
		75% {
			top: 41%;
			left: 51%;
			opacity: 1;
		}
		100% {
			top: 37%;
			left: 50%;
			opacity: 0;
		}
	}

	@keyframes flow-s-m {
		0% {
			top: 53%;
			left: 43%;
			opacity: 0;
		}
		25% {
			top: 49%;
			left: 42.5%;
			opacity: 1;
		}
		50% {
			top: 45%;
			left: 42%;
			opacity: 1;
		}
		75% {
			top: 41%;
			left: 42.5%;
			opacity: 1;
		}
		100% {
			top: 37%;
			left: 43%;
			opacity: 0;
		}
	}

	@keyframes flow-m {
		0% {
			top: 53%;
			left: 45%;
			opacity: 0;
		}
		25% {
			top: 48%;
			left: 44.5%;
			opacity: 1;
		}
		50% {
			top: 43%;
			left: 44%;
			opacity: 1;
		}
		75% {
			top: 38%;
			left: 44.5%;
			opacity: 1;
		}
		100% {
			top: 33%;
			left: 45%;
			opacity: 0;
		}
	}

	@keyframes flow-s-l {
		0% {
			top: 53%;
			left: 43%;
			opacity: 0;
		}
		25% {
			top: 48%;
			left: 43.5%;
			opacity: 1;
		}
		50% {
			top: 43%;
			left: 44%;
			opacity: 1;
		}
		75% {
			top: 38%;
			left: 43.5%;
			opacity: 1;
		}
		100% {
			top: 33%;
			left: 43%;
			opacity: 0;
		}
	}
</style>
