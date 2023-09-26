<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<svelte:head>
	<title>Восстановить пароль</title>
</svelte:head>

<section>
	<h1>Восстановление пароля</h1>
	<div class="container">
		<form method="POST" action="?/reset_password">
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">Введите e-mail</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" id="inputEmail3" name="email" />
				</div>
				{#if form?.user_not_found}<p class="error">Пользователь не найден</p>{/if}
			</div>
			<p>Автоматическое восстановление пароля будет доступно в одном из следующих обновлений.</p>
				<p>Для воостановления пароля свяжитесь со службой поддержки.</p>
				<p>personal_word_trainer_01@mail.ru</p>
			<div class="flex">
				<div class="block marg-a ">
					<button type="submit" disabled class="width10 btn btn-primary">Восстановить</button>
				</div>
			</div>
		</form>
	</div>
</section>

<style>
	h1 {
		text-align: center;
		margin-top: 8%;
		margin-bottom: 2rem;
	}
	.flex {
		display: flex;
	}
	.block {
		display: block;
	}
	.marg-a {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
	}
	.container{
		width:60%;
		margin-bottom: 8%;
	}
	.btn{
		width: 20rem;
		margin-top: 1rem;
	}
	.width10{
		width: 100%;
	}
</style>
