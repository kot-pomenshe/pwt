<script>
	export let data;
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Добавить категорию</h1>
	<div class="container ">
		<form method="POST" action="?/add_cathegory">
			<div class="row mb-3 justify-content-center">
				<label for="lang1" class="col-sm-1 col-form-label">Название</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="lang1" name="cathegory" />
				</div>
			</div>
			<div class="flex"><button type="submit" class="btn btn-primary">Добавить</button></div>
		</form>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 8%;
		margin-bottom: 2%;
	}
	.btn {
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
	}
	.flex {
		display: flex;
	}
	.container{
		margin-bottom: 8%;
	}
</style>
