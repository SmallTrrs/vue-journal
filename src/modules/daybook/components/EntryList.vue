<template>
  <div class="entry-list-container">
      <div class="px-2 pt-2">
        <input 
         type="text"
         class="form-control"
         placeholder="Buscar Entrada"
         v-model = 'term'
        >
      </div>


     <div class="mt-2 d-flex flex-colum">
        <button 
         @click="$router.push({ name: 'entry' , params: {id: 'new'}})"
        class="btn btn-primary btn-sm">
            <i class="fa fa-plus-circle"></i>
            Nueva Entrada
        </button>
     </div>

      <div class="entry-scrollarea">
       <EntryComp
         v-for="entry in entriesByTerm"
         :key="entry.id"
         :entry="entry">
         
       </EntryComp>
                    
      </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {

    components: {
        EntryComp: defineAsyncComponent( ()=> import('./EntryComp.vue') )
    },
    computed:{
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesByTerm(){
            return this.getEntriesByTerm( this.term )
        }
    },
    data(){

     return {
         term: ''
     }

    }
    

}
</script>

<style lang="scss" scoped>

input{
    height: 50px;
}

.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: cal(100vh - 56 );
}

.entry-scrollarea{
    height: cal( 100vh - 120);
    overflow: scroll;
}

</style>