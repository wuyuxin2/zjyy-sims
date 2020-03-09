<template>
  <div>
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search title.." />
    </div>
    <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1300 }">
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="item in tags" color="green" :key="item">
          {{ item }}
        </a-tag>
      </span>
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="item in tags" color="green" :key="item">
          {{ item }}
        </a-tag>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  { title: "手术间", dataIndex: "shj", key: "1" },
  { title: "手术时间", dataIndex: "shsj", key: "2" },
  { title: "手术科室", dataIndex: "shks", key: "3" },
  {
    title: "患者姓名",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    key: "4"
  },
  { title: "病案号", dataIndex: "bah", key: "5" },
  { title: "床号", dataIndex: "ch", key: "6" },
  {
    title: "手术名称",
    dataIndex: "shmc",
    scopedSlots: { customRender: "tags" },
    key: "7"
  },
  { title: "主刀", dataIndex: "zd", key: "8" },
  { title: "助手1", dataIndex: "zs1", key: "9" },
  { title: "助手2", dataIndex: "zs2", key: "10" },
  { title: "麻醉方法", dataIndex: "mzff", key: "11" }
];

const data = [
  {
    key: "1",
    shj: "01-1",
    shsj: "09:00",
    shks: "肛肠外科住院",
    tags: ["杨军"],
    bah: "3000076756",
    ch: "17病区58床",
    shmc: ["肛裂切除术"],
    zd: "A3223",
    zs1: "",
    zs2: "",
    mzff: "麻醉会诊"
  }
];

export default {
  data() {
    return {
      search: "",
      data,
      columns
    };
  },
  computed: {
    filteredList() {
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
<style scoped lang="scss">
.search-wrapper {
  position: relative;
  label {
    position: absolute;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    top: 8px;
    left: 12px;
    z-index: -1;
    transition: 0.15s all ease-in-out;
  }
}
input {
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: 0.15s all ease-in-out;
  background: white;
  &:focus {
    outline: none;
    transform: scale(1.05);
    & + label {
      font-size: 10px;
      transform: translateY(-24px) translateX(-12px);
    }
  }
  &::-webkit-input-placeholder {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 100;
  }
}
</style>
