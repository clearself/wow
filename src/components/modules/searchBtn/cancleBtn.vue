<template>
	<div class="btn_box" @click="searchBtn">
		<button class="btn">{{title}}
			<i class="left_border1"></i>
			<i class="left_border2"></i>
			<i class="right_border1"></i>
			<i class="right_border2"></i>
			<i class="top_light"></i>
			<i class="bottom_light"></i>
		</button>
	</div>
</template>

<script>
export default {
  name: 'CancleBtn',
  props: {
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    searchBtn() {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
	.btn {
		padding: 0;
		margin: 0;
		border: none;
		outline: none
	}

	.btn_box {
		cursor: pointer;
		display: inline-block;
	}

	.btn_box+.btn_box {
		margin-left: 10px;
	}

	.btn {
		position: relative;
		width: 110px;
		height: 35px;
		box-sizing: border-box;
		border: 1px solid #33c4f1;
		background: url(./images/btn_bg2.png) no-repeat 50% 22px #1e3e67;
		color: #fff;
		font-size: 14px;
		font-family: "微软雅黑";
		pointer-events: none;
		/*穿透效果*/
	}

	.btn i {
		display: block;
		position: absolute;
		background-repeat: no-repeat;
		z-index: 1;
		width: 5px;
		height: 5px;
	}

	.btn .left_border1 {
		background: url(./images/top_left.png);
		top: -1px;
		left: -1px
	}

	.btn .left_border2 {
		background: url(./images/bottom_left.png);
		bottom: -1px;
		left: -1px
	}

	.btn .right_border1 {
		background: url(./images/top_right.png);
		top: -1px;
		right: -1px
	}

	.btn .right_border2 {
		background: url(./images/bottom_right.png);
		bottom: -1px;
		right: -1px
	}

	.btn .top_light {
		width: 90px;
		height: 24px;
		/*background: url(./images/top_light.png) no-repeat;*/
		position: absolute;
		z-index: 3;
		left: 50%;
		margin-left: -45px;
		top: -2px;
	}

	.btn .bottom_light {
		width: 108px;
		height: 64px;
		/*background: url(./images/bottom_light.png) no-repeat;*/
		position: absolute;
		z-index: 2;
		left: 50%;
		margin-left: -54px;
		bottom: -30px;
	}
</style>
