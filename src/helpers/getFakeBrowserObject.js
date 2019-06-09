const getFakeBrowserObject = () => ({
  bookmarks: {
    getTree: (fn) => {
      fn([
        {
          parentId: '1',
          url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
          title: 'Coligo Swagger UI',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url:
            'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
          title: 'What are some good open source React JS projects? - Quora',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
          title: 'Coligo Swagger UI',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url:
            'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
          title: 'What are some good open source React JS projects? - Quora',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
          title: 'Coligo Swagger UI',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url:
            'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
          title: 'What are some good open source React JS projects? - Quora',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
          title: 'Coligo Swagger UI',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url:
            'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
          title: 'What are some good open source React JS projects? - Quora',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
          title: 'Coligo Swagger UI',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url:
            'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
          title: 'What are some good open source React JS projects? - Quora',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
          title: 'Coligo Swagger UI',
          id: Math.random().toString()
        },
        {
          parentId: '1',
          url:
            'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
          title: 'What are some good open source React JS projects? - Quora',
          id: Math.random().toString()
        }
      ]);
    }
  }
});

export default getFakeBrowserObject;
