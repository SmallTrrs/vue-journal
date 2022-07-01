import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'


const createVuexStore = ( initialState ) =>  createStore({

modules : {
    journal:{
        ...journal,
        state: {...initialState }
    }
}
})


describe('Vuex - Pruebas en Journal Module', () =>{

   test('Estado Inicial , Debe tener siguiente state' , ()=>{

      const store = createVuexStore( journalState )

      const { isLoading, entries } = store.state.journal

      expect( isLoading ).toBeFalsy()
      expect( entries ).toEqual( journalState.entries )

   })

   // Mutations
   test('mutations: setEntries', ()=>{
     
      const store = createVuexStore({ isLoading: true, entries: [] })

      store.commit('journal/setEntries', journalState.entries )

      expect( store.state.journal.entries.length ).toBe(3)      
      expect( store.state.journal.isLoading ).toBeFalsy()      

   })


   test('mutation: updateEntry',  ()=>{
        
      // create store con entries
      const store = createVuexStore( journalState )

   // updateEntry

   const updateEntry = {
        "id":  "-MzcI73tkrugpaWu6vh6",
        "date": 1648869788983,        
        "text": "Primero de Abril Registro Actualizado"
    } 
      // commit de la mutacion
         store.commit('journal/updateEntry', updateEntry)

      // Expects

       expect( store.state.journal.entries.length ).toBe(3)

       expect( store.state.journal.entries.find( e => e.id === updateEntry.id )).toEqual( updateEntry )      



   })


   test('mutation: addEntry deleteEntry', ()=>{

     
      const store = createVuexStore( journalState)

      store.commit('journal/addEntry', { id: 'ABCD', text: 'prueba de test'})

      const stateEntries = store.state.journal.entries

      expect( stateEntries.length ).toBe(4)      

      expect( stateEntries.find(e => e.id === 'ABCD' )).toBeTruthy()

      store.commit( 'journal/deleteEntry', 'ABCD' )

      expect( store.state.journal.entries.length ).toBe(3)      

      expect( store.state.journal.entries.find(e => e.id === 'ABCD' )).toBeFalsy()


   })

    // <<<<<<<<<<<<< GETTERS >>>>>>>>>>>>>>>>>>>>>>

    test('getters: getEntriesByTerm getEntrybyId', ()=>{

      const store = createVuexStore( journalState)

      expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(3)
      expect( store.getters['journal/getEntriesByTerm']('entrada').length ).toBe(1)

      expect( store.getters['journal/getEntryById']('-MzcI73tkrugpaWu6vh6') ).toEqual(journalState.entries[0])

    })

    // <<<<<<<<<<<<<<<<<< ACTIONS >>>>>>>>>>>>>>>
   
    test('actions: loadEntries', async() =>{
        
         const store = createVuexStore({  isLoading: true, entries:[]})

         await store.dispatch('journal/loadEntries')

         //expect(store.state.journal.entries.length).toBe(3)


    })

    test('actions: updateEntry', async() =>{
        
      const store = createVuexStore( journalState )

      const updatedEntry = {
            id:  "-MzcI73tkrugpaWu6vh6",
            date: 1648869788983,        
            text: "Primero de Abril",
            otro: 'Campo Test'
      }

      await store.dispatch('journal/updateEntry', updatedEntry)

      expect(store.state.journal.entries.length).toBe(3)

 })

  test('test actions: createEntry deleteEntry', async()=>{
     
     //createStore
      const store = createVuexStore( journalState )

     // crear la entrada newEntry = { date:12833744, text:'nueva entrada desde pruebas'}
      const newEntry = { date:1627077227978, text:'nueva entrada desde pruebas'}

     // dispatch de la acción 
      const id = await store.dispatch('journal/createEntry', newEntry)
 
     // obtener el id de la nueva entrada
      expect(typeof id).toBe('string')
     
     // la nueva entrada debe de existir
      expect(store.state.journal.entries.find( e=> e.id === id)).toBeTruthy()      

     // Segunda parte: eliminar la entrada

     // dispatch deleteEntry
      await store.dispatch('journal/delEntry', id)
     
     // la nueva nueva entrada no debe de existir en el state
      expect(store.state.journal.entries.find( e=> e.id === id)).toBeFalsy()    


  })

})