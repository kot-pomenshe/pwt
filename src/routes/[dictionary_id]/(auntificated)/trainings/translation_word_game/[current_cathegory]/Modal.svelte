<script>
	export let showModal;
	let dialog;

	$: if (dialog && showModal) dialog.showModal();

    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
    on:close={() => dispatch('notify')}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} >Круто!</button>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
	}
	dialog > div {
		padding: 1em;
	}
</style>
