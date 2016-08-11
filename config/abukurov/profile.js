const toArray = require('lodash/toArray');
const map = require('lodash/map');
const moment = require('moment');

const profile = require('./profile.json');
const skills = require('./skills.json');
const portfolio = require('require-all')({
  dirname: __dirname + '/portfolio',
  filter: /(.+)\.json$/,
  recursive: false
});

const keywords =  `HWdTech, Portfolio, ${profile.name}, ${map(skills, 'name').join(', ')}`;

module.exports = Object.assign({}, profile, {
  keywords,
  skills,
  age: moment().diff(new Date(profile.birthday), 'year'),
  employmentDate: moment(new Date(profile.employmentDate)).utc().format('DD MMMM YYYY'),
  portfolio: toArray(portfolio),
  interests: require('./interests.json'),
  services: require('./services.json'),
  social: require('./social-links.json'),
  statistics: require('./statistics.json'),
  workExperiences: require('./work-experiences.json'),
});
