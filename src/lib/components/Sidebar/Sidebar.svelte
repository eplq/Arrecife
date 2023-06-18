<script lang="ts">
	import type { Company, User } from '@prisma/client';

	import Avatar from '../Avatar.svelte';
	import SidebarLink from './SidebarLink.svelte';

	export let user: Omit<User, 'password'>;
	export let companies: Pick<Company, 'id' | 'name'>[];
	export let currentCompany: Omit<Company, 'ownerId'> | null;
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

	{#if currentCompany}
		<ul class="nav nav-pills flex-column mb-auto">
			<SidebarLink
				name="Inicio"
				href={`/app/${currentCompany.id}`}
				bsIconClass="bi-house-fill"
				activeExactPath
			/>
			<SidebarLink
				name="Vencimientos"
				href={`/app/${currentCompany.id}/due`}
				bsIconClass="bi-cash-coin"
			/>
			<SidebarLink
				name="Empresas"
				href={`/app/${currentCompany.id}/companies`}
				bsIconClass="bi-buildings"
			/>
			<SidebarLink
				name="Facturas"
				href={`/app/${currentCompany.id}/invoices`}
				bsIconClass="bi-receipt"
			/>
			<SidebarLink
				name="Marcas"
				href={`/app/${currentCompany.id}/brands`}
				bsIconClass="bi-egg"
			/>
			<SidebarLink
				name="Artículos"
				href={`/app/${currentCompany.id}/articles`}
				bsIconClass="bi-archive"
			/>
			<SidebarLink
				name="Impuestos"
				href={`/app/${currentCompany.id}/taxes`}
				bsIconClass="bi-piggy-bank"
			/>
			<SidebarLink
				name="Planes de pago"
				href={`/app/${currentCompany.id}/paymentPlans`}
				bsIconClass="bi-calendar-week"
			/>
		</ul>
	{:else if companies.length}
		<p>Pulse sobre su nombre y seleccione una empresa, por favor.</p>
		<p class="mb-auto">
			Si por el contrario desea añadir una nueva empresa, puede hacerlo
			<a href="/app/add">aquí</a> o en el botón que hay en el desplegable de su nombre.
		</p>
	{:else}
		<p class="mb-auto">Para empezar, añada una <a href="/app/add">nueva empresa</a>.</p>
	{/if}

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
					<p class="dropdown-header">No hay empresas</p>
				</li>
			{/if}
			<li><hr class="dropdown-divider" /></li>
			<li><a class="dropdown-item" href="/app/add">Añadir empresa</a></li>
			<li><a class="dropdown-item" href="/auth/logout">Cerrar sesión</a></li>
		</ul>
	</div>
</div>

<style>
	.logoImg {
		width: 1.5rem;
	}
</style>
