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
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="btn btn-primary">Круто!</button>
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.375rem;
		color: #161616;
		background: #d5ece6;
		border-color: rgba(0, 0, 0, 0.175);
		border-width: 1px;
		height: 90vh;
		overflow-y: hidden;
	}
	.btn-margin{
		margin-left: 1rem;
		margin-top: 0.5rem;
	}
	.btn {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
		margin-top: 1rem;
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
	}
	.btn:hover {
		color: #161616;
		background-color: #7cc1ac;
		border-color: #009d9e;
	}
</style>
