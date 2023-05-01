<script lang="ts">
	import type { LayoutServerData } from '../$types';
	import type { PageServerData } from './$types';

	export let data: PageServerData & LayoutServerData;
</script>

{data.currentCompany?.NIF}
