<script>
	export let data;
	export let form;
</script>

<svelte:head>
	<title>Словарь</title>
</svelte:head>

<section>
	<h1>Импортировать категорию</h1>
	<div class="container ">
		<p>
			Если вы желаете добавить к себе слова, введённые вашим другом или преподавателем,
			введите ID категори, в которую были добавлены эти слова.
		</p>
		<p>Идентификатор доступен на странице редактирования категории.</p>
		<form method="POST" action="?/import_cathegory">
			<div class="row mb-3 justify-content-center">
				<label for="lang1" class="col-sm-1 col-form-label">ID</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" id="lang1" name="cathegory" />
				</div>
				{#if form?.different_dictionaries}<p class="error">Словарь категории не совпадает с текущим словарём</p>{/if}
			</div>
			<div class="flex">
				<button type="submit" class="btn btn-primary">Импортировать</button>
			</div>
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
	.container {
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
