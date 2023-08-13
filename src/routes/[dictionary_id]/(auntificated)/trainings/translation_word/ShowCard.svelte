<script>
	export let word, variants;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let selected_answer;
	$: console.log(`sel answ `, selected_answer);
</script>

<h1>Выберите ответ</h1>
<div class="d-flex">
	<div class="card" style="width: 45rem;">
		<div class="card-body">
			<h4 class="card-title">{word.name2}</h4>
			
				<div class="flex">
					<div class="inlb_left">
						<img
							src={`/` + word.path}
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
			
			
		</div><div class="d-flex">
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
</style>
