<script>
	
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import './styles.css';

</script>

<div class="app">


	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app{
		background-color: #f0f0f0;
	}
</style>
