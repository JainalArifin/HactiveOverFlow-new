<template lang="html">
  <div>
    <button type="button" name="button"  data-toggle="modal" data-target="#myModal-register" class="btn btn-danger tombol-question glyphicon glyphicon-user"> Register</button>
    <Register></Register>
    <button type="button" name="button"  data-toggle="modal" data-target="#myModal-login" class="btn btn-primary glyphicon glyphicon-tags tombol-question"> Login</button>
    <Login></Login>
    <button type="button" name="button" class="btn btn-danger tombol-question" @click="logOut"> Logout</button>
  </div>
</template>

<script>
import Register from '@/components/Register'
import Login from '@/components/Login'
import swal from 'sweetalert'
export default {
  components: {
    Register,
    Login
  },
  methods: {
    logOut () {
      swal('trimakasi', 'anda telah kluar silahkan login jika ingin membuat pertanyaan', 'info')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="css">
.tombol-question {
  height: 62px;
  width: 134px;
  font-weight: bold;
  margin-right: 5px;
}
</style>
