<template>

        <div id="nav">
            <h1>个人小插件</h1>
            <ul>
                <li>
                    <router-link to="/moveSelect">
                        滑动选择
                    </router-link>
                </li>
                <li>
                    <router-link to="/bottonNav">
                        底部个性导航栏
                    </router-link>
                </li>
            </ul>
        </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#nav{
    h1{
        text-align: center;
    }
    ul{
        list-style: none;
        li{
            width: 100%;
            line-height: 40px;
            background: #3fca43;
            color: #fff;
            text-align: center;
            border-bottom: 1px solid #fff;
            a{
                display: block;
                text-decoration: none;
                color: #fff;
            }
        }
    }
}
</style>