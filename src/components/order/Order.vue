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
              value="id"/>
            <el-option
              label="联系电话"
              value="phone"/>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="search-button"
            @click="search(0)"/>
        </el-input>
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
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
                @click="packageQr(scope.$index, scope.row)">
                生成压缩包</el-button>
              <a
                v-else
                :href="`/files/${scope.row.compressed_id}`"
                target="blank">
                <el-button
                  type="text">
                  下载压缩包</el-button>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagenation">
        <el-pagination
          :total="total"
          current-change="search(currentPage)"
          background
          layout="prev, pager, next"/>
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
  Message,
  Loading,
} from 'element-ui';
import layOut from '../Layout';
import * as api from '../../fetch/api';

Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Select);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;

export default {
  name: 'HelloWorld',
  components: {
    layOut,
  },
  data() {
    return {
      loading: false,
      input: '',
      select: '',
      tableData: [], // 表单数据
      total: 0, // 总页数
    };
  },
  created() {
    this.fethcOrders({ count: 10, start: 0 });
  },
  methods: {
    packageQr(index, row) {
      this.loading = true;
      const $this = this;
      const params = { order_id: row.id };
      api.default.compress(params).then((resp) => {
        $this.loading = false;
        if (resp.code !== 200) $this.$message.error(resp.msg);
        else {
          $this.$message('压缩包成功生成');
          $this.tableData[index].compressed_id = resp.data.gzip_id;
        }
      }).catch((error) => {
        $this.loading = false;
        $this.$message.error(error);
      });
    },

    fethcOrders(params) {
      const $this = this;
      this.loading = true;
      api.default.orders(params).then((resp) => {
        $this.tableData = resp.data.rows;
        $this.total = Math.ceil(resp.data.count / 10);
        $this.loading = false;
      });
    },

    search(index) {
      const params = {};
      const { select, input } = this;
      if (select === 'phone') {
        const isValidated = /^([1][0-9]{10})|(0[1-9]{2,3}-?[0-9]{7,8})$/.test(input);
        if (!isValidated) {
          this.$message.error('联系电话格式错误');
          return;
        }
      } else if (select === 'id') {
        const isValidated = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(input);
        if (!isValidated) {
          this.$message.error('订单号格式错误');
          return;
        }
      } else {
        this.$message.error('未选择查询条件');
        return;
      }
      params[select] = input;
      params.start = index * 10;
      params.count = 10;
      this.fethcOrders(params);
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
  .pagenation {
    margin-top: 20px
  }
}
</style>
