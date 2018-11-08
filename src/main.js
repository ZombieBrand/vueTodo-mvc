import 'todomvc-app-css/index.css'

import Vue from 'vue'
/* 状态判断 */
var filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter((todo) => {
      return !todo.completed
    })
  },
  completed(todos) {
    return todos.filter((todo) => {
      return todo.completed
    })
  }
}

let app = new Vue({
  el: '.todoapp',
  data: {
    msg: 'hello word',
    title: 'Todo-MVC',
    newTodo: '',
    todos: [],
    editedTodo: null,
    editedCache:'',
    hashName:'all'
  },
  methods: {
    addTodo(e) {
      if(!this.newTodo){
        return
      }
      this.todos.push({
        content: this.newTodo,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    /* 进入编辑状态 */
    editTodo(todo,index) {
      this.editedCache = todo.content
      this.editedTodo = index
    },
    /* 确认修改 */
    doneEdit(todo,index){
      if(!todo.content){
        this.removeTodo(index)
      }else{
        this.editedTodo = null
      }
    },
    /* 取消修改 */
    cancleEdit(todo){
      todo.content = this.editedCache
      this.editedTodo = null
    },
    /* 清除已经完成的todo */
    clear(){
      this.todos = filters.active(this.todos)
    }
  },
  computed: {
    remain() {
      return filters.active(this.todos).length
    },
    isAll: {
      get() {
        return this.remain === 0
      },
      set(value) {
        console.log(value)
        this.todos.forEach((todo) => {
          todo.completed = value
        })
      }
    },
    filteredTodos(){
      return filters[this.hashName](this.todos)
    }
  },
  /* directives是自定义指令 */
  directives: {
    focus(el, value) {
      /* 必须先传入当前元素这里是el
       * value是v-focus=后边的值
       */
      if (value) {
        el.focus()
      }
    }
  }
})
function hashChange(){
  let hashName = location.hash.replace(/#\//,'')
  if(filters[hashName]){
    app.hashName = hashName
  }else{
    location.hash = ''
    app.hashName = 'all'
  }
}
window.addEventListener('hashchange',hashChange)