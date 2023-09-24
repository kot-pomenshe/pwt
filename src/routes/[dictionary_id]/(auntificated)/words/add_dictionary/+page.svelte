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
	section {
	background-color: #f0f0f0;
	color: #009d9e;
	nav-tabs-link-active-bg: #7cc1ac;
	display: block;
	padding: 70px 0 0 0px;
}

.card {
	color: #161616;
	background: #d5ece6;
}

.btn,
.btn-primary {
	--bs-btn-color: #f0f0f0;
	--bs-btn-bg: #009d9e;
	--bs-btn-border-color: #f0f0f0;
}

.btn:hover {
    color: #161616;
    background-color: #7cc1ac;;
    border-color: #009d9e;
}

body {
	background-color: #f0f0f0;
}



</style>
