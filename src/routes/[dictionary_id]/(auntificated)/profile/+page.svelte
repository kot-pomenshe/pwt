<script>
	import { enhance } from '$app/forms';
	export let form;
	export let data;
	let username = data.login;
	let email = data.email;
</script>

<svelte:head>
	<title>Профиль</title>
</svelte:head>

<section>
	<h1>Редактировать профиль</h1>

	<div class="container">
		<div class="inlb right btn-groupe">
			<button type="button" disabled class="btn btn-primary btn-left btn-red">Удалить профиль</button>

			<form method="POST" action="?/exit">
				<button type="submit" class="btn btn-primary">Выйти</button>
			</form>
		</div>
		<form method="POST" use:enhance action="?/edit_profile">
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">Логин</label>
				<div class="col-sm-10">
					<input type="login" class="form-control" id="inputLogin3" name="login" value="{username}"/>
				</div>
			</div>
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">e-mail</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" id="inputEmail3" name="email" value="{email}" />
				</div>
			</div>
			<div class="row mb-3">
				<label for="inputPassword3" class="col-sm-2 col-form-label">Пароль</label>
				<div class="col-sm-10">
					<input
						type="password"
						class="form-control"
						id="inputPassword3"
						name="password"
						value="************"
					/>
				</div>
			</div>
			<div class="row mb-3">
				<label for="selectLanguage" class="col-sm-2 col-form-label">Язык системы</label>
				<div class="col-sm-10">
					<select class="form-select" aria-label="Язык системы" id="selectLanguage">
						<option value="1">Русский</option>
					</select>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">Сохранить изменения</button>
		</form>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 5%;
	}
	.inlb {
		display: flex;
		flex-direction: row-reverse;
	}
	.right{
		right: 0;
	}
	.btn-left{
		margin: 0 0 0 7pt;
	}
	.btn-groupe{
		margin: 0 0 15pt 0;
	}
	.btn-red{
		background-color: #8A307F;
	}
</style>
