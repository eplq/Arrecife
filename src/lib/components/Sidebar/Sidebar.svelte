<script lang="ts">
	import type { Company, User } from '@prisma/client';

	import Avatar from '../Avatar.svelte';
	import SidebarLink from './SidebarLink.svelte';

	export let user: Omit<User, 'password'>;
	export let companies: Pick<Company, 'id' | 'name'>[];
</script>

<div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100">
	<a
		href="/app"
		class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
	>
		<img class="logoImg me-3" src="/logo.png" alt="Logo de Arrecife" />
		<span class="fs-4">Arrecife</span>
	</a>

	<hr />

	<ul class="nav nav-pills flex-column mb-auto">
		<SidebarLink name="Inicio" href="/app" bsIconClass="bi-house-fill" activeExactPath />
		<SidebarLink name="Vencimientos" href="/app/due" bsIconClass="bi-cash-coin" />
		<SidebarLink name="Empresas" href="/app/companies" bsIconClass="bi-buildings" />
		<SidebarLink name="Facturas" href="/app/invoices" bsIconClass="bi-receipt" />
		<SidebarLink name="Albaranes" href="/app/dispatchNotes" bsIconClass="bi-box2" />
		<SidebarLink name="Marcas" href="/app/brands" bsIconClass="bi-egg" />
		<SidebarLink name="Artículos" href="/app/articles" bsIconClass="bi-archive" />
	</ul>

	<hr />

	<div class="dropdown">
		<button
			class="d-flex align-items-center text-white text-decoration-none bg-transparent border-0 dropdown-toggle"
			data-bs-toggle="dropdown"
			aria-expanded="false"
		>
			<Avatar name={user.name} />
			<strong class="ms-3">{user.name}</strong>
		</button>
		<ul class="dropdown-menu dropdown-menu-dark text-small shadow">
			{#each companies as company}
				<li>
					<a class="dropdown-item" href={`/app/${company.id}`}>{company.name}</a>
				</li>
			{/each}
			{#if companies.length <= 0}
				<li>
					<p class="dropdown-header">No hay compañías</p>
				</li>
			{/if}
			<li><hr class="dropdown-divider" /></li>
			<li><a class="dropdown-item" href="/auth/logout">Cerrar sesión</a></li>
		</ul>
	</div>
</div>

<style>
	.logoImg {
		width: 1.5rem;
	}
</style>
