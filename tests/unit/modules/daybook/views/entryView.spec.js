import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import Swall from 'sweetalert2';

import journal from "@/modules/daybook/store/journal";
import EntryView from "@/modules/daybook/views/EntryView";
import { journalState } from "../../../mock-data/test-journal-state";
import Swal from "sweetalert2";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

  // simular el comportamiento de sweetalert2
  jest.mock('sweetalert2', ()=>({

    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()

  }))

describe("Pruebas en entryView", () => {

  const store = createVuexStore(journalState);
  
  const mockRouter = {
    push: jest.fn(),
  };

  store.dispatch = jest.fn() // evita que el dispatch se ejecute en el componente solo se simula su ejecucion

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = shallowMount(EntryView, {
        props:{
             id:'-MzcI73tkrugpaWu6vh6'
        },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("Debe de sacar al usuario porque el id no existe", () => {

   const  wrapper = shallowMount(EntryView, {
      props:{
        id:'el id no existe en el store'
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry'})

  });


  test("Debe de mostrar la entrada correctamente", ( done ) => {

    Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }))
    
    wrapper.find('.btn-danger').trigger('click')

    expect( Swal.fire ).toHaveBeenCalledWith({

      title: 'Está Seguro ?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si , estoy seguro'

    })


    setTimeout( ()=>{

         expect( store.dispatch ).toHaveBeenCalledWith('journal/delEntry', '-MzcI73tkrugpaWu6vh6')
         expect( mockRouter.push ).toHaveBeenCalled()

         done()

    }, 1)


   
   });
  

  
});
