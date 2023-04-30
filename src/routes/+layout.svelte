<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import bootstrapUrl from 'bootstrap/dist/js/bootstrap.bundle?url';
</script>

<svelte:head>
	<script src={bootstrapUrl}></script>
</svelte:head>

<slot />
