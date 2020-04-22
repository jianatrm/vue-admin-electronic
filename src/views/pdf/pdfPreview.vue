<template>
  <pdf ref="pdf" :src="pdfUrl" style="width: 100%;"></pdf>
</template>

<script>
  import pdf from 'vue-pdf'
    export default {
        name: "pdfPreview",
        data(){
           return{
             pdfUrl:''
           }
        },
      mounted() {
        this.pdfUrl = pdf.createLoadingTask("pdfurl")
      }
    }
</script>

<style scoped>

</style>
