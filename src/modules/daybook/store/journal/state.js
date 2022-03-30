
export default () => ({

  isLoading: true,
  entries:[
      {
        //   id:   new Date().getTime(),
          id: '1',
          date: new Date().toDateString(),
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
          picture: null
      },
      {
        //   id: new Date().getTime() + 1000,
          id:'2',
          date: new Date().toDateString(),
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
          picture: null
      },
      {
        //   id: new Date().getTime() + 2000,
          id:'3',
          date: new Date().toDateString(),
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
          picture: null
      }
  ]

})

