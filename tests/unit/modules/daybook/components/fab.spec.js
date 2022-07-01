import { shallowMount } from '@vue/test-utils'
import FabCom from '@/modules/daybook/components/FabCom'


 describe('Pruebas en el Fab Component', ()=>{

     test('Debe de mostrar el icono por defecto', () => {

        const wrapper = shallowMount( FabCom )
        const iTag = wrapper.find('i')

        expect( iTag.classes('fa-plus')).toBeTruthy()

     })

     test('Debe de mostrar el icono pasado por argumento: fa-circle' , ()=>{

        const wrapper = shallowMount( FabCom, {
            props:{
                icon: 'fa-circle',
            }
        } )
       
         
     })

     test('Debe emitir el evento on:click cuando se hace click' , ()=>{
       
        const wrapper = shallowMount( FabCom )

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)

     })

 })