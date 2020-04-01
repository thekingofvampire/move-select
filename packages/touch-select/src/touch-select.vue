<template>
    <div class="wrap">
        <div
            class="container"
            @touchstart.stop.prevent
            @touchmove.stop.prevent
            @touchend.stop.prevent
        >
            <!-- 标题 -->
            <div class="wrap_title" v-if="title">
                <p>{{title.name}}</p>
                <p v-show="title.tips">{{title.tips}}</p>
            </div>
             
            <!-- 滑动内容 -->
            <div class="wrap_bg">
                <div class="wrap">
                    <div class="wrap_container">
                        <div
                            :class="['option_wrap',
								{
									'border':suoyin==1,
									'border_right':(suoyin>1&&suoyin<(option.length-1)),
								},
								'option_slot'+(suoyin+1),
							]"
                            v-for="(item,suoyin) in option"
                            :key="suoyin"
                            @touchstart.stop.prevent
                            @touchmove.stop.prevent
                            @touchend.stop.prevent
                        >
                            <p v-for="(ele,index) in item" :key="index">
                                <span
                                    :class="{
									'item_selected':index == selectIndex[suoyin],
									'item_scale0':index == selectIndex[suoyin]-3,
									'item_scale1':index == selectIndex[suoyin]-1,
									'item_scale2':index == selectIndex[suoyin]-2,
									'item_scale3':index == selectIndex[suoyin]+1,
									'item_scale4':index == selectIndex[suoyin]+2,
									'item_scale5':index == selectIndex[suoyin]+3,
								}"
                                >{{ele[name]}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="selected_option_bg">
                    <div class="selected_option"></div>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="btn_list" v-if="isBtn">
            <button>取消</button>
            <button @click="confirm">确认</button>
        </div>
    </div>
</template>
<script>
import { setTimeout } from "timers";
// import { setTimeout, setInterval, clearInterval } from "timers";
// import { stat } from "fs";
/** change函数
 * 值发生改变的函数  将事件或者值传给父组件   可以传参
 */

/** props
 * data   展示的数据u7u
 *
 */

/** props   dataOption
 * defaultIndex   默认选中的第几项
 *
 */

export default {
    name: "TouchSelect",
    // 接受的参数
    props: [
        "data",
        "name",
        "dataOption",
        "title",
        "children1",
        "children2",
        "isBtn"
    ],
    // 插件内数据初始化
    data() {
        return {
            option: [],
            selectIndex: [0, 0, 0],
            transition: [],
            optionDistance: 0,
            distance: 0,
            startTime: 0,
            endTime: 0,
            speed: 1,
            timer: null,
            index: null
        };
    },
    // 插件内部方法
    methods: {
        // 设置值
        setData() {
            // this.option[arguments[0]] = arguments[1];
            this.$set(this.option, arguments[0], arguments[1]);
            // this.$set(this.selectIndex, arguments[0], 0);
            // this.$set(this.transition, arguments[0], 80);
            // this.mLeave(arguments[0]);
            // $(".option_wrap")
            //     .eq(arguments[0] + 1)
            //     .css({
            //         transform: "translateY(" + 80 + "px)"
            //     });
        },
        bingdEvent() {
            var that = this;
            this.$nextTick(() => {
                // index的默认初始值
                that.option.forEach((ele, index) => {
                    if (this.dataOption[index].defaultIndex <= 0) {
                        that.transition.push(80);
                        that.$set(that.selectIndex, index, 0);
                        $(".option_wrap")
                            .eq(index)
                            .css({
                                transform: "translateY(" + 80 + "px)"
                            });
                    } else {
                        if (
                            ele.length - 1 <
                            this.dataOption[index].defaultIndex
                        ) {
                            that.transition.push(80);
                            that.$set(that.selectIndex, index, 0);
                            $(".option_wrap")
                                .eq(index)
                                .css({
                                    transform: "translateY(" + 80 + "px)"
                                });
                        } else {
                            that.transition.push(
                                80 - this.dataOption[index].defaultIndex * 45
                            );
                            $(".option_wrap")
                                .eq(index)
                                .css({
                                    transform:
                                        "translateY(" +
                                        (80 -
                                            this.dataOption[index]
                                                .defaultIndex *
                                                45) +
                                        "px)"
                                });
                            that.$set(
                                that.selectIndex,
                                index,
                                this.dataOption[index].defaultIndex
                            );
                        }
                    }
                });
                var optionWrap = $(".option_wrap");
                var index, start;
                $(".option_wrap").on("touchstart", function(event) {
                    that.optionDistance = 0;
                    that.distance = 0;
                    if (that.timer) {
                        clearInterval(that.timer);
                    }
                    index = $(this).index();
                    that.index = $(this).index();
                    start = event.targetTouches[0].clientY;
                    that.startTime = new Date().getTime();
                    that.touchmove(index, start);
                    that.touchend(index);
                });
            });
        },
        touchmove(index, start) {
            var that = this;
            $(".option_wrap")
                .eq(index)
                .on("touchmove", function(event) {
                    that.distance = event.targetTouches[0].clientY - start;
                    that.optionDistance =
                        that.transition[index] + that.distance;
                    $(this).css({
                        transform: "translateY(" + that.optionDistance + "px)"
                    });
                    if (80 - that.optionDistance < 0) {
                        that.$set(that.selectIndex, index, 0);
                    } else if (
                        that.optionDistance <
                        80 + 45 - that.option[index].length * 45
                    ) {
                        that.$set(
                            that.selectIndex,
                            index,
                            that.option[index].length - 1
                        );
                    } else {
                        that.$set(
                            that.selectIndex,
                            index,
                            Math.abs(
                                Math.round((80 - that.optionDistance) / 45)
                            )
                        );
                    }
                });
        },
        touchend(index) {
            var that = this;
            $(".option_wrap")
                .eq(index)
                .on("touchend", function(event) {
                    that.endTime = new Date().getTime();
                    that.mLeave(index);
                });
        },
        bounce(index) {
            var that = this;
            if (that.optionDistance > 80) {
                // 当列表应滚动的距离小于80  说明一直在往下滑动，需要回到弹到顶部
                $(".option_wrap")
                    .eq(index)
                    .css({
                        transform: "translateY(" + 80 + "px)"
                    });
                that.$set(that.transition, index, 80);
            } else if (
                that.optionDistance <
                80 + 45 - that.option[index].length * 45
            ) {
                // 当列表应滚动的距离小于整个列表的从上滑到下的高度  说明已经滑到最底部了  需要回弹
                $(".option_wrap")
                    .eq(index)
                    .css({
                        transform:
                            "translateY(" +
                            (80 + 45 - that.option[index].length * 45) +
                            "px)"
                    });
                that.$set(
                    that.transition,
                    index,
                    80 + 45 - that.option[index].length * 45
                );
            } else {
                // 正常的滑动回弹
                $(".option_wrap")
                    .eq(index)
                    .css({
                        transform:
                            "translateY(" +
                            (80 - that.selectIndex[index] * 45) +
                            "px)"
                    });
                that.$set(
                    that.transition,
                    index,
                    (2 - that.selectIndex[index]) * 45
                );
            }

            this.index = null;
            if (that.option[index + 1]) {
                that.setData(
                    index + 1,
                    that.option[index][that.selectIndex[index]][
                        that["child" + (index + 1)]
                    ]
                );
                that.$set(that.selectIndex, index + 1, 0);
                that.$set(that.transition, index + 1, 80);
                $(".option_wrap")
                    .eq(index + 1)
                    .css({
                        transform: "translateY(80px)"
                    });
            }
            if (that.option[index + 2]) {
                that.setData(
                    index + 2,
                    that.option[index + 1][that.selectIndex[index + 1]][
                        that["child" + (index + 2)]
                    ]
                );
                that.$set(that.selectIndex, index + 2, 0);
                that.$set(that.transition, index + 2, 80);
                $(".option_wrap")
                    .eq(index + 2)
                    .css({
                        transform: "translateY(80px)"
                    });
            }

            if (!this.isBtn) {
                var value = [];
                that.option.forEach((ele, index) => {
                    value.push(ele[that.selectIndex[index]]);
                });

                that.$emit("change", { setData: that.setData }, value);
            }
        },
        mLeave(index) {
            var that = this;
            that.speed = (that.distance / (that.endTime - that.startTime)) * 5;
            if (that.endTime - that.startTime < 300) {
                // 每次增加或者减少的量
                var f = 0;
                var activeIndex = 0;
                f = Math.min(Math.abs(that.speed) / 32, 0.5);
                that.timer = setInterval(() => {
                    if (that.speed > 0.2) {
                        that.speed -= f;
                    } else if (that.speed < -0.2) {
                        that.speed += f;
                    } else {
                        clearInterval(that.timer);
                        that.bounce(index);
                        that.speed = 0;
                        return;
                    }
                    that.optionDistance += that.speed;
                    $(".option_wrap")
                        .eq(index)
                        .css({
                            transform:
                                "translateY(" + that.optionDistance + "px)"
                        });
                    if (that.optionDistance > 120) {
                        activeIndex = 0;
                        clearInterval(that.timer);
                        that.bounce(index);
                    } else if (
                        that.optionDistance <
                        80 + 45 - that.option[index].length * 45
                    ) {
                        activeIndex = that.option[index].length - 1;
                        clearInterval(that.timer);
                        that.bounce(index);
                    } else {
                        activeIndex = Math.abs(
                            Math.round((that.optionDistance - 80) / 45)
                        );
                    }

                    // that.bounce(index);
                    that.$set(that.selectIndex, index, activeIndex);
                    // console.log(that.selectIndex[index]);
                });
            } else {
                that.bounce(index);
            }

            $(".option_wrap")
                .eq(index)
                .off("touchmove");
            $(".option_wrap")
                .eq(index)
                .off("touchend");
        },
        confirm() {
            var that = this;
            if (this.isBtn) {
                var value = [];
                that.option.forEach((ele, index) => {
                    value.push(ele[that.selectIndex[index]]);
                });
                that.$emit("change", { setData: that.setData }, value);
            }
        }
    },
    watch: {
        data() {
            this.bingdEvent();
        },
        index() {
            if (this.index) {
                console.log("this.index+++");
                console.log(this.index);
            }
        }
    },
    computed: {
        child1() {
            if (this.children1) {
                return this.children1;
            } else {
                return "children";
            }
        },
        child2() {
            if (this.children2) {
                return this.children2;
            } else {
                return "children";
            }
        }
    },
    created() {
        var value = 111;
        // 可以传多个参数   传到父组件
        this.$emit("change", { setData: this.setData }, value);
        // if (!this.children1) {
        //     this.children1 = "children";
        // }
        // if (!this.children2) {
        //     this.children2 = "children";
        // }
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    .wrap_title {
        width: 100%;
        padding: 16px 0;
        text-align: center;
        p:first-child {
            font-size: 20px;
            color: #313131;
        }
        p:last-child {
            font-size: 16px;
            color: #ccc;
        }
    }
    .wrap_bg {
        position: relative;
        // perspective: 500;
        // 		-webkit-perspective: 500;
        .wrap {
            width: 100%;
            height: 225px;
            position: relative;
            z-index: 10;
            background: transparent;
            padding: 10px 0;
            // transform: rotateX(45deg);
            .wrap_container {
                width: 100%;
                height: 100%;
                display: flex;
                overflow: hidden;
            }
            .option_wrap {
                flex: 1;
                transform: translateY(80px) translateZ(0);
                transition: transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1);
                // transition-duration: 0.1s;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                div {
                    perspective: 3000;
                    -webkit-perspective: 3000;
                    transform-style: preserve-3d;
                }
                p {
                    text-align: center;
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    perspective: 1000;
                    -webkit-perspective: 1000;
                    -webkit-webkit: transform style preserve -3d;
                    -moz-webkit: transform style preserve -3d;
                    -ms-webkit: transform style preserve -3d;
                    -o-webkit: transform style preserve -3d;
                    webkit: transform style preserve -3d;
                    span {
                        display: block;
                        transition: transform 0.1s
                            cubic-bezier(0.39, 0.575, 0.565, 1);
                    }
                    span.item_selected {
                        color: #0091ff;
                        transform: rotateX(0deg) translateZ(0);
                    }

                    span.item_scale0 {
                        transform: rotateX(70deg) translateZ(0) scale(0.7);
                        color: rgba($color: #000000, $alpha: 0.2);
                    }
                    span.item_scale5 {
                        transform: rotateX(-70deg) translateZ(0) scale(0.7);
                        color: rgba($color: #000000, $alpha: 0.2);
                    }

                    span.item_scale1 {
                        transform: rotateX(30deg) translateZ(0) scale(0.9);
                        color: rgba(0, 0, 0, 0.7);
                    }
                    span.item_scale3 {
                        transform: rotateX(-30deg) translateZ(0) scale(0.9);
                        color: rgba(0, 0, 0, 0.7);
                    }

                    span.item_scale2 {
                        transform: rotateX(50deg) translateZ(0) scale(0.8);
                        color: rgba($color: #000000, $alpha: 0.5);
                    }
                    span.item_scale4 {
                        transform: rotateX(-50deg) translateZ(0) scale(0.8);
                        color: rgba($color: #000000, $alpha: 0.5);
                    }
                }
            }
            .option_wrap.border {
                border-left: 1px solid #f2f2f2;
                border-right: 1px solid #f2f2f2;
            }
            .option_wrap.border_right {
                border-right: 1px solid #f2f2f2;
            }
        }
        .selected_option_bg {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
            height: 100%;
            width: 100%;
            background: #f7f7f7;
            .selected_option {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                height: 45px;
                background: #fff;
                border-left: 4px solid #0091ff;
            }
        }
    }
}
.btn_list {
    padding: 16px 36px;
    display: flex;
    justify-content: space-between;
    button {
        border: 1px solid #e3e3e3;
        outline: 0;
        border-radius: 40px;
        width: 140px;
        background: #fff;
        line-height: 40px;
        font-size: 16px;
        color: #ababab;
    }
    button:last-child {
        background: #0091ff;
        color: #fff;
    }
}
</style>

