import { CLEAR_FILTER_CATEGORY, FILTER_CATEGORY } from '../actions/types';

const initialState = {
  category: [
    {
      name: 'HTML',
      icon: 'html-5',
      link: 'html5'
    },
    {
      name: 'CSS',
      icon: 'css3',
      link: 'css'
    },
    {
      name: 'Sass',
      icon: 'sass',
      link: 'sass'
    },
    {
      name: 'Bootstrap',
      icon: 'bootstrap',
      link: 'bootstrap'
    },
    {
      name: 'Material-UI',
      icon: 'material-ui',
      link: 'materialui'
    },
    {
      name: 'Javascript',
      icon: 'javascript',
      link: 'javascript'
    },
    {
      name: 'React',
      icon: 'react',
      link: 'react'
    },
    {
      name: 'Angular',
      icon: 'angularjs',
      link: 'angular'
    },
    {
      name: 'Vue',
      icon: 'vue-js',
      link: 'vue'
    },
    {
      name: 'Graph QL',
      icon: 'graphql',
      link: 'graphql'
    },
    {
      name: 'TypeScript',
      icon: 'typescript',
      link: 'typescript'
    },
    {
      name: 'Redux',
      icon: 'redux',
      link: 'redux'
    },
    {
      name: 'Node.js',
      icon: 'nodejs',
      link: 'angular'
    },
    {
      name: 'MongoDB',
      icon: 'mongodb',
      link: 'mongodb'
    },

    {
      name: 'PostgreSQL',
      icon: 'postgreesql',
      link: 'postgreesql'
    },
    {
      name: 'PHP',
      icon: 'php-logo',
      link: 'php'
    },
    {
      name: 'Swift',
      icon: 'swift',
      link: 'swift'
    },
    {
      name: 'Android',
      icon: 'android',
      link: 'android'
    },
    {
      name: 'Java',
      icon: 'java-coffee-cup-logo',
      link: 'java'
    },
    {
      name: 'Git',
      icon: 'git',
      link: 'git'
    },
    {
      name: 'C++',
      icon: 'c-plus-plus-logo',
      link: 'c++'
    },
    {
      name: 'Flutter',
      icon: 'flutter',
      link: 'flutter'
    },
    {
      name: 'Python',
      icon: 'python',
      link: 'python'
    },
    {
      name: 'Ruby',
      icon: 'ruby-programming-language',
      link: 'ruby'
    }
  ],
  filtered: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_CATEGORY:
      return {
        ...state,
        filtered: state.category.filter(item => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return item.name.match(regex) || item.link.match(regex);
        })
      };
    case CLEAR_FILTER_CATEGORY:
      return { ...state, filtered: null };
    default:
      return state;
  }
};
