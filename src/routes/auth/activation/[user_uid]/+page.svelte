<script>
	export let data;
	//сюда попадёт объект с полем success из page.server.js
</script>

<svelte:head>
	<title>Активация</title>
</svelte:head>

<section>
	{#if data.is_activation_success}
		<h1>Аккаунт успешно активирован</h1>
		<a class="nav-link" href="/auth/signin">Войти в аккаунт</a>
	{:else}
		<h1>Ошибка при активации аккаунта</h1>
	{/if}
</section>

<style>
	h1 {
		text-align: center;
		padding: 0 0 20px 0;
	}
</style>
