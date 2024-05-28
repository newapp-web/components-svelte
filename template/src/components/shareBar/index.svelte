<!-- ShareBar 分享组件 -->
<script>
	import intersection from "svelte-intersection-observer-directive";
	import facebook from "./images/facebook.png";
	import instagram from "./images/instagram.png";
	import telegram from "./images/telegram.png";
	import twitter from "./images/twitter.png";
	import whatsapp from "./images/whatsapp.png";
	import pinterest from "./images/pinterest.png";
	import { onDestroy } from "svelte";

	// 标题
	export let title;
	// 曝光回调
	export let onShow = ()=>{};
	// 点击回调
	export let onClick = (item)=>{};
	// @return item. 分享的某个平台
	/**
 * 点击之后的回调
 * @constructor
 * @return {object} item - 哪个平台触发的事件.
 */
	export let afterClick = (item)=>{};

	// 本地参数
	let timmer = null;
	let url = window.location.href;

	const list = [
		{
			label: "facebook",
			icon: facebook,
			url: "https://www.facebook.com/sharer/sharer.php?u="
		},
		{
			label: "twitter",
			icon: twitter,
			url: `https://x.com/share?text=${title}&url=`
		},
		{
			label: "whatsApp",
			icon: whatsapp,
			url: "https://api.whatsapp.com/send?text="
		},
		{
			label: "instagram",
			icon: instagram,
			url: `https://www.instagram.com/?text=${title}url=`
		},
		{
			label: "telegram",
			icon: telegram,
			url: "https://t.me/share/url?url="
		},
		{
			label: "pinterest",
			icon: pinterest,
			url: `https://pinterest.com/pin/create/button/?media=${"news"}&description=${title}&url=`
		}
	];
	function itemClick(item) {
		onClick(item);
		share();
		timmer = setTimeout((item) => {
			afterClick(item);
		}, 1000);
	}
	function handleEnterViewport() {
		onShow()
	}
	
	function share(item){
		window.open(item.url + url)
	}
	onDestroy(()=>{
		clearTimeout(timmer);
	});
</script>

<!-- sharebar -->
<div class="sharebar" use:intersection={{ threshold: 0.5 }} on:enterViewport={handleEnterViewport}>
	{#each list as item}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="social_item">
			<div
				on:click={(event) => {
					itemClick(item);
				}}
			>
				<img class="social_icon" src={item.icon} alt="item.label + ' share'" />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.sharebar {
		width: 100%;
		padding: 24px 0px;
		display: flex;
		.social_item {
			width: 64px;
			height: 64px;
			margin-right: 16px;
			&:last-child {
				margin-left: 0px;
			}
			img {
				width: 64px;
				height: 64px;
			}
		}
	}
</style>
