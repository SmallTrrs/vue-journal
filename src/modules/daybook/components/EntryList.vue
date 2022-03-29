<template>
  <div class="entry-list-container">
      <div class="px-2 pt-2">
        <input 
         type="text"
         class="form-control"
         placeholder="Buscar Entrada"
        >
      </div>

      <div class="entry-scrollarea">
       <EntryComp v-for="item in 100 " :key="item">
            Entry
       </EntryComp>
                    
      </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {

    components: {
        EntryComp: defineAsyncComponent( ()=> import('./EntryComp.vue') )
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