<template lang="html">
  <div>
    <!-- <h1>{{ allQuestion }}</h1> -->
    <div class="panel panel-info style-content" v-for="question in allQuestion">
      <div class="panel-heading">
        <h3 class="panel-title glyphicon glyphicon-user"> : {{ question.author.username }}</h3>
      </div>
      <div class="panel-body">
        <p>Judul : {{ question.judul }}</p>
        <p>Content : {{ question.content }}</p>
      </div>
      <div class="panel-footer">
        <!-- <button class="btn btn-success glyphicon glyphicon-list-alt" @click="questionById(question._id)"> Answer</button> -->
        <button type="button" name="button" class="btn btn-danger glyphicon glyphicon-trash" @click="hapusQuestion(question._id)"> Hapus</button>

        <button type="button" name="button" class="btn btn-primary glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal4" @click="tampilEdit(question)"> edit</button>
        <!-- like -->

        <button type="button" name="button" class="btn btn-info glyphicon glyphicon-thumbs-up" @click="suka(question)"> suka {{ question.suka.length }}</button>
        <!-- disk like -->
        <button type="button" name="button" class="btn btn-info glyphicon glyphicon-thumbs-down" @click="tidakSuka(question)"> tidak suka {{ question.tidakSuka.length }}</button>
        <!-- modal -->
        <!-- Modal -->
        <div id="myModal4" class="modal fade" role="dialog">
          <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Silahkan Ubah pertanyaan Anda</h4>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editQuestion(dataEdit)">
                <div class="form-group">
                  <label class="control-label" for="focusedInput"> Judul</label>
                  <input class="form-control" id="focusedInput" type="text" v-model="dataEdit.judul">
                </div>
                <div class="form-group">
                  <label class="control-label" for="focusedInput"> content</label>
                  <input class="form-control" id="focusedInput" type="text" v-model="dataEdit.content">
                </div>
                <button type="submit" name="button" class="btn btn-info"> simpan perubahan</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>

          </div>
        </div>
        <!-- / modal -->
        <!-- test -->
        <div>
          <router-link :to="'/' + question._id"><br><br>
            <button type="button" name="button" class="btn btn-info" data-toggle="tooltip" data-placement="right" title="silahkan klik untuk menjawab">
              <span class="glyphicon glyphicon-list-alt"> Answer {{ question.answerId.length}}</span>
            </button>
          </router-link>
        </div>
        <!-- / test -->
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      dataEdit: {},
      dataSuka: [],
      dataTidakSuka: []
    }
  },
  computed: {
    ...mapState([
      'allQuestion',
      'answerId'
    ]),
    sortedItems: function () {
      this.allQuestion.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      return this.allQuestion
    }
  },
  methods: {
    suka (dapatId) {
      console.log('hasil id yang di sukai', dapatId)
      // let dataLoopping = dapatId.suka
      // for (let i = 0; i < dataLoopping.length; i++) {
      //   if (dataLoopping[i].author === dataLoopping[i].author) {
      //     swal('anda sudah menyukai ini', 'trimakasi', 'warning')
      //   }
      // }
      this.$http.post(`/vote/like/${dapatId._id}`, dapatId, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log('data like berhasil masuk', data)
      })
      .catch((err) => {
        swal('anda belum login', 'silahkan login terlebih dahulu', 'error')
        console.error(err)
      })

      // for (let i = 0; i < this.allQuestion.length; i++) {
      //   // console.log('ini hasil di output kan', this.allQuestion[i].suka)
      //   let data = this.allQuestion[i].suka
      //   for (let j = 0; j < data.length; j++) {
      //     console.log('data data[j] ---->', data[j])
      //     console.log('data dapatId.author._id ----->', dapatId.author._id)
      //     if (data[j] === dapatId.author._id) {
      //       console.log(' data yang di looping', data[j])
      //       swal('anda sudah menyukai yang ini', 'trimakasi', 'warning')
      //     } else {
      //
      //       // ketika menyukai
      //       // this.$http.post(`/vote/like/${dapatId._id}`, dapatId, {
      //       //   headers: {
      //       //     token: localStorage.getItem('token')
      //       //   }
      //       // })
      //       // .then(({ data }) => {
      //       //   console.log('data like berhasil masuk', data)
      //       // })
      //       // .catch((err) => {
      //       //   swal('anda belum login', 'silahkan login terlebih dahulu', 'error')
      //       //   console.error(err)
      //       // })
      //       // =
      //     }
      //   }
      // }
    },
    tidakSuka (dapatId) {
      console.log('dapat id nya yang di klik ==', dapatId)
      this.$http.post(`/vote/tidakLike/${dapatId._id}`, dapatId, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log('data like berhasil masuk', data)
      })
      .catch((err) => {
        swal('anda belum login', 'silahkan login terlebih dahulu', 'error')
        console.error(err)
      })
    },
    ...mapActions([
      'getQuestion',
      'hapusQuestion',
      'questionById',
      'editQuestion'
    ]),
    tampilEdit (dataQuestion) {
      console.log('hasil dataQuestion --->', dataQuestion)
      this.dataEdit = dataQuestion
    }
  },
  created () {
    // this.allQuestion()
    this.getQuestion()
  },
  watch: {
    allQuestion: function (b) {
      this.getQuestion()
    }
  }
}
</script>

<style lang="css">
.style-content{
  margin-top: 20px;
}
</style>
