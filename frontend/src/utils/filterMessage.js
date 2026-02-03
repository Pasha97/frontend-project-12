import filter from 'leo-profanity';

filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));

export default filter;
