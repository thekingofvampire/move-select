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
			
            <TouchSelect
                @change="timeValueChange"
                :name="'date'"
                :data="timeData"
                :dataOption="timeDataOption"
                :title="title"
				:children1="'periods'"
            ></TouchSelect>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import
export default {
    name: "home",
    data() {
        return {
			timeData:[],
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
			timeDataOption:[
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
			timeSelect:null
        };
    },
    methods: {
        valueChange(moveSelect, value) {
            console.log("value");
            console.log(value);
            this.moveSelectPicker = moveSelect;
		},
		timeValueChange(timeSelect, value){
			console.log(timeSelect, value)
            this.timeSelect = timeSelect;
		},
        getValue(value) {}
    },
    created() {
        // this.$sendMsg();
        this.$axios
            .post(
                "http://mapi.hiweixiu.com/v2/regions/all",
                this.$qs.stringify({ types: 2 })
            )
            .then(res => {
                this.locationData = res.data.data.provinces;
                this.moveSelectPicker.setData(0, this.locationData);
                this.moveSelectPicker.setData(1, this.locationData[0].cities);
                this.moveSelectPicker.setData(
                    2,
                    this.locationData[0].cities[0].districts
                );
			});
			// 
			
        this.$axios
            .post(
                "http://mapi.hiweixiu.com/v2/reserve/normal-time",
                this.$qs.stringify({city: 310100,district: 310107})
            )
            .then(res => {
				
				res.data.data.forEach((ele, key) => {
					ele.periods.forEach(item => {
						item.date =
							item.week +
							":" +
							item.start_time +
							"~" +
							item.next_time;
					});
				});
                this.timeData = res.data.data;
                this.timeSelect.setData(0, this.timeData);
                this.timeSelect.setData(1, this.timeData[0].periods);
			});
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
