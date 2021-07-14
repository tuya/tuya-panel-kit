module.exports = {
  extends: ['cz'],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'scope-case': [1, 'always', 'pascal-case'],
    'subject-case': [0],
    'subject-full-stop': [0],
    'checkout-language': [2, 'always'], // support custom
  },
  plugins: [
    {
      rules: {
        'checkout-language': ({ subject, footer, body }) => {
          const chinese = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
          const isEnglish = !chinese.test(subject) && !chinese.test(footer) && !chinese.test(body);
          return [isEnglish, `Your commit content must be in English`];
        },
      },
    },
  ],
};
