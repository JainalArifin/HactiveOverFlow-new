<template lang="html">
  <!-- Modal -->
  <div class="modal fade" id="myModal-login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Login</h4>
        </div>
        <div class="modal-body">
          <form @submit.prevent="login(formLogin)">
            <div class="form-group">
              <label class="control-label" for="focusedInput">Username</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Username ..." v-model="formLogin.username" required>
            </div>
            <div class="form-group">
              <label class="control-label" for="focusedInput">Password</label>
              <input class="form-control" id="focusedInput" type="password" placeholder="Password ..." v-model="formLogin.password" required>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-info"> Login</button>
              <button type="button"  class="btn btn-danger" name="button" data-dismiss="modal" @click="kluar"> close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- / modal -->
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
  data () {
    return {
      formLogin: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login (dataLogin) {
      console.log('orang yang login', dataLogin)
      axios.post('http://localhost:3000/users/login', dataLogin)
      // console.log('data ada', dataLogin)
      .then(({ data }) => {
        console.log('----->', data.msg)
        if (data.msg === 'username not found') {
          swal('anda belum register', 'silahkan register terlebih dahulu', 'error')
        } else {
          // console.log('data token :', data)
          swal('anda berhasil Login', 'silahkan CLOSE <== untuk menutup modal', 'success')
          localStorage.setItem('token', data)
        }
      })
      .catch((err) => console.error(err))
    },
    kluar () {
      this.formLogin = {}
    }
  }
}
</script>

<style lang="css">
</style>
