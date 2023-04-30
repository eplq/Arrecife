<script lang="ts">
	export let name: string;

	let firstCharacter = 'A';
	$: firstCharacter = name.length ? name.charAt(0) : 'A';
</script>

<div class="fw-bolder border rounded squared d-flex justify-content-center align-items-center">
	{firstCharacter}
</div>

<style>
	.squared {
		width: 32px;
		height: 32px;
	}
</style>
