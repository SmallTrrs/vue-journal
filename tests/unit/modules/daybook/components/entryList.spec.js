import { createStore } from 'vuex'
import { shallowMount } from '@vue/test-utils'

import journal from '@/modules/daybook/store/journal'
import  EntryList  from '@/modules/daybook/components/EntryList'
//import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Pruebas en entryList', ()=>{


// PRIMERA FORMA DE HACERLO
    //    const journalMockModule = {
//      namespaced: true,
//      getters:{
//         getEntriesByTerm
//      }, 
//      state: ()=>({
//         isLoading: false,
//         entries: journalState.entries
//      })

//    }

//    const store = createStore({

//       modules:{
//         journal: { ...journalMockModule}
//       }
//    })

const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal:{
                ...journal,
                state: { ...initialState }
            }
        }
    })


  const store =  createVuexStore( journalState )

  const mockRouter = {
    push: jest.fn()
  }

  let wrapper

  beforeEach( ()=>{
      jest.clearAllMocks()

      wrapper = shallowMount(EntryList, {
        global: {
          mocks: {
               $router: mockRouter
          },
          plugins:[ store ]
        }
     })

  })

  

   test('Debe de llamar de getEntriesByTerm  sin termino y mostrar 3 entradas', ()=>{

       expect( wrapper.findAll('entry-comp-stub').length).toBe(3)
       expect( wrapper.html()).toMatchSnapshot()

   })

   test('Debe de llamar al getEntryByTerm y filtrar las entradas',async ()=>{

     const input = wrapper.find('input')

      await  input.setValue('Segunda')

      expect( wrapper.findAll('entry-comp-stub').length).toBe(1)
   })

   test('El boton de nuevo debe de redireccionar a /new',async ()=>{

     wrapper.find('button').trigger('click')
     expect(mockRouter.push ).toHaveBeenCalledWith({ name: 'entry', params: {id: 'new'}})

   })


})