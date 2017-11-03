<template lang="html">
  <div>
    <br><br>
    <button type="button" name="button" class="btn btn-primary glyphicon glyphicon-list-alt" @click="returnQuestion"> return to Question</button>
    <!-- answer -->
    <div class="panel panel-info style-content">
      <div class="panel-heading">
        <h3 class="panel-title glyphicon glyphicon-user"> : {{ dataAnswer.author.username }}</h3>
      </div>
      <div class="panel-body">
        <p>Judul : {{ dataAnswer.judul }}</p>
        <p>Content : {{ dataAnswer.content }}</p>
      </div>
    </div>
    <!-- /answer -->
    <!-- jawab -->
    <!-- form -->
    <form @submit.prevent="ngejawab(formJawab)">
      <div class="form-group">
        <label class="control-label" for="focusedInput">jawab</label>
        <textarea class="form-control" rows="3" id="textArea" v-model="formJawab.jawaban" placeholder="Silahkan jawab pertanyaan" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary glyphicon glyphicon-tag">
      menjawab
      </button>
    </form>
    <!-- / form -->
    <br><br>
    <!-- Modal -->

    <!-- jawab -->
    <div class="panel panel-success style-content" v-for="jawabanUser in dataAnswer.answerId">
      <div class="panel-heading">
        <h3 class="panel-title glyphicon glyphicon-user"> USERNAME : {{ jawabanUser.author.username }} </h3>
      </div>
      <div class="panel-body">
        <p>Jawab : {{ jawabanUser.jawaban }}</p>
      </div>
      <div class="panel-footer">
        <button type="button" name="button" class="btn btn-danger" @click="hapusAnswer(jawabanUser._id)"> delete</button>
      </div>
    </div>
    <!-- /jawab -->
    <!-- / jawab -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import swal from 'sweetalert'
export default {
  props: ['id'],
  data () {
    return {
      formJawab: {
        jawaban: ''
      },
      dataAnswer: {}
    }
  },
  methods: {
    ...mapActions([
      'hapusAnswer'
    ]),
    kembaliHome () {
      this.$router.push('/')
    },
    getDetails (dataId) {
      // console.log('saya dapat idnya ---?', dataId)
      this.$http.get(`/question/${dataId}`)
      .then(({ data }) => {
        // console.log('data yang di dapat', data.answerId)
        this.dataAnswer = data
      })
      .catch((err) => console.error(err))
    },
    returnQuestion () {
      this.$router.push('/')
    },
    ngejawab (formJawab) {
      // console.log('berhasil masuk doang::', formJawab)
      // console.log('dapat data idnya ya mas', this.id)
      // this.idPenampung.push(dataId)
      this.$http.post(`/answer/${this.id}`, formJawab, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        if (data === 'anda belum login') {
          swal('anda belum login', 'Silahkan login terlebih dahulu', 'error')
        } else {
          console.log('------> data yang di masukan', data)
        }
        this.formJawab = {}
      })
      .catch((err) => {
        swal('anda belum bisa memasukan data', 'Silahkan login terlebih dahulu', 'warning')
        console.error(err)
        this.formJawab = {}
      })
    }
  },
  created () {
    // console.log('data answer', this.answerUser)
    this.getDetails(this.id)
  },
  watch: {
    // console.log('melihat dataAnswer', dataAnswer)
    dataAnswer: function (b) {
      this.getDetails(this.id)
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
