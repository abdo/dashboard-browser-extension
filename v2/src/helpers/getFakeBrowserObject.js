const getFakeBrowserObject = () => ({
  bookmarks: {
    getTree: (fn) => {
      fn([
        {
          parentId: '1',
          title: 'Main folder',
          id: '101',
          children: [
            {
              parentId: '101',
              url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
              title: 'Maaain',
              id: Math.random().toString()
            }
          ]
        },
        {
          parentId: '1',
          title: 'Bookmarks folder',
          id: '102',
          children: [
            {
              parentId: '102',
              url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
              title: 'Child',
              id: Math.random().toString()
            },
            {
              parentId: '102',
              url:
                'https://www.quora.com/What-are-some-good-open-source-React-JS-projects',
              title:
                'Child are some good open source React JS projects? - Quora',
              id: Math.random().toString()
            },
            {
              parentId: '102',
              id: '1002',
              title: 'Another folder',
              children: [
                {
                  parentId: '1002',
                  url: 'https://coligo-api-dev.herokuapp.com/docs/v0/',
                  title:
                    'Child are some good open source React JS projects? - Quora',
                  id: Math.random().toString()
                }
              ]
            }
          ]
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
