// import cloudinary from 'cloudinary'
import axios from 'axios'
import  uploadImage from  '@/modules/daybook/helpers/uploadImage'


// cloudinary.config({
//     cloud_name:'dmgo2a5ug',
//     api_key: '373682938858814',
//     api_secret: 'DsIfbB8EIg8cL3NO850tlLHTcWU'
// })

describe('Pruebas en el uploadImage',  ()=>{



    test('Debe de cargar un archivo y retornar el url', async (  )=>{

      const {data} =  await axios.get('https://res.cloudinary.com/dmgo2a5ug/image/upload/v1561239253/sample.jpg',{
       responseType:'arraybuffer'

       })
       

       const file = new File ([ data ],'foto.jpg')

       const url = await uploadImage( file )

       expect( typeof url).toBe('string')

       // borrar la imagen que se subio
       // tomar el id

    //    const segments = url.split('/')
    //    const imageId  = segments[ segments.length - 1 ].replace('.jpg')

    //    cloudinary.v2.api.delete_resources( imageId , {}, ()=>{

    //        done()
    //    })


    })


})