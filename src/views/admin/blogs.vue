<template>
  <div align="center" style="text-align: center;margin-top: 200px;margin-left: 30px">
    <div style="float: left;margin-left: 100px">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addBlogBtn">新增</el-button>
      &nbsp;
      <el-badge :value="newCommentCount" class="item">
        <el-button size="small" icon="el-icon-chat-dot-round" @click="commentBtn">留言</el-button>
      </el-badge>

    </div>
    <el-table
        :data="list.filter(data => !list.title || data.title.toLowerCase().includes(list.title.toLowerCase()))"
        :default-sort = "{prop: 'date', order: 'descending'}"
        style="width: 95%" v-loading.body="listLoading" fit highlight-current-row>
      <el-table-column
          label="ID"
          sortable
          prop="id" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="Title"
          sortable
          prop="title" align="center" width="900">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="PubTime"
          sortable
          prop="pubTime" align="center" width="300">
        <template slot-scope="scope">
          <span>{{scope.row.pubTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="ViewsCount"
          sortable
          prop="viewsCount" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.viewsCount}}</span>
        </template>
      </el-table-column>

      <el-table-column
          align="right" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="list.title"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>

    <div v-show="!listLoading">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog
        :title="dialogVisibleTitle"
        :visible.sync="dialogVisible"
        width="80%"
        top="10vh"
        style="height: 900px">
      <div class="site-content animate">
        <main class="site-main">
               <el-form :inline="true" class="demo-form-inline">
                      <el-form-item label="标题">
                          <el-input style="width:520px;" v-model="title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                 <br>
                    <el-form-item label="概要">
                      <el-input style="width:520px;" v-model="summary" placeholder="请输入概要"></el-input>
                      </el-form-item>
                    <br>
                  <el-form-item label="首图">
                        <el-input style="width: 520px" v-model="banner" placeholder="请输入首图地址"></el-input>
                  </el-form-item>
                    <br>
                 <el-form-item label="是否置顶">
                     <el-switch v-model="isTop"></el-switch>
                 </el-form-item>
                 <el-form-item label="是否热门">
                      <el-switch v-model="isHot"></el-switch>
                 </el-form-item>
                 <el-form-item label="是否发表">
                        <el-switch v-model="published"></el-switch>
                 </el-form-item>

               </el-form>


              <br>
          <mavon-editor
              v-model="content"
              @save="save"
              class="md"
              :value="content"
              :subfield = "true"
              :defaultOpen = "'edit'"
              :toolbarsFlag = "true"
              :editable="true"
              :scrollStyle="true"
              :ishljs = "true"
              :navigation = "true"
              :boxShadow = "true"
              :transition = "true"
              :shortCut="true"
              :toolbars="toolbars"
              :toolbarsBackground="'#ffffff'"
          ></mavon-editor>
          <br>
          <el-button type="primary" @click="save">提交</el-button>
          <el-button @click="dialogVisible=false;reset">取消</el-button>
        </main>
      </div>

    </el-dialog>

    <el-dialog
        title="留言处理"
        :visible.sync="commentDialogVisible"
        width="60%"
        top="20vh"
        style="height: 900px">
      <div class="site-content animate">
        <main class="site-main">
          <div style="margin-top: -70px;margin-left: -950px">
            <el-badge :value="newCommentCount" class="item" type="primary">
              <el-button size="small" @click="getUnreadComment">未读</el-button>
            </el-badge>
          </div>
          <el-table
              :data="commentDatas"
              style="width: 100%"
              :row-class-name="tableRowClassName">
            <el-table-column
                prop="createTime"
                label="日期"
                width="180" align="center" >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="content"
                label="内容" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="操作" align="center" width="80">
              <template slot-scope="scope">
                <el-button v-if="scope.row.unread" size="mini" @click="haveRead(scope.row.id)">已读</el-button>
                <el-button v-else size="mini" type="danger" @click="delCommentById(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <div v-show="!listLoading">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="commentTotal"
                @current-change="handleCurrentChange2">
            </el-pagination>
          </div>
        </main>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {fetchList, commentList, haveRead, delCommentById} from '@/api/post'
import {getBlogById, save, delById} from '@/api/Articles'
import {fetchComment} from "@/api";
export default {
  name: 'blogs',
  data(){
    return{
      listLoading: false,
      total: null,
      list: [{
        title: ''
      }],
      listBlogQuery: {
        page: 1,
        size: 10,
        param: {
          title: undefined
        }
      },
      dialogVisible: false,
      dialogVisibleTitle: '博客编辑',
      commentDialogVisible: false,
      newCommentCount: undefined,
      commentTotal: undefined,
      listCommentQuery: {
        page: 1,
        size: 10,
        param: {
          unread: undefined
        }
      },
      commentDatas: [],
      content: null,
      title: undefined,
      banner: undefined,
      isTop: false,
      isHot: false,
      published: false,
      summary: undefined,
      id: undefined,
      /*
    默认工具栏按钮全部开启, 传入自定义对象
    例如: {
         bold: true, // 粗体
         italic: true,// 斜体
         header: true,// 标题
    }
    此时, 仅仅显示此三个功能键
 */
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }

    }
  },
  components: {

  },
  methods: {
    getPage(){
      this.listLoading = true
      fetchList(this.listBlogQuery).then(response =>{
        this.list = response.data.items || []
        this.total = response.data.total;
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listBlogQuery.page = val;
      this.getPage();
    },
    handleCurrentChange2(val) {
      this.listCommentQuery.page = val;
      this.commentList();
    },
    handleEdit(index, row) {
      this.getBlogById(row.id);
      this.dialogVisibleTitle = "博客编辑"
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delById(row.id).then(response => {
          this.$message({ showClose: true,     message: response.message,  type: 'success'   });
          this.getPage()
        }).catch(error =>{
          this.$message({ showClose: true,     message: error,  type: 'warning'   });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //通过id获取数据
    getBlogById(id){
      getBlogById(id).then(res =>{
        if (res.data != null) {
          this.content = res.data.content
          this.title = res.data.title
          this.banner = res.data.banner
          this.isTop = res.data.top
          this.isHot = res.data.hot
          this.published = res.data.published
          this.summary = res.data.summary
          this.id = res.data.id
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getComment(){
      fetchComment().then(res => {
        this.comments = res.data || []
      }).catch(err => {
        console.log(err)
      })
    },
    save() {
       save(this.id,this.title,this.content,this.banner,this.isTop,this.isHot,this.published,this.summary).then(response =>{
         this.$message({
           showClose: true,
           message: response.message,
           type: 'success'
         });
         this.getPage()
         this.reset()
         this.dialogVisible=false
       }).catch(error =>{
             this.$message({
               showClose: true,
               message: error,
               type: 'warning'
             });
       })


    },
    addBlogBtn() {
      this.reset()
      this.isTop = false
      this.isHot = false
      this.published = false
      this.dialogVisibleTitle = "博客新增"
      this.dialogVisible=true
    },
    reset() {
      this.content = undefined
      this.id = undefined
      this.title = undefined
      this.banner =undefined
      this.isTop =false
      this.isHot =false
      this.published =false
      this.summary =undefined
    },
    commentBtn(){
      this.commentDialogVisible = true
      this.commentList()
    },

    tableRowClassName({row, rowIndex}) {
      if (row.unread == true) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
      return '';
    },
    commentList(){
      this.listCommentQuery.param.unread = undefined
      commentList(this.listCommentQuery).then(res =>{
        this.commentDatas = res.data.items
        this.commentTotal = res.data.total
      })
    },
    getNewComments(){
      this.listCommentQuery.param.unread = true
      commentList(this.listCommentQuery).then(res =>{
        this.newCommentCount = res.data.total
      })
    },
    getUnreadComment(){
      this.listCommentQuery.param.unread = true
      commentList(this.listCommentQuery).then(res =>{
        this.commentDatas = res.data.items
        this.commentTotal = res.data.total
      })
    },
    haveRead(id){
      haveRead(id).then(res =>{
        this.$message({ showClose: true,     message: "成功",  type: 'success'   });
        this.newCommentCount--
        this.commentList()
      }).catch(error =>{
        this.$message({ showClose: true,     message: error,  type: 'error'   });
      })
    },
    delCommentById(id){
      delCommentById(id).then(res =>{
        this.$message({ showClose: true,     message: "删除成功",  type: 'success'   });
        this.commentList()
      }).catch(error =>{
        this.$message({ showClose: true,     message: error,  type: 'error'   });
      })
    }
  },
  mounted(){

  },
  created() {
    this.getPage()
    this.getNewComments()
  }
}
</script>
<style lang="less">
.el-table .warning-row {
  background: #b5e7d1;
}

.el-table .success-row {
  background: #2fb4a9;
}
</style>
