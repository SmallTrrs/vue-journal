import { shallowMount } from '@vue/test-utils'
import EntryComp from '@/modules/daybook/components/EntryComp'
import { journalState} from '../../../mock-data/test-journal-state'

describe('Pruebas Entry Component', () =>{

   const mockRouter = {
      push: jest.fn()
   }

   const wrapper = shallowMount(EntryComp, {
      props: {
         entry: journalState.entries[0]
      },
      global:{
         mocks:{
            $router: mockRouter
         }
      }
   })

   test('Debe hacer match con el snapshot', ()=>{
      
      expect( wrapper.html() ).toMatchSnapshot()

   })

   test('Debe de redireccionar al hacer click en el entry-container', ()=>{
      
      const entryContainer = wrapper.find('.entry-container')

      entryContainer.trigger('click')

      expect( mockRouter.push ).toHaveBeenCalledWith({
         name: "entry", params: { id: "-MzcI73tkrugpaWu6vh6"}
      })

   })

   test('pruebas en las propiedades computadas', ()=>{
 
   expect(wrapper.vm.day ).toBe(1)
   expect(wrapper.vm.month ).toBe('Abril')
   expect(wrapper.vm.yearDay ).toBe('2022, Viernes')

   })
})