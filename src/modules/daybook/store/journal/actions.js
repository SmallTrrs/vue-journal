import journalApi from "@/api/journalApi"


export const loadEntries = async ({ commit }) =>{

  const { data }= await   journalApi.get('/entries.json')
     

  if ( !data){

       commit('setEntries',[])
       return 
  }

  const entries = []

  for ( let id of Object.keys( data ) )
     entries.push({
         id,
         ...data[id]
     })

    commit('setEntries', entries )

}

export const createEntry = async ({ commit } , entry ) =>{

    const { date , picture , text } = entry

    const dataSave = { date, picture, text}

    const { data } = await journalApi.post('entries.json', dataSave)

    dataSave.id = data.name // data.name es el id que se manda desde el api de firebase

    commit('addEntry', dataSave)     

    return data.name // se regresa para redireccionar a la nueva entrada creada

}


export const updateEntry = async ({ commit } , entry) =>{

     const { date, picture, text } = entry

     const dataSave = { date, picture, text }

     await journalApi.put(`/entries/${entry.id}.json`, dataSave)
    
     commit('updateEntry', {...entry})

}


export const delEntry = async ({ commit } , id ) =>{

    await journalApi.delete(`/entries/${id}.json`)

    commit('deleteEntry', id )

}