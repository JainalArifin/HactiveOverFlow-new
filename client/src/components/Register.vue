<template lang="html">
  <!-- Modal -->
  <div class="modal fade" id="myModal-register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Register</h4>
        </div>
        <div class="modal-body">
          <form @submit.prevent="register(formRegister)">
            <div class="form-group">
              <label class="control-label" for="focusedInput">Username</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Username ..." v-model="formRegister.username" required>
            </div>
            <div class="form-group">
              <label class="control-label" for="focusedInput">Password</label>
              <input class="form-control" id="focusedInput" type="password" placeholder="Password ..." v-model="formRegister.password" required>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary"> Register</button>
              <button type="button" name="button" class="btn btn-danger" data-dismiss="modal" @click="close"> Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- / modal -->
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formRegister: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    close () {
      this.formRegister = {}
    }
  }
}
</script>

<style lang="css">
</style>
