<script lang="ts">
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import bootstrapUrl from 'bootstrap/dist/js/bootstrap.bundle?url';

	import '../lib/custom.scss';
</script>

<svelte:head>
	<script src={bootstrapUrl}></script>
</svelte:head>

<slot />
