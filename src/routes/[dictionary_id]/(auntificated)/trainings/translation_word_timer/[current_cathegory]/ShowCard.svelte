<script>
	export let word, variants;
	import { onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let selected_answer;
	
	let elapsed = 0;
	let duration = 10000;

	let last_time = window.performance.now();
	let frame;

	(function update() {
		frame = requestAnimationFrame(update);

		const time = window.performance.now();
		elapsed += Math.min(time - last_time, duration - elapsed);
		last_time = time;

		if ((duration-elapsed) == 0) { dispatch('nextword', '')}
	})();

	onDestroy(() => {
		cancelAnimationFrame(frame);
	});
</script>

<h1>Выберите ответ</h1>
<div class="d-flex">
	<div class="card" style="width: 45rem;">
		<div class="card-body">
			<h4 class="card-title">{word.name2}</h4>

			<div class="flex">
				<div class="inlb_left">
					<img
						src={word.picturepath}
						class="card-img-top"
						height="200"
						alt="картинка к слову"
					/>
				</div>
				<div class="inlb_right">
					{#each variants as variant}
						<ul class="list-group list-group-horizontal">
							<li class="list-group-item fixed_li">
								<label>
									<input
										class="form-check-input"
										type="radio"
										bind:group={selected_answer}
										name="scoops"
										value={variant}
									/>
									{variant}
								</label>
							</li>
						</ul>
					{/each}
				</div>
			</div>
		</div>
		<div class="card-body">
			Осталось:
			<div>{(duration / 1000 - elapsed / 1000).toFixed(1)} секунд </div>
			<progress value={1 - elapsed / duration} />
		</div>
		<div class="d-flex">
			<button
				on:click={() => dispatch('nextword', selected_answer)}
				class="btn btn-primary"
				disabled={!selected_answer}>Выбрать</button
			>
		</div>
	</div>
</div>

<style>
	h1 {
		text-align: center;
		margin-top: 1%;
	}

	.card {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1%;
		margin-top: 1%;
	}
	.btn {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
		margin-top: 1rem;
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
	}

	.btn-primary {
		--bs-btn-color: #f0f0f0;
		--bs-btn-bg: #009d9e;
		--bs-btn-border-color: #f0f0f0;
	}

	.btn:hover {
		color: #161616;
		background-color: #7cc1ac;
		border-color: #009d9e;
	}
	.btn[disabled]{
		background: #7cc1ac;
		border-color: #009d9e;
	} 
	.fixed_li {
		width: 20rem;
	}
	.green {
		color: #009d9e;
	}
	.inlb_left {
		float: left;
	}
	.inlb_right {
		float: right;
	}
	progress{
		background-color:#009d9e;
		border: 1px;
  		height: 9px;
  		border-radius: 10vw;
	}
</style>
