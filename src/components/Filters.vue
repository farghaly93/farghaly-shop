<template>
	<div>
		<div @click="filters = !filters" class="toggle">
			<div class="bar" :key="i" v-for="i in [1,2,3,4,5]"></div>
		</div>
		<transition name="slide">
		<div v-show="filters" class="filters">
			<div :key="char" v-for="char in Object.keys(charsObject)" class="card">
				<article class="card-group-item">
					<header class="card-header">
						<h6 class="title">{{charsObject[char]}} </h6>
					</header>
					<div class="filter-content">
						<div style="padding: 33px" class="card-body">
							<form>
								<app-filterSection :char="char" :cat="cat"/>
							</form>
						</div> <!-- card-body.// -->
					</div>
				</article> <!-- card-group-item.// -->
			</div> <!-- card.// -->
		</div>
		</transition>
	</div>
</template>

<script>
	import filterSection from '../components/filterSection.vue';
	export default {
		created() {
			//console.log('kokokoko',this.charsObject);
		},
		props: ['charsObject', 'cat'],
		components: {
			appFilterSection: filterSection
		},
		data() {
			return {
				filters: true,
				width: window.innerWidth
			}
		},
	}
</script>

<style scoped>
	.filter-content {
		overflow: scroll;
		height: 200px;
	}
	.filter-content::-webkit-scrollbar {
  		display: none;
	}

/* Hide scrollbar for IE and Edge */
	.filter-content {
	-ms-overflow-style: none;
	}
	.title {
		color: rgb(104, 61, 104);
		font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
		font-weight: bolder;
	}
	.toggle {
		width: 70px;
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		padding: 5px;
		cursor: pointer;
	}
	.bar {
		background-color: #666;
		width: 80%;
		margin: 1px;
		height: 5px;
		border-radius: 4px;
		background-image: -moz-linear-gradient(rgb(77, 75, 75), rgb(145, 143, 143), rgb(167, 164, 164));
		border-bottom-color: #ccc;
		border-bottom-width: 1px;
	}
	.card-header {
		background-image: -moz-linear-gradient(rgb(171, 145, 185), rgb(229, 226, 226), rgb(252, 252, 252));
	}
	@media screen and (min-width: 1000px) {
		.toggle {
			display: none;
		}
	}
	@media screen and (max-width: 1000px) {
	}

	.slide-leave-active {
        transition: opacity .2s ease;
        opacity: 0;
        animation: slide-out .2s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in .2s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }
	
</style>