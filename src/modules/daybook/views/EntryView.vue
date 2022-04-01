<template>

  <template v-if="entry">

         <div class="entry-title d-flex justify-content-between p-2">
     
             <div>
               <span class="text-success fs-3 fw-bold">{{day}}</span>
               <span class="mx-1 fs-3">{{month}}</span>
               <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
             </div>
     
             <div>
                 <button 
                   v-if="entry.id"
                   class="btn btn-danger mx-2"
                   @click="deleteEntry"
                 >Borrar <i class="fa fa-trash-alt"></i></button>
                 <button class="btn btn-primary"> Subir Foto <i class="fa fa-upload"></i></button>
             </div>
     
         </div>
     
         <hr>
     
         <div class="d-flex flex-column px-3 h-75">
     
             <textarea 
             placeholder="Que sucedio hoy ?"
             v-model="entry.text"></textarea>
     
         </div>

           <img 
             src="" 
             alt="entry-picture"
             class="img-thumbnail"
            >

    </template>

   <fab-com 
     icon="fa-save"
     @on:click="saveEntry"
     >
    
   </fab-com>

 

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Swall from 'sweetalert2'
import  getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    props:{
        id: {
            type: String,
            required: true
        }
    },
    data(){

        return {
            entry: null
        }
    },
    components:{
        FabCom : defineAsyncComponent( () => import('../components/FabCom.vue') )
    
    },
    computed:{
        ...mapGetters('journal', ['getEntryById']),
        day(){
          const  { day } = getDayMonthYear( this.entry.date )
            return day
        },
        month(){
          const  { month } = getDayMonthYear( this.entry.date )
            return month
        },
        yearDay(){
          const  { yearDay } = getDayMonthYear( this.entry.date )
            return yearDay
        }
    },
    methods: {
         ...mapActions('journal', ['updateEntry','createEntry', 'delEntry']),
         loadEntry(){

               let entry

               if ( this.id === 'new' ){
                 
                   entry = {
                       text:'',
                       date: new Date().getTime()                       
                    }
                   

               }else{
                   
                   entry = this.getEntryById( this.id )

                   if ( !entry ) return this.$router.push({name: 'no-entry'})

               }
                   this.entry = entry
              
         },
         async saveEntry(){


            
            if ( this.entry.id ){
                this.updateEntry( this.entry )
            }else{
               
                // crear una nueva entrada (se manda llamar desde actions de vuex )
                const id = await this.createEntry( this.entry )

                this.$router.push({name: 'entry', params: {id} })

            }
         },

         async deleteEntry(){

            await this.delEntry( this.entry.id )

            this.$router.push({name : 'no-entry' })
         }
    },
    created(){
        this.loadEntry()
    },
    watch:{
        // el watch nos sirve para ver si una propiedad cambia, es decir nos permite 
        // observar si cambia su valor 
        id(){
            this.loadEntry()
        }
    }

}
</script>

<style lang="scss" scoped>

 textarea{
     font-size: 20px;
     border:none;
     height: 100%;

     &:focus{
         outline:none;
     }
 }

 img{
     width: 200px;
     position: fixed;
     bottom: 150px;
     box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2 )
 }

</style>