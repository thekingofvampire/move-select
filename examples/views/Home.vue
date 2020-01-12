<template>
    <div class="home">
        <div class="wrap">
            <TouchSelect
                @change="valueChange"
                :name="'name'"
                :data="locationData"
                :dataOption="dataOption"
                :title="title"
                :children1="'cities'"
                :children2="'districts'"
                :isBtn="'true'"
            ></TouchSelect>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import JSONdata from "../assets/data.js";
export default {
    name: "home",
    data() {
        return {
            timeData: [],
            locationData: [],
            dataOption: [
                {
                    defaultIndex: 0
                },
                {
                    defaultIndex: 0
                },
                {
                    defaultIndex: 0
                }
            ],
            moveSelectPicker: null,
            title: {
                name: "选择哪种黄金鹏",
                tips: "慎重选择关系到游戏故事"
            },
            timeSelect: null
        };
    },
    methods: {
        valueChange(moveSelect, value) {
            this.moveSelectPicker = moveSelect;
            console.log(moveSelect, value)
        },
    },
    created() {
		this.$nextTick(()=>{
			this.locationData = JSONdata.data.provinces;
			this.moveSelectPicker.setData(0, this.locationData);
			this.moveSelectPicker.setData(1, this.locationData[0].cities);
			this.moveSelectPicker.setData(
				2,
				this.locationData[0].cities[0].districts
			);
        })
        // this.GlobalData();
    }
};
</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    // height: 600px;
    box-shadow: 0 0 5px 0 #ccc;
}
</style>
