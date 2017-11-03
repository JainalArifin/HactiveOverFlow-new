<template lang="html">
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Question</h4>
        </div>
        <div class="modal-body">
          <form @submit.prevent="questionAdd(formQuestion)">
            <div class="form-group">
              <label class="control-label" for="focusedInput">Judul</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Judul ..." v-model="formQuestion.judul" required>
            </div>
            <div class="form-group">
              <label class="control-label" for="focusedInput">Content</label>
              <textarea class="form-control" rows="3" id="textArea" placeholder="content..." v-model="formQuestion.content" required></textarea>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary"> Add Questions</button>
              <button type="button" name="button" data-dismiss="modal" class="btn btn-danger" @click="close"> close</button>
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
      formQuestion: {
        judul: '',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'questionAdd'
    ]),
    close () {
      this.formQuestion = {}
    }
  }
}
</script>

<style lang="css">
</style>
