<template>
	<div ref="wrapper" class="list-wrapper">
		<div class="scroll-content">
			<div ref="listWrapper">
				<slot>
					<div class="content">
						<div v-for="(item,index) in data" :key="index">
							<div v-if="!item.isUser" class="list-item left">
								<div class="left-contemt left">
									<div class="left-imgHeader left l"  :style="{backgroundColor:item.bgc,color:item.color}">{{item.last_name}}</div>
									<div class="name left" style="width:100%;">{{item.name}}&nbsp;&nbsp;{{item.time}}</div>
									<div v-if="item.msgType==0" class="message left"><i></i>{{item.msg}}</div>
									<div v-if="item.msgType==3" class="message left"><i></i><img :src="item.msg" alt="表情" /></div>
									<div v-if="item.msgType==1" class="message left" style="background-color: rgba(0,0,0,0);padding:0;">
										<p style="margin: 14px 0;">{{item.fileName}}</p>
										<el-tooltip class="item" effect="dark" content="点击下载" placement="right">
											<a :href="item.download" download>
												<img :src="item.path" alt="" />
											</a>
										</el-tooltip>
									</div>
									<div v-if="item.msgType==2" class="message left" style="background-color: rgba(0,0,0,0);padding:0;">
										<p style="margin: 14px 0;">{{item.fileName}}</p>
										<el-tooltip class="item" effect="dark" content="点击下载" placement="right">
											<a :href="item.download" download>
												<img width="100" src="../assets/img/doc.png" alt="" />
												<!--<i style="font-size:60px;color:red;" class="el-icon-document"></i>-->
											</a>
										</el-tooltip>
									</div>
								</div>
							</div>
							<div v-else class="list-item right">
								<div class="right-contemt right">
									<div class="right-imgHeader right r"  :style="{backgroundColor:item.bgc,color:item.color}">{{item.last_name}}</div>
									<div class="name right" style="text-align: right;width:100%;">{{item.time}}&nbsp;&nbsp;{{item.name}}</div>
									<div v-if="item.msgType==0" class="message right" style="background-color:#9eea6a;"><i></i><p class="right">{{item.msg}}</p></div>
									<div v-if="item.msgType==3" class="message right" style="background-color:#9eea6a;"><i></i><p class="right"><img :src="item.msg" alt="表情" /></p></div>
									<div v-if="item.msgType==1" class="message right" style="background-color: rgba(0,0,0,0);padding:0;">
										<p style="margin: 14px 0;">{{item.fileName}}</p>
										<el-tooltip class="item" effect="dark" content="点击下载" placement="left">
											<a :href="item.download" download>
												<img :src="item.path" alt="" />
											</a>
										</el-tooltip>
									</div>
									<div v-if="item.msgType==2" class="message right" style="background-color: rgba(0,0,0,0);padding:0;">
										<p style="margin: 14px 0;">{{item.fileName}}</p>
										<el-tooltip class="item" effect="dark" content="点击下载" placement="left">
											<a :href="item.download" download>
												<img width="100" src="../assets/img/doc.png" alt="" />
												<!--<i style="font-size:60px;color:red;" class="el-icon-document"></i>-->
											</a>
										</el-tooltip>
									</div>
								</div>
							</div>
						</div>
					</div>
				</slot>
			</div>
			<slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
		</div>
		<slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown" :bubbleY="bubbleY">
			<div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
				<div class="before-trigger" v-if="beforePullDown">
					<bubble :y="bubbleY"></bubble>
				</div>
				<div class="after-trigger" v-else>
					<div v-if="isPullingDown" class="loading">
						<loading></loading>
					</div>
					<div v-else><span>{{refreshTxt}}</span></div>
				</div>
			</div>
		</slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	//import BScroll from '../../../src/index'
	import Loading from './loading/loading.vue'
	import Bubble from './bubble/bubble.vue'
	import { getRect } from './dom'

	const COMPONENT_NAME = 'scroll'
	const DIRECTION_H = 'horizontal'
	const DIRECTION_V = 'vertical'

	export default {
		name: COMPONENT_NAME,
		props: {
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			isPush: {
				type: Boolean,
				default: false
			},
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			listenBeforeScroll: {
				type: Boolean,
				default: false
			},
			listenScrollEnd: {
				type: Boolean,
				default: false
			},
			direction: {
				type: String,
				default: DIRECTION_V
			},
//			scrollbar: {
//				type: null,
//				default: false
//			},
//			pullDownRefresh: {
//				type: null,
//				default: false
//			},
//			pullUpLoad: {
//				type: null,
//				default: false
//			},
//			startY: {
//				type: Number,
//				default: 0
//			},
			refreshDelay: {
				type: Number,
				default: 20
			},
			freeScroll: {
				type: Boolean,
				default: false
			},
			mouseWheel: {
				type: Boolean,
				default: false
			},
			bounce: {
				default: true
			},
			zoom: {
				default: false
			},
			
		},
		data() {
			return {
				scrollbar: true,
				scrollbarFade: true,
				pullDownRefresh: true,
				pullDownRefreshThreshold: 90,
				pullDownRefreshStop: 40,
				pullUpLoad: true,
				pullUpLoadThreshold: 0,
				startY: 0,
				
				beforePullDown: true,
				isRebounding: false,
				isPullingDown: false,
				isPullUpLoad: false,
				pullUpDirty: true,
				pullDownStyle: '',
				bubbleY: 0,
			}
		},
		computed: {
			pullUpTxt() {
//				const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || '啊哈哈啊哈111';
//
//				const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || '啊哈哈啊哈';

				return '';//this.pullUpDirty ? moreTxt : noMoreTxt
			},
			refreshTxt() {
				return(this.pullDownRefresh && this.pullDownRefresh.txt)
			},
			scrollbarObj() {
				return this.scrollbar ? {
					fade: this.scrollbarFade
				} : false
			},
			pullDownRefreshObj() {
				return this.pullDownRefresh ? {
					threshold: parseInt(this.pullDownRefreshThreshold),
					stop: parseInt(this.pullDownRefreshStop)
				} : false
			},
			pullUpLoadObj() {
				return this.pullUpLoad ? {
					threshold: parseInt(this.pullUpLoadThreshold),
					txt: {
						more: this.pullUpLoadMoreTxt,
						noMore: this.pullUpLoadNoMoreTxt
					}
				} : false;
			}
		},
		created() {
			this.pullDownInitTop = -50
		},
		mounted() {
			setTimeout(() => {
				this.initScroll()
			}, 10)
		},
		destroyed() {
			this.$refs.scroll && this.$refs.scroll.destroy()
		},
		methods: {
			initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				if(this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
					this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
				}

				let options = {
					probeType: this.probeType,
					click:true,
					tap:true,
					//preventDefault:false,
					preventDefaultException:{
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV|P|p)$/,
						className:/(^|\s)message(\s|$)/
					},
					scrollY: this.freeScroll || this.direction === DIRECTION_V,
					scrollX: this.freeScroll || this.direction === DIRECTION_H,
					scrollbar: this.scrollbar,
					pullDownRefresh: this.pullDownRefresh,
					pullUpLoad: this.pullUpLoad,
					startY: this.startY,
					freeScroll: this.freeScroll,
					mouseWheel:true,
					bounce: this.bounce,
					zoom: this.zoom
				}

				this.scroll = new BScroll(this.$refs.wrapper, options)
				setTimeout(() => {
					this.scroll.scrollTo(0, this.scroll.maxScrollY)
				}, 100)
				
				if(this.listenScroll) {
					this.scroll.on('scroll', (pos) => {
						this.$emit('scroll', pos)
					})
				}

				if(this.listenScrollEnd) {
					this.scroll.on('scrollEnd', (pos) => {
						this.$emit('scroll-end', pos)
					})
				}

				if(this.listenBeforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScrollStart')
					})

					this.scroll.on('scrollStart', () => {
						this.$emit('scroll-start')
					})
				}

				if(this.pullDownRefresh) {
					this._initPullDownRefresh()
				}

				if(this.pullUpLoad) {
					this._initPullUpLoad()
				}
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			autoPullDownRefresh() {
				this.scroll && this.scroll.autoPullDownRefresh()
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			},
			clickItem(e, item) {
				console.log(e)
				this.$emit('click', item)
			},
			destroy() {
				this.scroll.destroy()
			},
			forceUpdate(dirty) {
				if(this.pullDownRefresh && this.isPullingDown) {
					this.isPullingDown = false
					this._reboundPullDown().then(() => {
						this._afterPullDown()
					})
				} else if(this.pullUpLoad && this.isPullUpLoad) {
					this.isPullUpLoad = false
					this.scroll.finishPullUp()
					this.pullUpDirty = dirty
					this.refresh()
				} else {
					this.refresh()
				}
			},
			_initPullDownRefresh() {
				this.scroll.on('pullingDown', () => {
					this.beforePullDown = false
					this.isPullingDown = true
					this.$emit('pullingDown')
				})

				this.scroll.on('scroll', (pos) => {
					if(!this.pullDownRefresh) {
						return
					}
					if(this.beforePullDown) {
						this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
						this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
					} else {
						this.bubbleY = 0
					}

					if(this.isRebounding) {
						this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
					}
				})
			},
			_initPullUpLoad() {
				this.scroll.on('pullingUp', () => {
					this.isPullUpLoad = true
					this.$emit('pullingUp')
				})
			},
			_reboundPullDown() {
				const {
					stopTime = 600
				} = this.pullDownRefresh
				return new Promise((resolve) => {
					setTimeout(() => {
						this.isRebounding = true
						this.scroll.finishPullDown()
						resolve()
					}, stopTime)
				})
			},
			_afterPullDown() {
				setTimeout(() => {
					this.pullDownStyle = `top:${this.pullDownInitTop}px`
					this.beforePullDown = true
					this.isRebounding = false
					this.refresh()
				}, this.scroll.options.bounceTime)
			},
			rebuildScroll() {
		     this.$nextTick(() => {
	          this.scroll.destroy()
	          this.scroll.initScroll()
	        })
		   }
		},
		watch: {
			data() {
				console.log('啊嘎嘎嘎嘎嘎',this.isPush)
				this.$nextTick().then(()=>{
					if(this.isPush) {
						setTimeout(() => {
							this.scroll&&this.scroll.scrollTo(0, this.scroll.maxScrollY)
						}, 500)
						
					}else{
						setTimeout(() => {
							this.forceUpdate(true)
						}, this.refreshDelay)
					}
				})
			},
			scrollbarObj: {
				handler() {
					this.rebuildScroll()
				},
				deep: true
			},
			pullDownRefreshObj: {
				handler() {
					this.rebuildScroll()
				},
				deep: true
			},
			pullUpLoadObj: {
				handler() {
					this.rebuildScroll()
				},
				deep: true
			},
			startY() {
				this.rebuildScroll()
			},
		},
		components: {
			Loading,
			Bubble
		}
	}
</script>

<style lang="scss" scoped>
	.list-wrapper {
		position: relative;
		height: 100%;
		overflow: hidden;
	}
	
	.scroll-content {
		position: relative;
		z-index: 1;
	}
	
	.list-content {
		position: relative;
		z-index: 10;
	}
	
	.pulldown-wrapper {
		position: absolute;
		width: 100%;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all;
	}
	
	.after-trigger {
		margin-top: 10px;
	}
	
	.pullup-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px 0;
	}
	
	.content {
		width: 100%;
		padding-top: 30px;
		padding-bottom: 30px;
	}
	
	.list-item {
		width: 100%;
		margin: 20px 0;
		padding: 0 40px;
		/*overflow: hidden;*/
		box-sizing: border-box;
	}
	
	.left-imgHeader,
	.right-imgHeader {
		width: 30px;
		height: 30px;
		position: absolute;
		top: 0;
		font-size: 16px;
		color: #333;
		text-align: center;
		line-height: 30px;
		border-radius: 50%;
		background-color: #ccc;
	}
	
	.left {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	.l {
		left: -30px;
	}
	
	.r {
		right: -30px;
	}
	
	.left-contemt {
		width:100%;
		position: relative;
		padding-left: 10px;
	}
	
	.right-contemt {
		width:100%;
		position: relative;
		padding-right: 10px;
	}
	
	.name {
		font-size: 13px;
		color: #999;
	}
	
	.message {
		margin-top: 5px;
		max-width: 50%;
		font-size: 15px;
		color: #000;
		background-color: #e7e7e7;
		padding: 10px;
		border-radius: 5px;
		word-break: break-all;
		p {
			text-align: center;
		}
		p.right {
			text-align: justify;
		}
		a {
			display: block;
			max-width: 100%;
			text-align: center;
			cursor: pointer;
			img {
				vertical-align: top;
				max-width: 100%;
			}
		}
		i{
			width:12px;
			height: 14px;
			position: absolute;
			top:24px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 100%;
		}
	}
	.message.left i{
		left:4px;
		background-image: url(../assets/img/corner1.png);
	}
	.message.right i{
		right:4px;
		background-image: url(../assets/img/corner2.png);
	}
</style>