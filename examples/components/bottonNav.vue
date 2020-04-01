<template>
    <div class="container">
        <div class="bottom-nav">
            <ul>
                <li>首页</li>
                <li class="additional">
                    <div @click="showMenu=!showMenu" :class="[{'active':showMenu} ,'addBtn']">+</div>
                    <div class="menu-list-wrap">
                        <div
                            class="menu-list"
                            v-for="(ele,index) in list"
                            :key="index"
                            :style="`background:${ele.bgcolor};box-shadow: 0 0 10px 0px ${ele.bgcolor};${showMenu?`transition: transform 0.${index+1}s;transform:translate3D(${-80*Math.cos(2*Math.PI/360*(180/(list.length+1)*(index+1)))}px,${-80*Math.sin(2*Math.PI/360*(180/(list.length+1)*(index+1)))}px,0)`:`transition: transform 0.${list.length-index-1}s;`}`"
                        >{{ele.name}}</div>
                    </div>
                </li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    name: "菜单1",
                    bgcolor: "#ccc"
                },
                {
                    name: "菜单2",
                    bgcolor: "#ccc"
                },
                {
                    name: "菜单3",
                    bgcolor: "#ccc"
                },
                {
                    name: "菜单4",
                    bgcolor: "#ccc"
                }
            ],
            showMenu: false
        };
    }
};
</script>
<style lang="scss" scoped>
.container {
    height: 100vh;
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        // background: #ccc;
        // border-top: 1px solid #ccc;
        box-shadow: 0px -1px 5px 0px #ccc;
        ul {
            list-style: none;
            // display: table;
            display: flex;
            justify-content: space-between;
            width: 100%;
            li {
                // display: table-cell;
                text-align: center;
                flex: 1;
            }
            li.additional {
                flex: 0;
                width: 50px;
                height: 50px;
                position: relative;
                .addBtn {
                    position: absolute;
                    bottom: 50%;
                    left: -25px;
                    z-index: 100;
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                    background: #12c0f5;
                    color: #fff;
                    font-size: 35px;
                    line-height: 46px;
                    transition: transform 0.3s;
                    box-shadow: 0 0 10px 0px #ccc;
                    transform-origin:center;
                    user-select: none;
                }
                .addBtn.active {
                    transform: rotateZ(45deg);
                }
                .menu-list-wrap {
                    position: absolute;
                    z-index: 99;
                    .menu-list {
                        position: absolute;
                        left: -20px;
                        top: -20px;
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;
                        line-height: 40px;
                        font-size: 12px;
                        text-align: center;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>