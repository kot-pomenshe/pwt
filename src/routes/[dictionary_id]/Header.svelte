<script>
	import { login, dictionary as dictionary_store, words } from '$lib/stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let user_id, dictionaries;

	onMount(async() => { 
		
		if(!dictionaries?.length) return;
		const stored = localStorage.getItem("dict");
		$dictionary_store = JSON.parse(stored || JSON.stringify(dictionaries[0]));
		dictionary_store.subscribe((value) => localStorage.setItem("dict", JSON.stringify(value)));
		
		//await selectDictionary($dictionary_store);
		
	});
		
	async function selectDictionary(dictionary) {
		$dictionary_store = dictionary;
		$words = await fetch(`/${dictionary.dictionary_id}`, {method: "POST", body: JSON.stringify(dictionary)}).then(r => r.json()).then(j => j.words.word_data);
		goto(`/${dictionary.dictionary_id}`);
		//console.log(`wrds: `, $words);	
	}
</script>

<header id="header" class="fixed-top bg-body-tertiary">
	<nav class="navbar navbar-expand-lg ">
		<div class="container">
			<a class="navbar-brand" href="/">
				<img
					src="/PWT_logo.svg"
					alt="Logo"
					height="22"
					class="d-inline-block align-text-top"
				/>
				<!-- PWT -->
			</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navContent"
				aria-controls="navContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navContent">
				<ul class="navbar-nav mr-auto mb-3 mb-lg-0">
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={$page.url.pathname.includes('/trainings/choose_train')}
							href="/{$dictionary_store.dictionary_id}/trainings/choose_train">Тренировки</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={$page.url.pathname === '/words/dictionary'}
							href="/{$dictionary_store.dictionary_id}/words/dictionary">Словарь</a
						>
					</li>
					<li class="nav-item">
						{#if !$login}
							<a
								class="nav-link"
								class:active={$page.url.pathname === '/auth/signin'}
								href="/auth/signin">Войти</a
							>
						{:else}
							<a
								class="nav-link"
								class:active={$page.url.pathname === '/profile'}
								href="/{$dictionary_store.dictionary_id}/profile">{$login}</a
							>
						{/if}
					</li>
				</ul>
				{#if $login}
					<div class="nav nav-pills nav-fill mr-2" id="navbarNavDropdown">
						<ul class="navbar-nav">
							<li class="nav-item dropdown">
								<a
									class="nav-link dropdown-toggle"
									href="#1"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{$dictionary_store?.name}
								</a>
								<ul class="dropdown-menu">
									{#each dictionaries as dictionary}
										<li>
											<button
												type="button"
												class="btn btn-primary dropdown-item"
												on:click={() => selectDictionary(dictionary)}
												>{dictionary.name}</button
											>
										</li>
									{/each}
									<li>
										<a class="dropdown-item" href="/{$dictionary_store.dictionary_id}/words/add_dictionary"
											>Добавить словарь</a
										>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</nav>
</header>

<style>
	.navbar-nav .nav-link.active,
	.navbar-nav .show > .nav-link {
		color: #009d9e;
	}
</style>
