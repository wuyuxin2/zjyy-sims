<template>
  <div></div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      currentColumns: [],
      currentData: []
    };
  },
  render: function(h) {
    var _this = this;
    var ths = [];
    this.currentColumns.forEach(function(col, index) {
      // 如果col.sorttable 定义了,或值为true，除了渲染title，还要加两个<a>元素来实现升序或降序的操作。
      if (col.sortable) {
        ths.push(
          h("th", [
            h("span", col.title),
            h(
              "a",
              {
                class: {
                  on: col._sortType === "asc"
                },
                on: {
                  click: function() {
                    _this.handleSortByAsc(index);
                  }
                }
              },
              "↑"
            ),
            h(
              "a",
              {
                class: {
                  on: col._sortType === "desc"
                },
                on: {
                  click: function() {
                    _this.handleSortByAsc(index);
                  }
                }
              },
              "↓"
            )
          ])
        );
      } else {
        // 如果col.sorttable 没有定义，或值为false，就直接把col.title渲染出来。
        ths.push(h("th", col.title));
      }
    });

    var trs = [];
    this.currentData.forEach(function(row) {
      var tds = [];
      _this.currentColumns.forEach(function(cell) {
        tds.push(h("td", row[cell.key]));
      });
      trs.push(h("tr", tds));
    });
    return h("table", [h("thead", [h("tr", ths)]), h("tbody", trs)]);
  },
  // v-table组件目前的prop：columns 和 data 的数据已经从父级传递过来了，不过前面介绍过，v-table不直接使用它们，
  // 而是使用data选项的 currentColumns 和 currentData。 所以在v-table初始化时，需要把columns 和 data 赋值给 currentColumns he  currentData。
  //  在v-table的methods选项里定义两个方法用来赋值，并在mounted 钩子内调用：
  // map() 是JS数组的一个方法，根据传入的函数重新构造一个新数组。排序分升序（asc）和降序（desc），而且同时只能对一列数据进行排序，与其他列互斥，
  // 为了标识当前列的排序状态，在map列添加数据时，默认给每列都添加一个_sortType的字段，而且赋值为normal，表示默认排序（也就是不排序）。
  // 在排序后，currentData 每项的顺序可能都会发生变化，所以给currentColumns  和 currnetData 的每个数据都添加_index字段，代表当前数据在原始数据中的索引。
  methods: {
    makeColumns: function() {
      this.currentColumns = this.columns.map(function(col, index) {
        // 添加一个字段标识当前列排序的状态，后续使用
        col._sortType = "normal";
        // 添加一个字段标识当前列在数组中的索引，后续使用
        col._index = index;
        return col;
      });
    },
    makeData: function() {
      this.currentData = this.data.map(function(row, index) {
        // 添加一个字段标识当前行在数组中的索引，后续使用
        row._index = index;
        return row;
      });
    },
    // 两个方法基本类似，一个是升序操作，一个升序操作，目的都是改变currentColumns 数组每项的顺序。
    // 排序使用列JS数组的sort() 方法，这里之所以返回1 和 -1，而不直接返回a[key] < a[key] ,也就是true或false，
    // 是因为在部分浏览器（比如Safari）对sort的处理不同，而1 和 -1 可以做到兼容。排序前，先将所有列的排序状态都重置为normal，
    // 然后设置当前列的排序状态（asc或desc），对应到render里<a>元素到class名称on，后面会通过CSS来高亮显示出当前的排序状态。
    handleSortByAsc: function(index) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(function(col) {
        col._sortType = "normal";
      });
      this.currentColumns[index]._sortType = "asc";
      this.currentData.sort(function(a, b) {
        return a[key] > b[key] ? 1 : -1;
      });
    },
    handleSortByDesc: function(index) {
      var key = this.currentColumns[index].key;
      this.currentColumns.forEach(function(col) {
        col._sortType = "normal";
      });
      this.currentColumns[index]._sortType = "desc";
      this.currentData.sort(function(a, b) {
        return a[key] < b[key] ? 1 : -1;
      });
    }
  },
  // 当渲染完表格后，父级修改列data数据，比如增加或删除，v-table的currentData也应该更新，如果某列已经存在排序状态，更新后应该直接处理一次排序。
  // 通过遍历currentColumns来找出是否按某一列进行过排序，如果有，就按照当前排序状态对更新后的数据做一次排序操作
  watch: {
    data: function() {
      this.makeData();
      var sortColumn = this.currentColumns.filter(function(col) {
        return col._sortType !== "normal";
      });
      if (sortColumn.length > 0) {
        if (sortColumn[0]._sortType === "asc") {
          this.handleSortByAsc(sortColumn[0]._index);
        } else {
          this.handleSortByDesc(sortColumn[0]._index);
        }
      }
    }
  },
  mounted() {
    // v-table 初始化时调用
    this.makeColumns();
    this.makeData();
  }
};
</script>
<style scoped></style>
