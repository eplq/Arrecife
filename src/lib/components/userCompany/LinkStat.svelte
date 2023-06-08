<script lang="ts">
	export let name: string;
	export let stat: number;
	export let bsIconClass: string;
	export let href: string;
</script>

<a {href} class="card col-5">
	<div class="row">
		<div class="col-4 d-flex justify-content-center align-items-center">
			<i class={`bi fs-2 ${bsIconClass}`} />
		</div>
		<div class="col-8 text-dark">
			<div class="card-body">
				<h2 class="card-title fs-4">{name}</h2>
				<p class="card-text">{stat}</p>
			</div>
		</div>
	</div>
</a>
