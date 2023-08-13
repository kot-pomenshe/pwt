<script>
	export let data;
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Добавить новый словарь</h1>
	<div class="container ">
		<form method="POST" action="?/add_dictionary">
			<div class="row mb-3 justify-content-center">
				<label for="lang1" class="col-sm-1 col-form-label">Язык 1</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="lang1" name="language1" />
				</div>
			</div>
			<div class="row mb-3 justify-content-center">
				<label for="lang2" class="col-sm-1 col-form-label">Язык 2</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="lang2" name="language2" />
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
