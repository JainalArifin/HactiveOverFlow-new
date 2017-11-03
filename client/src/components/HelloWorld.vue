<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="col-md-6">
        <button type="button" name="button"  data-toggle="modal" data-target="#myModal" class="btn btn-success glyphicon glyphicon-pencil tombol-question"> Questions</button>
        <Questions></Questions>
      </div>
      <div class="col-md-6">
        <Tombol></Tombol>
      </div>
      <div class="row">
        <div class="col-md-7">
          <!-- <Maincontent></Maincontent> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Questions from '@/components/Questions'
// import Maincontent from '@/components/Maincontent'
import Tombol from '@/components/Tombol'
export default {
  components: {
    Navbar,
    Questions,
    Tombol
    // Maincontent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tombol-question {
  height: 62px;
  width: 134px;
  font-weight: bold;
  margin-right: 5px;
}
</style>
