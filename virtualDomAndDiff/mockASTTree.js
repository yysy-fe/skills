// 1234
const oldTreeMock = {
  tagName: 'ul',
  props: {
    className: 'user-list'
  },
  children: [
    {
      tagName: 'li',
      children: ['user1'],
      props: {
        key: "user-item1",
        className: 'user-item'
      },
    },
    {
      tagName: 'li',
      children: [
        'user2',
        {
          tagName: 'span',
          props: {key: 'span1'}
        }
      ],
      props: {
        key: "user-item2",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user3'],
      props: {
        key: "user-item3",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: [
        'user4',
        {
          tagName: 'span',
          props: {key: 'span1'}
        }
      ],
      props: {
        key: "user-item4",
        className: 'user-item'
      }
    },
    // {
    //   tagName: 'li',
    //   children: ['user4', {
    //     tagName: 'ul',
    //     props: {
    //       className: 'user-list'
    //     },
    //     children: [
    //       {
    //         tagName: 'li',
    //         children: ['user1'],
    //         props: {
    //           key: "user-item1",
    //           className: 'user-item'
    //         },
    //       },
    //       {
    //         tagName: 'li',
    //         children: [
    //           'user2',
    //           {
    //             tagName: 'span',
    //             props: {key: 'span1'}
    //           }
    //         ],
    //         props: {
    //           key: "user-item2",
    //           className: 'user-item'
    //         }
    //       },
    //       {
    //         tagName: 'li',
    //         children: ['user3'],
    //         props: {
    //           key: "user-item3",
    //           className: 'user-item'
    //         }
    //       },
    //       {
    //         tagName: 'li',
    //         children: ['user4'],
    //         props: {
    //           key: "user-item4",
    //           className: 'user-item'
    //         }
    //       },
    //     ]
    //   }],
    //   props: {
    //     key: "user-item4",
    //     className: 'user-item'
    //   }
    // },
  ]
};

// 2154
const newTreeMock = {
  tagName: 'ul',
  props: {
    className: 'user-list'
  },
  children: [
    {
      tagName: 'li',
      children: [
        'user2',
        {
          tagName: 'p',
          props: {key: 'p1'}
        }
      ],
      props: {
        key: "user-item2",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user1'],
      props: {
        key: "user-item1",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user5'],
      props: {
        key: "user-item5",
        className: 'user-item'
      }
    },
    {
      tagName: 'li',
      children: ['user4', {
        tagName: 'ul',
        props: {
          className: 'user-list'
        },
        children: [
          {
            tagName: 'li',
            children: [
              'user2',
              {
                tagName: 'span',
                props: {key: 'span1'}
              }
            ],
            props: {
              key: "user-item2",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user1'],
            props: {
              key: "user-item1",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user5'],
            props: {
              key: "user-item5",
              className: 'user-item'
            }
          },
          {
            tagName: 'li',
            children: ['user4'],
            props: {
              key: "user-item4",
              className: 'user-item'
            }
          },
          // {
          //   tagName: 'li',
          //   children: ['user3'],
          //   props: {
          //     key: "user-item3",
          //     className: 'user-item'
          //   }
          // },
        ]
      }],
      props: {
        key: "user-item4",
        className: 'user-item'
      }
    },
    // {
    //   tagName: 'li',
    //   children: ['user3'],
    //   props: {
    //     key: "user-item3",
    //     className: 'user-item'
    //   }
    // },
  ]
};

module.exports = {
  newTreeMock,
  oldTreeMock
}