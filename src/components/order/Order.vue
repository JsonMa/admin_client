<template>
  <lay-out>
    <div
      slot="content"
      class="content">
      <div style="margin-top: 15px;">
        <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          class="search">
          <el-select
            slot="prepend"
            v-model="select"
            placeholder="请选择"
            class="select-menu">
            <el-option
              label="订单号"
              value="1"/>
            <el-option
              label="商品ID"
              value="2"/>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="search-button"/>
        </el-input>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"/>
          <el-table-column
            prop="id"
            label="订单号"/>
          <el-table-column
            prop="realPrice"
            label="金额"/>
          <el-table-column
            prop="name"
            label="商家名称"/>
          <el-table-column
            prop="phone"
            label="电话"/>
          <el-table-column
            prop="address"
            label="地址"/>
          <el-table-column
            prop="quata"
            label="二维码数量"/>
          <el-table-column
            prop="created_at"
            label="下单时间"/>
          <el-table-column
            label="二维码">
            <template
              slot-scope="scope"
              class="qr-option">
              <el-button
                v-if="!scope.row.compressed_id"
                size="small"
                type="primary"
                @click="packQr(scope.row)">
                生成压缩包</el-button>
              <el-button
                v-else
                type="text"
                @click="downLoadQr(scope.row.compressed_id)">
                下载压缩包</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </lay-out>
</template>

<script>
import Vue from 'vue';
import {
  Button,
  Input,
  Table,
  TableColumn,
  Pagination,
  Row,
  Col,
  Option,
  Select,
} from 'element-ui';
import axios from 'axios';
import layOut from '../Layout';

Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Select);

export default {
  name: 'HelloWorld',
  components: {
    layOut,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      input: '',
      select: '',
      tableData: [
        {
          index: '',
          _id: '',
          realPrice: 'ddd', // 订单金额
          create_at: '', // 创建时间
          name: '', // 用户名称
          phone: '', // 电话
          address: '', // 地址
          quata: '', // 二维码数量
          compressed_id: false, // 是否已生成过压缩文件
        },
      ], // 表单数据
    };
  },
  created() {
    const host = 'http://localhost:7001';
    const $this = this;
    axios.get(`${host}/orders`).then((response) => {
      $this.tableData = response.data.data.rows;
    });
  },
  methods: {
    packQr(row) {
      const host = 'http://localhost:7001';
      axios({
        method: 'post',
        url: `${host}/cards`,
        data: {
          order_id: row.id // eslint-disable-line
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log(response);
      });
    },
    downLoadQr(id) {
      const host = 'http://localhost:7001';
      axios.get(`${host}/files/${id}`).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content {
  width: 1000px;
  height: 100%;
  // background-color: #fff;
  margin: 0 auto;
  .search {
    text-align: left;
    .select-menu {
      width: 140px;
    }
    .search-button {
      width: 80px;
    }
  }
  .table {
    margin-top: 20px;
    text-align: left;
    .qr-option {
      text-align: left;
    }
  }
}
</style>
