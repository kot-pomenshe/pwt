<script>
	import Header from './Header.svelte';
	import '../styles.css';
	import {login, dictionary} from '$lib/stores'
	export let data;

	let {user_name, user_id, dictionaries, current_dictionary} = data;
	$login = user_name;
	$dictionary = current_dictionary;
</script>

<div class="app">
	<Header user_id={user_id} dictionaries={dictionaries?.dictionaries} />

	<main>
		<slot />
	</main>
</div>

<style>
.app{
	background-color: #f0f0f0;
}
body{
	background-color: #f0f0f0;
}
</style>
