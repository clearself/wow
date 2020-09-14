<template>
	<div class="ub button-wrapper" :style="{width:width}">
		<div class="ub ub-ac ub-pc ub-f1 button" @click="buttonClick" :style="{ color: activeColor, fontSize: fontSize,backgroundColor: activeBgc,borderColor:borderColor,borderRadius:borderRadius,height:height }">{{title}}</div>
	</div>
</template>

<script>
	export default {
		name:'qmButton',
		props:{
			title:{
				type: String,
				default:'确定'
			},
			activeColor:{
				type: String,
				default:'#ffffff'
			},
			borderColor:{
				type: String,
				default:'rgba(0,0,0,0)'
			},
			borderRadius:{
				type: String,
				default:'20px'
			},
			activeBgc:{
				type: String,
				default:'#ffffff'
			},
			fontSize:{
				type: String,
				default:'18px'
			},
			width:{
				type: String,
				default:'50px'
			},
			height:{
				type: String,
				default:'30px'
			},
			
		},
		data(){
			return{
				startBg:false,
				endBg:false
			}
		},
		mounted(){
			var that = this;
//			this.$refs.buttonMask.addEventListener("touchstart",function(e){
//				that.startBg = true;
//				that.endBg = false;
//		    },false);
//		    this.$refs.buttonMask.addEventListener("touchmove",function(e){
//		    	
//				that.startBg = true;
//				that.endBg = false;
//		    },false);
//		    this.$refs.buttonMask.addEventListener("touchend",function(e){
//		    	
//		    	that.startBg = false;
//				that.endBg = true;
//		    },false);
		},
		methods:{
			buttonClick(){
				this.$emit('click');
			}
		}
	}
</script>

<style lang='scss' scoped>
.ub {
	display: -webkit-box!important;
	display: -moz-box!important;
	display: -ms-flexbox!important;
	display: -o-box!important;
	display: box!important;
	position: relative;
}
.ub-ac {
	-webkit-box-align: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	-o-box-align: center;
	box-align: center;
}
.ub-pc {
	-webkit-box-pack: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	-o-box-pack: center;
	box-pack: center;
}
.button-wrapper{
	width: 100px;
	font-size:0;
	cursor: pointer;
}
.button {
    height: 30px;
    border-radius:20px;
    color:#ffffff;
    font-size:14px;
   	box-shadow: 0 2px 6px rgba(0,0,0,.3);
	background: #449aff; /* Old browsers */
	background: -moz-linear-gradient(left, #449aff 0%, #37d5fc 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left, #449aff 0%,#37d5fc 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right, #449aff 0%,#37d5fc 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	transition: all .3s;
}
.button:hover{
	opacity: .8;
}
</style>