<template>
  <div style="background-color: rgba(0,0,0,0.65);text-align: center">
    <pdf :src="pdfUrl" v-for="i in numPages " :key="i" :page="i"></pdf>
  </div>
</template>

<script>
    import pdf from 'vue-pdf'

    export default {
        components: {
            pdf
        },
        name: "pdfPreview",
        data() {
            return {
                pdfUrl: '',
                filename: '',
                numPages: '',
            }
        },
        created() {
            this.filename = this.$route.query.filename
            this.pdfUrl = pdf.createLoadingTask(`${window.location.protocol+"//"+window.location.host}/electronic/pdf/documentConverterToPdf/${this.filename}`)


        },
        mounted() {
            this.pdfUrl.then(pdf => {
                this.numPages = pdf.numPages;
            });
        },
        methods: {
            change() {
                alert(1)
            }
        }

    }
</script>

<style scoped>

</style>
