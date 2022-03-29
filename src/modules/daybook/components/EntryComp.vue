<template>

   <div 
     class="mb-3 pointer p-2 entry-container"
     @click="$router.push({name:'entry', params:{id: 8 } })"
   >

        <!-- titulo  -->
        <div class="entry-title d-flex">
              <span class="text-success fs-5 fw-bold">15</span>
              <span class="mx-1 fs-5">Julio</span>
              <span class="mx-2 fw-light">2021, jueves</span>
        </div>

        <div class="entry-description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, molestias cum optio distinctio impedit tenetur sunt dignissimos eveniet omnis ipsam ad! Velit minima eaque, cum quas suscipit voluptatibus expedita rerum?
        </div>

   </div>  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.entry-container{

      border-bottom:1px solid  #2c3e50;
      transition: 0.2s all ease-in;
      
      &:hover{
        background-color: lighten( $color: grey, $amount: 45) ;         
      }

      
}

</style>