<template>
  <div>
    <div id="app">
      <v-table :data="data" :columns="columns"></v-table>
      <button>添加数据</button>
    </div>
  </div>
</template>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script>
import vTable from "../../components/vTable.vue";
export default {
  components: {
    vTable
  },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age",
          sortable: true
        },
        {
          title: "出生日期",
          key: "birthday",
          sortable: true
        },
        {
          title: "地址",
          key: "address"
        }
      ],
      data: [
        {
          name: "王小明",
          age: 18,
          birthday: "1992-02-20",
          address: "北京"
        },
        {
          name: "王小刚",
          age: 18,
          birthday: "1992-02-20",
          address: "上海"
        },
        {
          name: "王小红",
          age: 18,
          birthday: "1992-02-20",
          address: "南京"
        }
      ]
    };
  },
  methods: {
    handleAddData: function() {
      // body...
      this.data.push({
        name: "刘晓天",
        age: 19,
        birthday: "1992-04-12",
        address: "北京市"
      });
    }
  }
};
</script>
<style lang=""></style>
